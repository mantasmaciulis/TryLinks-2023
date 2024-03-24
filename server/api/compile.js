const fs = require('fs-extra')
const pf = require('portfinder')
const fileDB = require('../db/file-queries')
const { spawn } = require('child_process')

module.exports.socketMap = new Map()

module.exports.sessionMap = new Map()

module.exports.createConfigFile = username => {
  return pf.getPortPromise()
    .then(port => {
      module.exports.port = port
      const filename = `tmp/${username}_config`
      const data = `port=${port}\n${process.env.TRYLINKS_CONFIG}`
      console.log(`TRYLINKS_CONFIG: ${process.env.TRYLINKS_CONFIG}`);
      return fs.outputFile(filename, data)
    }).catch(err => {
      console.log(err)
      throw err
    })
}

module.exports.createSourceFile = (username, tutorialId) => {
  return fileDB.getTutorialSourceForUser(username, tutorialId)
    .then((result) => {
      const fileData = result.data
      const filename = `tmp/${username}_source.links`
      console.log(`FILE_DATA: ${fileData}`)
      return fs.outputFile(filename, fileData)
    }).catch(err => {
      console.log(err)
      throw err
    })
}

function killLinksProc (username) {
  console.log(`Attempting to kill process for user: ${username}`);
  const sessionExists = module.exports.sessionMap.has(username);
  console.log(`Session exists for user ${username}: ${sessionExists}`);
  if (module.exports.sessionMap.get(username) !== null &&
    module.exports.sessionMap.get(username) !== undefined &&
      !module.exports.sessionMap.get(username).killed) {
    module.exports.sessionMap.get(username).kill()
    module.exports.sessionMap.delete(username)
    console.log('Killing compile shell for user ' + username)
  }
}

function sleep (milliseconds) {
  var start = new Date().getTime()
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break
    }
  }
}

module.exports.compileLinksFile = function (req, res, next) {
  const username = req.auth.payload.sub;
  const tutorialId = req.session.user.last_tutorial;
  console.log(tutorialId)
  console.log(req.session.user)
  var io = require('../sockets_base').io;
  var socketPath = `/${username}_tutorial`;

  // Check if the WebSocket setup has already been completed for this user
  if (!module.exports.socketMap.has(username)) {
    console.log(`Setting up config websocket for ${socketPath}`);
    io.of(socketPath).on('connection', function (socket) {
      console.log(`Compile socket connected for ${socketPath}`);

      socket.on('compile', function (data) {
        const tutID = data.tutorialId;
        console.log(`Received compile command for Tutorial ${tutID} for user ${username}`);
        var promises = [module.exports.createConfigFile(username), module.exports.createSourceFile(username, tutID)];
        Promise.all(promises).then(() => {
          console.log(`Attempting to kill any previous process for ${username}`);
          killLinksProc(username);
          console.log(`Spawning Links process for ${username} with Tutorial ID: ${tutID}`);
          let linxProc = spawn('linx', [`--config=tmp/${username}_config`, `tmp/${username}_source.links`]);
          
          linxProc.stdout.on('data', (data) => {
            socket.emit('compile error', 'STDOUT: ' + data.toString());
            console.log('sent stdout: ' + data);
          });

          linxProc.stderr.on('data', (data) => {
            socket.emit('compile error', 'STDERR: ' + data.toString());
            console.log('sent stderr: ' + data);
          });

          // Use sessionMap to track the compile process
          module.exports.sessionMap.set(username, linxProc);

          // Optionally, wait a specific time for the compile to complete - adjust as necessary
          sleep(process.env.COMPILE_ENV_TIME);

          socket.emit('compiled', module.exports.port);
          console.log('compiled', module.exports.port);
        }).catch(error => {
          console.log(error);
          socket.emit('compile error', 'could not build config and source files');
        });
      });

      socket.on('disconnect', function () {
        console.log("DISCONNECT CALLED!");
        socket.removeAllListeners('compile');
        socket.removeAllListeners('connection');
        socket.removeAllListeners();
        killLinksProc(username);
        if (io.nsps && io.nsps[socketPath]) {
          delete io.nsps[socketPath];
        }
      });

      socket.on('error', function (err) {
        console.log('Socket.IO Error');
        console.log(err.stack);
      });
    });

    // Mark this username as having an active WebSocket setup
    module.exports.socketMap.set(username, true);
  } else {
    console.log(`WebSocket setup already completed for user ${username}`);
  }

  // Respond to the request indicating WebSocket setup is initialized
  res.status(200).json({ path: socketPath });
};

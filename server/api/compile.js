const fs = require('fs-extra')
const pf = require('portfinder')
const fileDB = require('../db/file-queries')
const { spawn } = require('child_process')

module.exports.sessionMap = new Map()

module.exports.createConfigFile = username => {
  return pf.getPortPromise()
    .then(port => {
      module.exports.port = port
      const filename = `tmp/${username}_config`
      const data = `port=${port}\n${process.env.TRYLINKS_CONFIG}`
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
      return fs.outputFile(filename, fileData)
    }).catch(err => {
      console.log(err)
      throw err
    })
}

function killLinksProc (username) {
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
  if (!req.session.user) {
    res.status(401)
      .json({
        status: 'error',
        message: 'No authentication. Make sure you have logged in'
      })
    return
  }

  const username = req.session.user.username
  const tutorialId = req.session.user.last_tutorial
  var io = require('../sockets_base').io
  var socketPath = `/${username}_tutorial`
  // console.log('setting up config websocket')
  io.of(socketPath).on('connection', function (socket) {
  // console.log('compile socket connected')
    socket.on('compile', function () {
      // console.log(`Compiling Tutorial ${tutorialId} for user ${username}`)
      var promises = [module.exports.createConfigFile(username),
        module.exports.createSourceFile(username, tutorialId)]
      Promise.all(promises)
        .then(() => {
          killLinksProc(username)
          let linxProc = spawn('linx', [`--config=tmp/${username}_config`, `tmp/${username}_source.links`])
          linxProc.stdout.on('data', (data) => {
            socket.emit('compile error', 'STDOUT: ' + data.toString())
            // console.log('sent stdout: ' + data)
          })

          linxProc.stderr.on('data', (data) => {
            socket.emit('compile error', 'STDERR: ' + data.toString())
            // console.log('sent stderr: ' + data)
          })

          module.exports.sessionMap.set(username, linxProc)

          // Time required for the code to compile; may differ depending on the environment
          sleep(process.env.COMPILE_ENV_TIME)

          socket.emit('compiled', module.exports.port)
        }).catch(error => {
          console.log(error)
          socket.emit('compile error', 'could not build config and source files')
        })
    })
    socket.on('disconnect', function () {
      killLinksProc(username)
      delete io.nsps[socketPath]
      // console.log('deleted current namespace ' + socketPath)
    })

    socket.on('error', function (err) {
      // console.log('Socket.IO Error')
      console.log(err.stack) // this is changed from your code in last comment
    })
  })
  res.status(200).json({path: socketPath})
}

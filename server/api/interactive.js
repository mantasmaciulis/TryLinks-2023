const spawn = require('child_process').spawn
const forbiddenMessage = 'Error: \nYou cannot include "@" in the command, please check and try again.\n'

function initInteractive (req, res, next) {
  if (!req.session.user) {
    res.status(401)
      .json({
        status: 'error',
        message: 'No authentication. Make sure you have logged in'
      })
    return
  }

  const io = require('../sockets_base').io;
  const socketPath = '/' + req.session.user.username;
  console.log(socketPath)
  const namespace = io.of(socketPath);

  namespace.on('connection', (socket) => {
    const shell = spawn('linx');

    socket.on('new command', (cmd) => {
      const forbiddenPattern = /.*@/g;
      if (forbiddenPattern.test(cmd)) {
        socket.emit('shell error', forbiddenMessage);
      } else {
        shell.stdin.write(cmd + '\n');
      }
    });

    shell.stdout.on('data', (data) => {
      socket.emit('shell output', data.toString());
    });

    shell.stderr.on('data', (data) => {
      socket.emit('shell error', data.toString());
    });

    socket.on('disconnect', () => {
      shell.kill();
      namespace.removeAllListeners();
      if (io.nsps && io.nsps[socketPath]) {
        delete io.nsps[socketPath];
      }
    });
  });

  res.status(200).json({path: socketPath});
}

module.exports = {
  initInteractive: initInteractive
};
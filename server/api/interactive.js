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

  var io = require('../sockets_base').io
  var socketPath = '/' + req.session.user.username
  io.of(socketPath).on('connection', function (socket) {
    // start new shell process
    var shell = spawn('linx')

    socket.on('new command', function (cmd) {
      // console.log('new command: ' + cmd)

      const forbiddenPattern = /.*@/g
      if (forbiddenPattern.test(cmd)) {
        // console.log(`Encounter forbidden command: ${cmd}`)
        socket.emit('shell error', forbiddenMessage)
      } else {
        shell.stdin.write(cmd + '\n')
      }
    })

    shell.stdout.on('data', (data) => {
      socket.emit('shell output', data.toString())
      // console.log('sent stdout: ' + data)
    })

    shell.stderr.on('data', (data) => {
      socket.emit('shell error', data.toString())
      // console.log('sent stderr: ' + data)
    })

    socket.on('disconnect', function () {
      // console.log('killing shell')
      shell.kill()
      // console.log('shell killed: ' + shell.killed)
      delete io.nsps[socketPath]
    })
  })

  res.status(200).json({path: socketPath})
}

module.exports = {
  initInteractive: initInteractive
}

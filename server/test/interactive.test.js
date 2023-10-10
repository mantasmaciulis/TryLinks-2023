/* eslint-env mocha */

/**
 * Test for REPL related API endpoints:
 *   /api/initInteractive
 *   Socket channel for Links REPL functionality
 *
 * Assume a test account exists in db.
 *   username: test
 *   password: test
 */

var request = require('supertest')
var io = require('socket.io-client')

const forbiddenMessage = 'Error: \nYou cannot include "@" in the command, please check and try again.\n'

describe('Interactice mode tests', function () {
  var baseUrl = 'http://localhost:5000'
  const loginProfile = {
    username: 'test',
    password: 'test'
  }

  describe('Test for API endpoint', function () {
    it('Should not start interactive mode without authentication', function (done) {
      request(baseUrl)
        .get('/api/initInteractive')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(function (err, res) {
          if (err) throw err
          done()
        })
    })

    it('Should start new socket channel after authentication', function (done) {
      request(baseUrl)
        .post('/api/user/login')
        .send(loginProfile)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          var cookie = res.headers['set-cookie']
          var socket
          request(baseUrl)
            .get('/api/initInteractive')
            .set('cookie', cookie)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) throw err
              const socketConnectionUri = `${baseUrl}/${loginProfile.username}`
              // console.log(`logged in, trying to connect to ${socketConnectionUri}`)
              socket = io.connect(socketConnectionUri, {
                reconnectionDelay: 0,
                forceNew: true
              })
              socket.on('connect', function () {
                // Success in connecting to socket, clean up.
                socket.disconnect()
                done()
              })
              socket.on('connect_error', function (err) {
                console.log('connect_error: ' + err)
                throw err
              })
              socket.on('connect_timeout', function (err) {
                console.log('connect_timeout: ' + err)
                throw err
              })
              socket.on('error', function (err) {
                console.log('error: ' + err)
                throw err
              })
              socket.on('disconnect', function () {
                // console.log('disconnected...')
              })
            })
        })
    })
  })

  describe('Tests for socket functionality', function () {
    var socket

    beforeEach(function (done) {
      request(baseUrl)
        .post('/api/user/login')
        .send(loginProfile)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          var cookie = res.headers['set-cookie']
          request(baseUrl)
            .get('/api/initInteractive')
            .set('cookie', cookie)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) throw err
              const socketConnectionUri = `${baseUrl}/${loginProfile.username}`
              socket = io.connect(socketConnectionUri, {
                reconnectionDelay: 0,
                forceNew: true
              })
              socket.on('connect', function () {
                done()
              })
              socket.on('connect_error', function (err) {
                console.log('connect_error: ' + err)
                throw err
              })
              socket.on('connect_timeout', function (err) {
                console.log('connect_timeout: ' + err)
                throw err
              })
              socket.on('error', function (err) {
                console.log('error: ' + err)
                throw err
              })
              socket.on('disconnect', function () {
                // console.log('disconnected...')
              })
            })
        })
    })

    afterEach(function (done) {
      // Cleanup
      if (socket.connected) {
        // console.log('disconnecting...')
        socket.disconnect()
      } else {
        // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
        // console.log('no connection to break...')
      }
      done()
    })

    it('Test basic command', function (done) {
      socket.emit('new command', 'var a = 2;')
      socket.on('shell output', function (output) {
        // console.log(output)
        if (output.trim() === 'a = 2 : Int') {
          done()
        }
      })
    })

    it('Test multiple commands', function (done) {
      socket.emit('new command', 'var a = 2;')
      socket.emit('new command', 'var b = 6;')
      socket.emit('new command', 'a * b;')

      socket.on('shell output', function (output) {
        // console.log(output)
        if (output.trim() === '12 : Int') {
          done()
        }
      })
    })

    it('Test bad command', function (done) {
      socket.emit('new command', 'var a = 12ab;')

      socket.on('shell error', function (output) {
        // console.log(output)
        done()
      })
    })

    it('Test forbidden command', function (done) {
      socket.emit('new command', '@settings;')

      socket.on('shell error', function (output) {
        // console.log(output)
        if (output.trim() === forbiddenMessage.trim()) {
          done()
        }
      })
    })
  })
})

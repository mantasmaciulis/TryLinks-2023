/* eslint-env mocha */

/**
 * Test for user related API endpoints:
 *   /api/user/login
 *   /api/user/update
 *
 * Assume a test account exists in db.
 *   username: test
 *   password: test
 */

var assert = require('assert')
var request = require('supertest')
var helper = require('./helper')

describe('User login', function () {
  var baseUrl = 'http://localhost:5000'

  describe('Tests for api/file/read', function () {
    it('should return error when unauthenticated', function (done) {
      var payload = {
        tutorial: 0
      }
      request(baseUrl)
        .post('/api/file/read')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(401)
        .end(function (err, res) {
          if (err) throw err
          done()
        })
    })

    it('should return error when reading non-existent files', function (done) {
      var loginProfile = {
        username: 'test',
        password: 'test'
      }

      var payload = {
        tutorial: 1000000
      }

      request(baseUrl)
        .post('/api/user/login')
        .send(loginProfile)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          var cookie = res.headers['set-cookie']
          request(baseUrl)
            .post('/api/file/read')
            .set('cookie', cookie)
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(500)
            .end(function (err, res) {
              if (err) throw err
              done()
            })
        })
    })

    it('should return file data when reading files after authentication', function (done) {
      var loginProfile = {
        username: 'test',
        password: 'test'
      }

      var payload = {
        tutorial: 0
      }

      request(baseUrl)
        .post('/api/user/login')
        .send(loginProfile)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          var cookie = res.headers['set-cookie']
          request(baseUrl)
            .post('/api/file/read')
            .set('cookie', cookie)
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) throw err
              // TODO: update this to compare to actual source code when migration is complete.
              assert(res.body.fileData.length > 0, 'expected non-empty file entries!')
              done()
            })
        })
    })
  })

  describe('Tests for api/file/write', function () {
    it('should return error when unauthenticated', function (done) {
      var payload = {
        tutorial: 0,
        fileData: 'main()'
      }
      request(baseUrl)
        .post('/api/file/write')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(401)
        .end(function (err, res) {
          if (err) throw err
          done()
        })
    })

    it('should return error when trying to write on ill-formatted tutorial number', function (done) {
      var loginProfile = {
        username: 'test',
        password: 'test'
      }

      var payload = {
        tutorial: 'not a number',
        fileData: 'main()'
      }

      request(baseUrl)
        .post('/api/user/login')
        .send(loginProfile)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          var cookie = res.headers['set-cookie']
          request(baseUrl)
            .post('/api/file/write')
            .set('cookie', cookie)
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(403)
            .end(function (err, res) {
              if (err) throw err
              done()
            })
        })
    })

    it('should return error when trying to write without fileData', function (done) {
      var loginProfile = {
        username: 'test',
        password: 'test'
      }

      var payload = {
        tutorial: 1
      }

      request(baseUrl)
        .post('/api/user/login')
        .send(loginProfile)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          var cookie = res.headers['set-cookie']
          request(baseUrl)
            .post('/api/file/write')
            .set('cookie', cookie)
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(500)
            .end(function (err, res) {
              if (err) throw err
              done()
            })
        })
    })

    it('should return error when trying to write null fileData', function (done) {
      var loginProfile = {
        username: 'test',
        password: 'test'
      }

      var payload = {
        tutorial: 1,
        fileData: null
      }

      request(baseUrl)
        .post('/api/user/login')
        .send(loginProfile)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          var cookie = res.headers['set-cookie']
          request(baseUrl)
            .post('/api/file/write')
            .set('cookie', cookie)
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(500)
            .end(function (err, res) {
              if (err) throw err
              done()
            })
        })
    })

    it('should return error when trying to write empty fileData', function (done) {
      var loginProfile = {
        username: 'test',
        password: 'test'
      }

      var payload = {
        tutorial: 1,
        fileData: ''
      }

      request(baseUrl)
        .post('/api/user/login')
        .send(loginProfile)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          var cookie = res.headers['set-cookie']
          request(baseUrl)
            .post('/api/file/write')
            .set('cookie', cookie)
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(500)
            .end(function (err, res) {
              if (err) throw err
              done()
            })
        })
    })

    it('should update file data after authentication', function (done) {
      var loginProfile = {
        username: 'test',
        password: 'test'
      }

      var payload = {
        tutorial: 1,
        fileData: helper.generateRandomString(100)
      }

      request(baseUrl)
        .post('/api/user/login')
        .send(loginProfile)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          var cookie = res.headers['set-cookie']
          request(baseUrl)
            .post('/api/file/write')
            .set('cookie', cookie)
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) throw err
              request(baseUrl)
                .post('/api/file/read')
                .set('cookie', cookie)
                .send(payload)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                  if (err) throw err
                  assert(res.body.fileData === payload.fileData, 'expected fileData to be updated!')
                  done()
                })
            })
        })
    })
  })
})

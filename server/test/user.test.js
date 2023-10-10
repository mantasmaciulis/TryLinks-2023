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

  describe('Tests for unauthenticated endpoints', function () {
    it('should login with correct username', function (done) {
      var profile = {
        username: 'test',
        password: 'test'
      }
      request(baseUrl)
        .post('/api/user/login')
        .send(profile)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          assert(res.body.data.username === 'test', 'incorrect logged in user!')
          done()
        })
    })

    it('should return error with non-existent username', function (done) {
      var profile = {
        username: 'test123456789',
        password: 'test'
      }
      request(baseUrl)
        .post('/api/user/login')
        .send(profile)
        .expect('Content-Type', /json/)
        // 404 for user not found.
        .expect(404)
        .end(function (err, res) {
          if (err) throw err
          done()
        })
    })

    it('should return error with incorrect username and password', function (done) {
      var profile = {
        username: 'test',
        password: 'definitely_wrong_password'
      }
      request(baseUrl)
        .post('/api/user/login')
        .send(profile)
        .expect('Content-Type', /json/)
        // 401 for incorrect login info.
        .expect(401)
        .end(function (err, res) {
          if (err) throw err
          done()
        })
    })

    it('should not update user unless authenticated', function (done) {
      var profile = {
        username: 'test',
        email: 'new_email@xyz.com',
        password: 'new_password'
      }
      request(baseUrl)
        .post('/api/user/update')
        .send(profile)
        .expect('Content-Type', /json/)
        // 401 because user is not authenticated.
        .expect(401)
        .end(function (err, res) {
          if (err) throw err
          done()
        })
    })
  })

  describe('Tests for authenticated endpoints', function () {
    it('should update user after authenticated', function (done) {
      var loginProfile = {
        username: 'test',
        password: 'test'
      }

      var profile = {
        email: `${helper.generateRandomString(16)}@xyz.com`,
        password: null,
        last_tutorial: Math.floor(Math.random() * Math.floor(6))
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
            .post('/api/user/update')
            .set('cookie', cookie)
            .send(profile)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              assert(res.body.data.email === profile.email, 'email not updated!')
              assert(res.body.data.last_tutorial === profile.last_tutorial, 'last_tutorial not updated!')
              if (err) throw err
              done()
            })
        })
    })
  })
})

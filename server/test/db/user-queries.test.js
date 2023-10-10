/* eslint-env mocha */
const fail = require('assert').fail
const expect = require('chai').expect
const userDB = require('../../db/user-queries')
const fileDB = require('../../db/file-queries')
const constants = require('./constants')

describe('User DB tests', function () {
  beforeEach(function () {
    return userDB.removeUser(constants.username)
      .then(function () {
        return userDB.createUser(constants.username, constants.email, constants.password)
      })
  })

  it('should have user after insert into DB', function () {
    return userDB.getUserByUsername(constants.username)
      .then((user) => {
        expect(user.username).to.equal(constants.username)
        expect(user.email).to.equal(constants.email)
        expect(user.password).to.equal(constants.password)
      })
  })

  it('should update user', function () {
    const update = {
      email: constants.newEmail,
      password: constants.newPassword,
      last_tutorial: constants.newLastTutorial
    }
    return userDB.updateUser(constants.username, update)
      .then(function () {
        return userDB.getUserByUsername(constants.username)
      })
      .then((user) => {
        expect(user.email).to.equal(constants.newEmail)
        expect(user.password).to.equal(constants.newPassword)
        expect(user.last_tutorial).to.equal(constants.newLastTutorial)
      })
  })

  it('should have all 6 tutorials after user is created', function () {
    for (var i = 0; i < 6; i++) {
      fileDB.getTutorialSourceForUser(constants.username, i)
        .then((file) => {
          /* eslint-disable */
          expect(file.data).to.not.be.null
          /* eslint-enable */
        })
    }
  })

  it('should have no tutorials after user is deleted', function () {
    userDB.removeUser(constants.username)
      .then(function () {
        for (var i = 0; i < 6; i++) {
          fileDB.getTutorialSourceForUser(constants.username, i)
            .then((file) => {
              fail()
            })
            .catch((e) => {
              console.log('expected expectation')
            })
        }
      })
  })
})

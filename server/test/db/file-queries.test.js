/* eslint-env mocha */
const expect = require('chai').expect
const userDB = require('../../db/user-queries')
const fileDB = require('../../db/file-queries')
const constants = require('./constants')

describe('File DB tests', function () {
  beforeEach(function () {
    return userDB.removeUser(constants.username)
      .then(function () {
        return userDB.createUser(constants.username, constants.email, constants.password)
      })
  })

  it('should have correct starting code after insert into DB', function () {
    for (var i = 0; i < 6; i++) {
      fileDB.getTutorialSourceForUser(constants.username, i)
        .then((file) => {
          /* eslint-disable */
          expect(file.data).to.equal('')
          /* eslint-enable */
        })
    }
  })

  it('should update file', function () {
    const newSource = 'new sources'
    fileDB.updateFile(constants.username, 0, newSource)
      .then(function () {
        return fileDB.getTutorialSourceForUser(constants.username, 0)
      }).then((file) => {
        expect(file.data).to.equal(newSource)
      })
  })
})

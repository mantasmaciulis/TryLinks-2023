// Init db.
var db = require('./db-connect')

/**
 * All DB actions for LinksUser.
 */

function getUserByUsername (username) {
  return db.one('select * from "LinksUser" where "username" = $1', username)
}

function createUser (username) {
  return db.none('insert into "LinksUser"("username", "last_tutorial")' +
        'values($1, 1)', [username])
}

function updateUser (username, update) {
  var changeDetails = []
  const lastTutorial = parseInt(update.last_tutorial)
  if (lastTutorial != null && lastTutorial !== undefined && !isNaN(lastTutorial)) {
    changeDetails.push('"last_tutorial"=' + lastTutorial)
  }
  var changeStr = changeDetails.join(',')

  if (changeStr.length === 0) {
    const err = { status: 'error', message: 'Nothing to update!' }
    throw err
  }

  return db.none('update "LinksUser" set ' + changeStr + ' where "username"=$1', username)
}

function removeUser (username) {
  return db.result('delete from "LinksUser" where "username"=$1', username)
}

module.exports = {
  getUserByUsername: getUserByUsername,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser
}

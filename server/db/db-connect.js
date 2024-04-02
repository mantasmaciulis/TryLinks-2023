var promise = require('bluebird')

var options = {
  promiseLib: promise
}

var pgp = require('pg-promise')(options)
var connectionString = process.env.DB_CONNECTION_STRING
console.log("Database Connection String:", connectionString);
var db = pgp(connectionString)

module.exports = db

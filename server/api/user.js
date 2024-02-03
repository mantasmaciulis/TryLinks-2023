var userDB = require('../db/user-queries')
var bcrypt = require('bcryptjs')

function signUp (req, res, next) {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

  // Check if username is used.
  userDB.getUserByUsername(username)
    .then(() => {
      res.status(409)
        .json({
          status: 'error',
          message: 'Username used'
        })
    })
    .catch(() => {
      // Hashing
      const salt = bcrypt.genSaltSync()
      const hash = bcrypt.hashSync(password, salt)

      userDB.createUser(username, email, hash)
        .then(() => {
          res.status(200)
            .json({
              status: 'success',
              message: `User ${username} registered`
            })
        })
        .catch(err => {
          res.status(500)
            .json(err)
        })
    })
}

function login (req, res, next) {
  const username = req.body.username
  const password = req.body.password
  console.log(username)
  console.log(password)
  console.log("hmm")

  // Check if user exists.
  userDB.getUserByUsername(username)
    .then((user) => {
      try {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = user
          res.status(200)
            .json({
              status: 'success',
              message: 'Login successful',
              data: {
                username: user.username,
                last_tutorial: user.last_tutorial,
                is_admin: user.is_admin
              }
            })
        } else {
          res.status(401)
            .json({
              status: 'error',
              message: 'Incorrect login or password'
            })
        }
      } catch (err) {
        // Handle error from bcrypt.compareSync
        console.error(err);
        res.status(500)
          .json({
            status: 'error',
            message: 'Internal server error'
          })
      }
    }).catch(() => {
      res.status(404)
        .json({
          status: 'error',
          message: 'Username not found'
        })
    })
}

function update (req, res, next) {

  const username = req.session.user.username
  // Check if user exists.
  userDB.getUserByUsername(username)
    .then((user) => {
      const email = req.body.email
      const password = req.body.password
      const lastTutorial = req.body.last_tutorial
      const salt = bcrypt.genSaltSync()
      const hash = password === null ? null : bcrypt.hashSync(password, salt)
      userDB.updateUser(username, { email: email, password: hash, last_tutorial: lastTutorial })
        .then(() => userDB.getUserByUsername(username))
        .then((user) => {
          req.session.user = user
          res.status(200)
            .json({
              status: 'success',
              message: 'User updated',
              'data': user
            })
        })
        .catch(() => {
          res.status(500)
            .json({
              status: 'error',
              message: 'User failed to update'
            })
        })
    }).catch((error) => {
      console.log(error)
      res.status(404)
        .json({
          status: 'error',
          message: 'Username not found'
        })
    })
}

function logout (req, res, next) {
  if (req.session.user) {
    req.session.user = null
  }
  res.status(200)
    .json({
      status: 'success',
      message: 'User logged out'
    })
}

module.exports = {
  signUp: signUp,
  login: login,
  update: update,
  logout: logout
}

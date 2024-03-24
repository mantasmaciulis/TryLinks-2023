var userDB = require('../db/user-queries')
var bcrypt = require('bcryptjs')

function getUID(req, res){
  const userID = req.auth.payload.sub;
  if(userID) {
    // Sending the userID as a response
    res.status(200).json({ userID: userID });
  } else {
    res.status(400).json({ error: 'User ID not found' });
  }
}


function login(req, res) {
  const userID = req.auth.payload.sub;

  userDB.getUserByUsername(userID)
    .then((user) => {
      req.session.user = user;
      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: {
          username: user.username,
          last_tutorial: user.last_tutorial,
          is_admin: user.is_admin
        }
      });
    })
    .catch((e) => {
      userDB.createUser(userID)
        .then(() => {
          res.status(200).json({
            status: 'success',
            message: `User registered`
          });
        })
        .catch(err => {
          // Handle potential errors from createUser
          console.error(err);
          res.status(500).json({
            status: 'error',
            message: 'Error creating user'
          });
        });
    });
}

function update (req, res, next) {

  const userID = req.auth.payload.sub;
  // Check if user exists.
  userDB.getUserByUsername(userID)
    .then((user) => {
      const lastTutorial = req.body.last_tutorial
      userDB.updateUser(userID, {last_tutorial: lastTutorial })
        .then(() => userDB.getUserByUsername(userID))
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
  login: login,
  update: update,
  logout: logout,
  getUID: getUID
}

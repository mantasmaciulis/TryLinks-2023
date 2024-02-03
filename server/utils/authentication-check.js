// Check if the user is logged-in
function isLoggedIn (req, res) {

  return true
}

// Check if the user has admin rights
function isAdmin (req, res) {
  if (!req.session.user.is_admin) {
    console.log(`Unauthorized user (${req.session.user.username}) attempted to create a new tutorial`)
    res.status(403)
      .json({
        status: 'error',
        message: 'Insufficient privileges. Only admin can add a new tutorial.'
      })
    return false
  }
  return true
}

module.exports = {
  isLoggedIn: isLoggedIn,
  isAdmin: isAdmin
}

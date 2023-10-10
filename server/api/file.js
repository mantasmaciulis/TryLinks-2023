var fileDB = require('../db/file-queries')

function readFile (req, res, next) {
  // Check cookie first.
  if (!req.session.user) {
    res.status(401)
      .json({
        status: 'error',
        message: 'No authentication. Make sure you have logged in'
      })
    return
  }

  const username = req.session.user.username
  const tutorial = parseInt(req.body.tutorial)
  if (isNaN(tutorial)) {
    res.status(403).json({
      status: 'error',
      message: 'Unrecognizable tutorial number'})
    return
  }

  fileDB.getTutorialSourceForUser(username, tutorial)
    .then((result) => {
      res.status(200).json({
        status: 'success',
        fileData: result.data
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        status: 'error',
        message: 'failed to extract files from DB'
      })
    })
}

function writeFile (req, res, next) {
  // Check cookie first.
  if (!req.session.user) {
    res.status(401)
      .json({
        status: 'error',
        message: 'No authentication. Make sure you have logged in'
      })
    return
  }

  const username = req.session.user.username
  const tutorial = parseInt(req.body.tutorial)
  const fileData = req.body.fileData
  if (isNaN(tutorial)) {
    res.status(403).json({status: 'error', message: 'Unrecognizable tutorial number'})
    return
  }
  fileDB.updateFile(username, tutorial, fileData)
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'source updated'
      })
    }).catch(() => {
      res.status(500).json({
        status: 'error',
        message: 'failed to write file to DB'
      })
    })
}

module.exports = {
  readFile: readFile,
  writeFile: writeFile
}

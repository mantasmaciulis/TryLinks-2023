const tutorialDB = require('../db/tutorial-queries')
const authCheck = require('../utils/authentication-check')
const QueryResultError = require('pg-promise').errors.QueryResultError
const queryErrorCode = require('pg-promise').errors.queryResultErrorCode

function createTutorial (req, res) {
  if (!authCheck.isLoggedIn(req, res)) return
  if (!authCheck.isAdmin(req, res)) return

  const title = req.body.title
  const description = req.body.description
  const source = req.body.source

  if (title === undefined || description === undefined || source === undefined) {
    res.status(400).json({
      status: 'error',
      message: 'The tutorial is required to have a title, description and initial source code.'
    })
    return
  }

  tutorialDB.createTutorial(title, description, source)
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: `Tutorial was successfully created.`
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        status: 'error',
        message: 'Could not create a new tutorial.'
      })
    })
}

function getTutorial (req, res) {
  const tutorialId = parseInt(req.params.id)

  if (isNaN(tutorialId)) {
    res.status(403).json({
      status: 'error',
      message: 'Unrecognizable tutorial number.'
    })
    return
  }

  tutorialDB.getTutorial(tutorialId)
    .then((result) => {
      res.status(200).json({
        status: 'success',
        tutorial: result
      })
    })
    .catch((err) => {
      if (err instanceof QueryResultError) {
        if (err.code === queryErrorCode.noData) {
          res.status(404).json({
            status: 'error',
            message: `A tutorial with an id ${tutorialId} does not exist.`
          })
          return
        }
      }
      console.log(err)
      res.status(500).json({
        status: 'error',
        message: 'Cannot retrieve the tutorial\'s information.'
      })
    })
}

function getDescription (req, res) {
  const tutorialId = parseInt(req.body.tutorialId)

  if (isNaN(tutorialId)) {
    res.status(403).json({
      status: 'error',
      message: 'Unrecognizable tutorial number.'
    })
    return
  }

  tutorialDB.getTutorialDescription(tutorialId)
    .then((result) => {
      res.status(200).json({
        status: 'success',
        description: result.description
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        status: 'error',
        message: 'Cannot retrieve the tutorial\'s description.'
      })
    })
};

function getHeaders (req, res) {
  tutorialDB.getHeaders()
    .then((result) => {
      res.status(200).json({
        status: 'success',
        headers: result
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        status: 'error',
        message: 'Cannot retrieve the tutorials\' headers.'
      })
    })
}

// Retrieve a smallest tutorial id which can be used in case a requested tutorial does not exist
function getDefaultTutorialId (req, res) {
  tutorialDB.getDefaultTutorialId()
    .then((result) => {
      res.status(200).json({
        status: 'success',
        tutorialId: result.min
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        status: 'error',
        message: 'Cannot retrieve a default tutorial\'s ID.'
      })
    })
}

function updateTutorial (req, res) {
  if (!authCheck.isLoggedIn(req, res)) return
  if (!authCheck.isAdmin(req, res)) return

  const tutorialId = parseInt(req.body.tutorialId)
  const title = req.body.title
  const description = req.body.description
  const source = req.body.source

  tutorialDB.updateTutorial(tutorialId, title, description, source)
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Tutorial has been successfully updated.'
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        status: 'error',
        message: 'Cannot update the tutorial.'
      })
    })
}

function removeTutorial (req, res) {
  if (!authCheck.isLoggedIn(req, res)) return
  if (!authCheck.isAdmin(req, res)) return

  const tutorialId = parseInt(req.body.tutorialId)

  tutorialDB.removeTutorial(tutorialId)
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Tutorial has been successfully deleted.'
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        status: 'error',
        message: 'Cannot delete the tutorial.'
      })
    })
}

module.exports = {
  createTutorial: createTutorial,
  getTutorial: getTutorial,
  getDescription: getDescription,
  getHeaders: getHeaders,
  getDefaultTutorialId: getDefaultTutorialId,
  updateTutorial: updateTutorial,
  removeTutorial: removeTutorial
}

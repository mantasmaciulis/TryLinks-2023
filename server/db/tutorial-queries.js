// Init db.
let db = require('./db-connect')

/**
 * All DB actions for LinksTutorial
 */
function createTutorial (title, description, source) {
  return db.none('INSERT INTO "LinksTutorial" ("title", "description", "source") VALUES($1, $2, $3)',
    [title, description, source])
}

function getTutorial (tutorialId) {
  return db.one('SELECT * FROM "LinksTutorial" WHERE "tutorial_id" = $1', tutorialId)
}

function getTutorialDescription (tutorialId) {
  return db.one('SELECT "description" FROM "LinksTutorial" WHERE "tutorial_id" = $1', tutorialId)
}

function getHeaders () {
  return db.many('SELECT "tutorial_id", "title" FROM "LinksTutorial" ORDER BY tutorial_id ASC')
}

function getDefaultTutorialId () {
  return db.one('SELECT MIN("tutorial_id") FROM "LinksTutorial"')
}

function updateTutorial (tutorialId, title, description, source) {
  return db.none('UPDATE "LinksTutorial" SET (title, description, source) = ($1, $2, $3) WHERE "tutorial_id" = $4',
    [title, description, source, tutorialId])
}

function removeTutorial (tutorialId) {
  return db.none('DELETE FROM "LinksTutorial" WHERE "tutorial_id" = $1', tutorialId)
}

module.exports = {
  createTutorial: createTutorial,
  getTutorial: getTutorial,
  getTutorialDescription: getTutorialDescription,
  getHeaders: getHeaders,
  getDefaultTutorialId: getDefaultTutorialId,
  updateTutorial: updateTutorial,
  removeTutorial: removeTutorial
}

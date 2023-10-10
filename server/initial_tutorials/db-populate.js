/**
 * An auxiliary function to populate the database with initial tutorials
 * May be run after the database initialisation, however. it is not a part of the application.
 * If one wants to use it, it would need to be called from somewhere in the system, e.g. app.js,
 * since it communicates with the database whose configuration is stored in the environment variables.
 * Tutorials may be also manually added through the admin interface
 */

var descriptionFile = require('./descriptions')
var sources = require('./sources').startingLinksSources
const tutorialDB = require('../db/tutorial-queries')

module.exports.populateDB = function () {
  for (let i = 0; i < descriptionFile.startingLinksDescriptions.length; i++) {
    tutorialDB.createTutorial(
      descriptionFile.startingLinksTitles[i],
      descriptionFile.startingLinksDescriptions[i],
      sources[i])
  }
}

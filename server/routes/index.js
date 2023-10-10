var express = require('express')
var router = express.Router()
var userAPI = require('../api/user')
var fileAPI = require('../api/file')
var interactiveAPI = require('../api/interactive')
var compileAPI = require('../api/compile')

var tutorialAPI = require('../api/tutorial')

router.post('/api/user/signup', userAPI.signUp)
router.post('/api/user/login', userAPI.login)
router.post('/api/user/update', userAPI.update)
router.post('/api/file/read', fileAPI.readFile)
router.post('/api/file/write', fileAPI.writeFile)
router.get('/api/initInteractive', interactiveAPI.initInteractive)
router.get('/api/compile', compileAPI.compileLinksFile)
router.get('/api/logout', userAPI.logout)

router.post('/api/tutorial/create', tutorialAPI.createTutorial)
router.post('/api/tutorial/update', tutorialAPI.updateTutorial)
router.post('/api/tutorial/delete', tutorialAPI.removeTutorial)
router.post('/api/tutorial/description', tutorialAPI.getDescription)
router.get('/api/tutorial/headers', tutorialAPI.getHeaders)
router.get('/api/tutorial/defaultId', tutorialAPI.getDefaultTutorialId)
router.get('/api/tutorial/:id', tutorialAPI.getTutorial)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router

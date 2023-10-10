var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var compression = require('compression')
var fs = require('fs')
require('dotenv').config()

var index = require('./routes/index')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(compression({threshold: 0}))
// // create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'server.log'), {flags: 'a'})
// // setup the logger
app.use(logger('tiny', {stream: accessLogStream}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 604800000 }))
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {maxAge: 604800000}
}))

app.use(function (req, res, next) {
  var allowedOrigins = process.env.PORD_DOMAIN
  var origin = req.headers.origin
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  if (req.originalUrl.indexOf('api') === -1 && !res.getHeader('Cache-Control')) res.setHeader('Cache-Control', 'public, max-age=604800000')
  if (req.originalUrl.indexOf('api') === -1 && !res.getHeader('Vary')) res.setHeader('Vary', 'Accept-Encoding')
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', true)
  return next()
})

app.get('/readme', function (req, res) {
  res.sendFile(path.join(__dirname, 'evaluation.pdf'))
})

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'login.html'))
})

app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, 'testrepl.html'))
})

app.use(favicon(path.join(__dirname, 'favicon.ico')))

app.use('/', index)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.code || 500)
      .json({
        status: 'error',
        message: err
      })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
    .json({
      status: 'error',
      message: err.message
    })
})

module.exports = app

var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var compression = require('compression')
var fs = require('fs')
const { auth } = require('express-oauth2-jwt-bearer');
require('dotenv').config()

var index = require('./routes/index')

var app = express()

const jwtCheck = auth({
  audience: process.env.JWT_CHECK_AUDIENCE,
  issuerBaseURL: process.env.JWT_AUTH_DOMAIN
});
app.use(jwtCheck);

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(compression({ threshold: 0 }))
// // create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'server.log'), { flags: 'a' })
// // setup the logger
app.use(logger('tiny', { stream: accessLogStream }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 604800000 }))



app.use(function (req, res, next) {
  var allowedOrigins = process.env.PROD_DOMAIN;
  var origin = req.headers.origin;

  // Log the origin and allowed origins for each request
  var allowedOrigins = process.env.PROD_DOMAIN;
  var origin = req.headers.origin;

  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  if (req.originalUrl.indexOf('api') === -1 && !res.getHeader('Cache-Control')) res.setHeader('Cache-Control', 'public, max-age=604800000');
  if (req.originalUrl.indexOf('api') === -1 && !res.getHeader('Vary')) res.setHeader('Vary', 'Accept-Encoding');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});
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

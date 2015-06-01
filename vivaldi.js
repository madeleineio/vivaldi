'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var http = require('http')
var path = require('path')
var routes = require('./routes')
var app = module.exports = express()

// port
app.set('port', 3019)
// views dir
app.set('views', path.resolve('views'))
// views engine : ejs
app.set('view engine', 'ejs')
// Returns middleware that only parses urlencoded bodies.
// This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings
// The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false)
app.use(bodyParser.urlencoded({ extended: false }))
// Create a new middleware function to override the req.method property with a new value.
// This value will be pulled from the provided getter.
app.use(methodOverride())
// assets dir
app.use(express.static(path.resolve('public')))


// routes
app.get('*', routes.index)

// start your engines !
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
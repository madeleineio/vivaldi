'use strict'

var fs = require('fs')
var path = require('path')
var parser = require('xml2json')


var xml = fs.readFileSync(path.resolve('data/VivNotSco.xml'))
var json = parser.toJson(xml)

fs.writeFileSync(path.resolve('data/score.json'), json)
process.exit(0)
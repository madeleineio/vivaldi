'use strict'

var fs = require('fs')
var path = require('path')
var parser = require('xml2json')
var humps = require('humps')


var xml = fs.readFileSync(path.resolve('public/data/VivNotSco.xml'))
var json = parser.toJson(xml, {
    coerce: true,
    sanitize: true,
    object: true
})

fs.writeFileSync(path.resolve('public/data/score.json'), JSON.stringify(humps.camelizeKeys(json)))
process.exit(0)
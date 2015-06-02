'use strict'

var fs = require('fs')
var path = require('path')
var parser = require('xml2json')


var xml = fs.readFileSync(path.resolve('data/VivNotSco.xml'))
var json = parser.toJson(xml, {
    coerce: true,
    sanitize: true,
    object: false
})

console.log(json)

fs.writeFileSync(path.resolve('public/data/score.json'), json)
process.exit(0)
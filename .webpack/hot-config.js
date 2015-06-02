'use strict'

var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        app: ['webpack/hot/dev-server', path.resolve('web_modules/main.jsx')]
    },
    output: {
        path: path.resolve('public/js'),
        filename: 'main.js',
        publicPath: '/js/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel'],
            exclude: path.resolve('node_modules')
        }]
    }
}
'use strict'

var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: path.resolve('web_modules/main.jsx'),
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
        },
            {test: /\.glsl$/, loader: 'shader'},]
    },
    glsl: {
        // chunks folder, chunkpath by default is ""
        chunkPath: path.resolve('web_modules/shaders/chunks')
    },
}
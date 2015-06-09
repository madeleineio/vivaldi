'use strict'

var path = require('path')
var webpack = require('webpack')

module.exports = {
    devtool: '#source-map',
    entry: [path.resolve('web_modules/main.jsx')],
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
    },
    devServer: {
        contentBase: path.resolve('public'),
        port: 3021
    }
}
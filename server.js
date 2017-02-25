var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');
var WebpackDevServer = require('webpack-dev-server');

var app = express();
var compiler = webpack(config);

new WebpackDevServer(webpack(config),{
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(3000,"0.0.0.0",function(err,result){
    if(err){
        return console.log(err);
    }
    console.log("listening at http://0.0.0.0:3000");
});
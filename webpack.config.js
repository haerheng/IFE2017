var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        bundle: [
            "webpack-dev-server/client?http://0.0.0.0:3000",
            "webpack/hot/only-dev-server",
            './src/index.js'
        ],
        test:[
            "webpack-dev-server/client?http://0.0.0.0:3000",
            "webpack/hot/only-dev-server",
            './src/test.js'
        ]     
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: "[name].js",
        publicPath:'/public'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        // extensions: ['', '.js']
    },
    module: {
        loaders: [
        {
            test: /\.js?$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
        },
        // {
        //     test:/\.css$/,
        //     loaders: ['react-hot','css']
        // },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },
        {
            test: /\.scss/,
            loader: 'style-loader!css-loader!sass-loader'
        }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
        //new webpack.NoErrorsPlugin()
    ]
};

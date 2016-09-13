var webpack = require('webpack');
var path = require("path");
var BowerWebpackPlugin = require('bower-webpack-plugin');

// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
// var providePlugin = new webpack.ProvidePlugin({
// $: "jquery",
//     jQuery: "jquery",
//     "window.jQuery": "jquery"
// });
module.exports = {
    //插件项
    // plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        app: './front_end/story5/app'
    },
    //入口文件输出配置
    output: {
        path: 'webapp/public/dist',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /^(?:(?!http).)*\.scss$/,
            loader: "style!css!sass"
        }, {
            test: /^(?:(?!http).)*\.css$/,
            loader: "style!css"
        }, {
            test: /\.jpg$/,
            loader: "file"
        }, {
            test: /\.svg$/,
            loader: "url?limit=15000&mimetype=image/svg+xml"
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=100000&minetype=application/x-font-woff"
        }, {
            test: /\.png$/,
            loader: "url?limit=15000&mimetype=image/png"
        }, {
            test: /\.html$/,
            loader: "html?attrs=img:src input:src"
        }]
    },
    resolve: {
        //查找module的话从这里开始查找
        root: [
            'D:/',
            path.join(__dirname, "bower_modules")
        ], //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        // alias: { //后续直接 require('AppStore') 即可
        //     js: path.join(__dirname, "src/scripts"),
        //     src: path.join(__dirname, "src/scripts"),
        //     styles: path.join(__dirname, "src/styles"),
        //     img: path.join(__dirname, "src/img")
        // },
        plugins: [
            new BowerWebpackPlugin({
                modulesDirectories: ["bower_modules"],
                manifestFiles: "bower.json",
                includes: /.*/,
                excludes: [],
                searchResolveModulesDirectories: true
            }),
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery',
                jquery: 'jquery'
            })
        ]
    }
};

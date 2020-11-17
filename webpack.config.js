const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDev = process.env.MODE_ENV === 'development';

console.log('isDev', isDev)
module.exports = [{
    mode: isDev ? 'development' : 'production',
    entry : {
        build: ['./src/client/index.js'],
    },
    output : {
        path : path.resolve(__dirname , './public/js'),
        filename: '[name].js'
    },
    module : {
        rules : [{
            test : /\.js$/, 
            include: path.resolve(__dirname , './src'),
            loader: 'babel-loader',
            options: {
                plugins: ['lodash'],
            },
            exclude: ['/node_modules'],
        }, {
            test : /\.css$/, 
            include: path.resolve(__dirname , './public/css'),
            use: ['style-loader', 'css-loader']
        },{
            test: /\.pug$/,
            use:  ['pug-loader']
        }]
    },
    optimization: {
        minimize: true,
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
                moment: {
                    test: /[\\/]node_modules[\\/](moment)[\\/]/,
                    name: 'moment',
                    chunks: 'all',
                },
            },
        },
        concatenateModules: true,
    },
    plugins : [
        new Dotenv(),
        new LodashModuleReplacementPlugin,
        new MomentLocalesPlugin({
            localesToKeep: ['es-us', 'ko'],
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env.IS_TEST": process.env.MODE_ENV === 'test' ? true : false,
        }),
        new HtmlWebpackPlugin(process.env.MODE_ENV === 'test' ? {
            title: 'index.html',
            template: path.resolve(__dirname, './src/templates/index.pug'),
        } : {}),
        // new BundleAnalyzerPlugin(),
    ],
}];

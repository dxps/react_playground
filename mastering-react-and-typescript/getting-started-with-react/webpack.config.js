
const path = require('path');

const autoprefixer = require('autoprefixer');

const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcFolder = 'src';
const distFolder = 'dist';

module.exports = {

    entry: {
        'app': path.join(__dirname, srcFolder, 'ts', 'app.tsx')
    },

    resolve: {
        extensions: [
            '.js', '.ts', '.tsx', '.json'
        ],
        //root: path.join(__dirname, srcFolder, 'ts')
        modules: [ path.join(__dirname, srcFolder, 'ts') ]
    },

    module: {

        loaders: [

            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },

            // processes JSON files, useful for config files and mock data
            {
                test: /\.json$/,
                loader: 'json-loader'
            },

            // transpiles global SASS stylesheets loader order is executed right to left
            {
                test: /\.scss$/,
                exclude: [path.join(__dirname, srcFolder, 'ts')],
                loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }, {
                test: /\.scss$/,
                exclude: [path.join(__dirname, srcFolder, 'scss')],
                loaders: ['raw-loader', 'sass-loader']
            }

        ]

    }, // end of module

    // configuration for the postcss loader which modifies CSS after processing
    // autoprefixer plugin for postcss adds vendor specific prefixing for
    // non-standard or experimental css properties
    // postcss: [require('autoprefixer')],

    plugins: [

        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [autoprefixer]
            }
        }),

        new webpack.ProvidePlugin({'Promise': 'es6-promose', 'fetch': 'import?this=>global!exports?global.fetch!whatwg-fetch'}),

        new CopyWebpackPlugin([
            {
                from: path.join(srcFolder, 'images'),
                to: path.join('..', 'images')
            }
        ]),

        new HtmlWebpackPlugin({
            template: path.join(__dirname, srcFolder, 'index.html'),
            filename: path.join('..', 'index.html'),
            inject: 'body'
        })

    ],

    output: {
        path: path.join(__dirname, distFolder, 'js'),
        filename: '[name].js',
        publicPath: '/js'
    },

    devtool: 'source-map',

    devServer: {
        contentBase: 'dist',
        historyApiFallback: true,
        port: 5000,
        proxy: {
            '/widgets': {
                target: 'http://0.0.0.0:3010'
            }
        }
    }

};
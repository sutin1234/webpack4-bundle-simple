const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

// config
const entryFile = path.resolve(__dirname, 'src/js/app.js')
const outputFile = 'bundle.js'



module.exports = {
    mode: process.env.NODE_ENV,
    entry: entryFile,
    output: {
        filename: outputFile,
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.css', '.scss', '.sass', '.less', '.png'],
        alias: {
            modernizr$: path.resolve(__dirname, "src/vendors/modernizr-custom.js")
        }
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    }
                },
                canPrint: true
            })
        ]
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            minimize: true
                        }
                    },
                    "postcss-loader",
                    "sass-loader",

                ]
            },
            {
                test: /modernizr/,
                loader: 'imports-loader?this=>window!exports-loader?window.Modernizr'
            },
            {
                test: /detectizr/,
                loader: 'imports-loader?this=>window!exports-loader?window.Detectizr'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            minify: {
                collapseWhitespace: true
            },
        }),
    ],
};
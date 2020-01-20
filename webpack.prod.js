const {CleanWebpackPlugin} = require('clean-webpack-plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


module.exports = {

    // https://webpack.js.org/concepts/entry-points/#multi-page-application
    entry: {
        index: './src/index.js'
    },

    devServer: {
        port: 8080
    },

    module: {
        rules: [
            {//Regras para o HTML
                test: /\.html$/,
                loader: 'html-loader',
            },
            {//Regras para o JS
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {//Regras para o CSS
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {//Regras para imagens
                test: /\.(png|jpg|gif)$/i,
                loader: "file-loader",
                options: {
                    name: 'images/[name].[ext]',
                    esModule: false
                  },
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css"
        })
    ],

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    }
};
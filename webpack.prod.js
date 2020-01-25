const {CleanWebpackPlugin} = require('clean-webpack-plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {

    entry: {
        index: './src/index.js'
    },

    output: {
        filename: "js/scripts.js"
    },

    module: {
        rules: [{ //Regras para o HTML
                test: /\.html$/,
                loader: 'html-loader'
            },
            { //Regras para o JS
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            { // Regras para arquivos SASS
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            { //Regras para o CSS
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {//Regras para arquivos SASS
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ] 
            },
            {//Regras para imagens
                test: /\.(png|jpg|gif)$/i,
                loader: "file-loader",
                options: {
                    name: 'images/[name].[ext]',
                    esModule: false
                },
            },
            { //Regras para fontes
                test: /\.(ttf|otf|woff|woff2|svg|eot)$/i,
                loader: "file-loader",
                options: {
                    name: 'fonts/[name].[ext]',
                    esModule: false
                }
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
            filename: "css/styles.css",
            chunkFilename: "css/[id].css"
        })
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: true
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    }
};
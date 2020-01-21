const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

    entry: {
        index: './src/index.js'
    },

    devServer: {
        port: 8080
    },

    module: {
        rules: [{ //Regras para o HTML
                test: /\.html$/,
                loader: 'html-loader',
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
                    "style-loader",
                    "css-loader"
                ]
            },
            { //Regras para imagens
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
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html'
        })
    ]
};
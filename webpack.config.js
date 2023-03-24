const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 3000,
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        hot: true,
        historyApiFallback: true
    },
    resolve: { extensions: ['.ts', '.tsx', '.js']},
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new MiniCssExtractPlugin()
    ],
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js)$/,
                exclude: '/node_modules/',
                use: 'babel-loader'
            },
            {
                test: /\.m\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: "[local]__[hash:base64:5]"
                            }
                        }
                    }
                ]
            },
            {
                test: /^((?!\.m).)*css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    }
}
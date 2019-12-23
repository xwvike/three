const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app:'./src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase:'./dist'
    },
    module: {
        rules: [
            {test:/\.css$/, use: ['style-loader','css-loader']},
            {test:/\.(png|svg|jpe?g|gif)$/, use: ['file-loader']}
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    output: {
        filename: "[name].app.js",
        path: path.resolve(__dirname,'dist')
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    }
};

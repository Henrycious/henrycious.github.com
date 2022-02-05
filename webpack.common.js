const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

const path = require("path");

module.exports = { 
    entry: {
      main: './src/index.js'
      // navigation: "./src/js/navigation.js"
    },
    plugins: [new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: true
    })],
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
    },
    module: {
        rules: [
          {
            test: /\.html$/i,
            use: ["html-loader"],
          },
          {
            test: /\.(svg|png|jpe?g|gif)$/i,
            type: 'asset/resource',
            // use: {
            //   loader:'file-loader',
            //   options: {
            //     name:'[name].[hash].[ext]',
            //   }
            // },
          }, 
          // {
          //   test: /\.js$/,
          //   exclude: /node_modules/,
          //   use: ['babel-loader'],
          // },  
        ],
    },
};

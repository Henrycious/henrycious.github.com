const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = merge(common, { 
    mode: "production",
    output: {
        filename: "[name].[contenthash].bundle.js",
        path: path.resolve(__dirname,"./dist/"),
        publicPath: '',
        assetModuleFilename: '[path][name].[hash][ext][query]'
    },
    plugins: [  
        new MiniCssExtractPlugin({filename: "[name].[contenthash].css"}), 
        new CleanWebpackPlugin()
        // new CopyPlugin({
        //     patterns: [
        //         { from: 'src/assets' }
        //     ]
        // })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, //Extract files into files
                    "css-loader"] //convert css into commonjs
              },
        ]
    }
});

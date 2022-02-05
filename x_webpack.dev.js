const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, { 
    mode: "development",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname,"./dist/"),
        publicPath: '/',
        assetModuleFilename: '[path][name].[hash][ext][query]',
    }, 
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
        ]
    },

});

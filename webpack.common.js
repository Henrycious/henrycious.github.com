const CopyWebpackPlugin = import('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path');
const glob = require('glob');
const ip = import('internal-ip');
const portFinderSync = require('portfinder-sync');

const infoColor = (_message) =>
{
    return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`
}
//Multi page entry
function getEntry() {
  const entry = {};
  glob.sync('./src/pages/**/index.js').forEach((file) => {
    const name = file.match(/\/pages\/(.+)\/index.js/)[1];
    entry[name] = file;
  });
  return entry;
}

//Multi page template
function getHtmlTemplate() {
  return glob
    .sync('./src/pages/**/index.html')
    .map((file) => {
      return { name: file.match(/\/pages\/(.+)\/index.html/)[1], path: file };
    })
    .map(
      (template) =>
        new HtmlWebpackPlugin({
          template: template.path,
          chunks: [template.name.toString()],
          filename: `${template.name}.html`,
        })
    );
}

module.exports = { 
    mode: 'production',
    entry: getEntry(),
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname,"./dist/"),
      publicPath: '',
      assetModuleFilename: '[path][name].[hash][ext][query]',
      library:'webpackGhPages'
    },
    plugins: [  
      new CleanWebpackPlugin(),
      ...getHtmlTemplate(),
      new CopyPlugin({
        patterns: [{
          from: 'src/assets/static'
        }]
      })
      // new CopyPlugin({
      //     patterns: [
      //         { from: 'src/assets' }
      //     ]
      // })
    ],
    devServer:
    {   
        host: '0.0.0.0',
        port: portFinderSync.getPort(8080),
        contentBase: './dist',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        watchContentBase: true,
        open: true,
        https: false,
        useLocalIp: true,
        disableHostCheck: true,
        overlay: true,
        noInfo: true,
        after: function(app, server, compiler)
        {
            const port = server.options.port
            const https = server.options.https ? 's' : ''
            const localIp = ip.v4.sync()
            const domain1 = `http${https}://${localIp}:${port}`
            const domain2 = `http${https}://localhost:${port}`
            
            console.log(`Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(domain2)}`)
        }
    },
    module: {
        rules: [
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
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          // Images
          {
              test: /\.(jpg|png|gif|svg)$/,
              type: 'asset/resource',
          },
          {
            test: /\.html$/,
            loader: "html-loader",
          },
          // {
          //   test: /\.js$/,
          //   exclude: /node_modules/,
          //   use: ['babel-loader'],
          // },  
        ],
    },
};

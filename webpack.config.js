const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV;
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';

const setupDevTool = () => {
  if (IS_DEV) return 'eval';
  if (IS_PROD) return false;
}

module.exports = {
  resolve: {
    extensions:['.js','.json']
  },
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'editingStyles.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/img/[name].[ext]',
        },
      },
      {  
        test:/\.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
          loader: 'css-loader',
          }
        ],
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
        title: 'webpack Boilerplate',
        template: path.resolve(__dirname, '/index.html'), // шаблон
        filename: 'index.html', // название выходного файла
    }),
    new MiniCssExtractPlugin({
      filename: "editingStyles.css",
  })
],
  devServer: {
    port:3000,
    open: true,
    hot: IS_DEV,
  },
  devtool: setupDevTool(),
}

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './ui/src',
  output: {
      filename: '[name].[contenthash].bundle.js',
      path: path.resolve(__dirname, 'ui/dist/'),
  },
  module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
          }
      },
      {
          test: /\.css$/,
          use: [
              'style-loader',
              'css-loader'
          ]
      },
      {
          test: /\.(png|jpg|gif|ico)$/i,
          loader: 'file-loader',
          options: {
              name: 'img/[name].[ext]'
          }
      },
      {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'file-loader',
          options: {
              name: 'fonts/[name].[ext]'
          }
      }
      ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: './ui/src/template.html',
          favicon: './ui/src/favicon.ico'
      }),
      new BundleAnalyzerPlugin(),
      new CleanWebpackPlugin()
  ],
  optimization: {
      splitChunks: {
          chunks: 'all'
      }
  }
};

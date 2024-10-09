const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      index: path.resolve(__dirname, 'src/index.jsx'),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    plugins: [new HtmlWebpackPlugin(), new MiniCssExtractPlugin()],
    devServer: {
      port: 3000,
      historyApiFallback: true,
      proxy: [
        {
          context: ['/graphql'],
          target: 'http://localhost:8080',
        },
      ],
    },
    devtool: 'inline-source-map',
  };
};

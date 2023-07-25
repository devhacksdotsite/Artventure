const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
	publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
			  "@babel/preset-env",
			  ["@babel/preset-react", {"runtime": "automatic"}]
			]
          },
        },
      },
    ],
  },
  resolve: {
	extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['bundle.js'], // Only clean bundle.js
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 3000,
	allowedHosts: "all",
	historyApiFallback: true
  },
};


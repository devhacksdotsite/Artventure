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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Make sure you have 'style-loader' installed as well
      },
    ],
  },
  resolve: {
	extensions: ['', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
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


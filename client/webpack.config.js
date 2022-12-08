const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const isProd = !!env.production;
  const mode = isProd ? 'production' : 'development';
  return {
    mode,
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.bundle.js'
    },
    resolve: {
      extensions: ['.js']
    },
    devtool: isProd ? undefined : 'source-map',
    module: {
      rules: [
        {
          test: /environment.js/,
          use: {
            loader: path.resolve(__dirname, 'loaders', 'environment-replacer')
          }
        },
        {
          test: /\.txt$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'raw-loader',
              options: { esModule: false }
            }
          ]
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({

        inject: 'body',
        title: 'My First Webpack App',
        filename: './index.html',
        template: './index.html'
      })
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9000
    }
  };
};
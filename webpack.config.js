const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const mfConfig = require('./config/mf.config.js');

module.exports = (env, argv) => {
  const mode = argv.mode || 'development';

  const config = {
    entry: './src/index.ts',
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist')
      },
      port: 3002,
      historyApiFallback: true
    },
    output: {
      publicPath: 'auto'
    },
    resolve: {
      extensions: ['.jsx', '.js', '.json', '.tsx', '.ts']
    },
    module: {
      rules: [
        // {
        //   test: /\.css$/i,
        //   use: ['style-loader', 'css-loader'],
        // },
        // {
        //   test: /\.(png|jpg|jpeg|svg)$/i,
        //   type: 'asset/resource',
        // },
        // {
        //   test: /\.m?js/,
        //   type: 'javascript/auto',
        //   resolve: {
        //     fullySpecified: false,
        //   },
        // },
        {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript'
              ]
            }
          }
        }
      ]
    },
    plugins: [
      new ModuleFederationPlugin({
        ...mfConfig,
        name: 'mf_ui',
        filename: 'remoteEntry.js',
        library: { type: 'var', name: 'mf_ui' }
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html'
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false
      })
    ]
  };

  if (mode === 'production') {
    config.output = {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      publicPath: 'http://localhost:3002/'
    };
    config.plugins.push(new CleanWebpackPlugin());
  }

  return config;
};

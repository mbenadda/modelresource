const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.ts',

  externals: {
    'lodash': {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    }
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ 'env' ],
            },
          },
          'ts-loader'
        ],
        exclude: '/node_modules/',
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin([ 'dist' ]),
  ],

  resolve: {
    extensions: [ '.js', '.ts' ],
  },

  output: {
    filename: 'umd.js',
    library: 'modelresource',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
  },
};
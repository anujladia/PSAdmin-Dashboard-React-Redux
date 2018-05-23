import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
  debug: true,
  devtool: 'source-map', //'cheap-module-eval-source-map',
  noInfo: false,
  entry: path.resolve(__dirname, 'src/index'), //'./src/index'
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase:  path.resolve(__dirname, 'dist')  //'./src'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),  //optimises the order our files are bundled in for optimal minification
    new webpack.DefinePlugin(GLOBALS),  //lets us define variables that are then made available to the libraries that webpack is bundling
    new ExtractTextPlugin('styles.css'),  //lets us extract our css in seperate files
    new webpack.optimize.DedupePlugin(),  // eliminates the duplicate packages from our final bundle
    new webpack.optimize.UglifyJsPlugin() //minifies our JS
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /(\.css)$/, loader: ExtractTextPlugin.extract("css?sourceMap")},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};

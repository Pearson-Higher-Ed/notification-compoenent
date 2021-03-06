// [name] under the output section denotes the entry prop names
module.exports = {
  entry: {
   dev: ['webpack/hot/dev-server', './main.js', './demo/demo.js'],
   dist: ['./main.js']
  },
  output: {
    path: './',
    filename: 'build/[name].notification.js',
    libraryTarget: "umd"
  },
  devtool: 'cheap-module-source-map',
  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    }
  ],
  contentBase: "./demo", // for webpack dev server
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!sass' // sass -> css -> javascript -> inline style
      },
      {
        test: /\.(jpg|jpeg|png|ico)$/,
        loaders: ['file-loader?name=images/[path]/[name].[hash].[ext]&context=src/images']
      },
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      // comment this next line out to enable console.log
      { test: /\.js$/, loader: 'webpack-strip?strip[]=console.log' }
    ]
  }
};

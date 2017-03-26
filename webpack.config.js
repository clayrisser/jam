module.exports = {
  context: __dirname,
  entry: './src/jam.js',
  output: {
    filename: 'jam.js',
    path: __dirname + '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  }
}

module.exports = {
	entry: __dirname + '/src/app',
	output: {
		path: '/',
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	}
};

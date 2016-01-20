var webpack = require("webpack");
var path = require("path");
var BowerWebpackPlugin = require("bower-webpack-plugin");

module.exports = {
	entry: "./src/NotificationComponent.jsx",
	output: {
		path: __dirname + "/lib",
		publicPath: "/lib",
		filename: "notification.min.js",
		libraryTarget: "umd",
		library: "NotificationComponent"
	},
	module: {
		loaders: [
			{ 
				test: /\.jsx?$/, 
				exclude: /(node_modules|bower_components)/,
				loader: "babel-loader" 
			},
			{
				// sass-loader for the origami pieces
				test: /\.scss$/,
				loaders: ["style", "css", "sass"]
			}
		]
	},
	plugins: [
		// uncomment to minify
		// new webpack.optimize.UglifyJsPlugin({minimize: true})

		// bowerwebpackplugin makes it so that it searches the bower.json file for which file to add
		new BowerWebpackPlugin({
			modulesDirectories: ["bower_components"],
			manifestFiles: "bower.json",
			includes: /.*/,
			excludes: [],
			searchResolveModulesDirectories: true
		}),

		// css bundles....
		//new ExtractTextPlugin("[name].css", {}),
	],

	//resolve bower_components
	resolve: {
		modulesDirectories: ["node_modules", "bower_components"],
		extensions: ["", ".js", ".jsx"]
	}
};
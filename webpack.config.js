var webpack = require("webpack");
var path = require("path");
var BowerWebpackPlugin = require("bower-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: "./runNot.js",
	output: {
		path: __dirname,
		publicPath: "./",
		filename: "notification.min.js",
		libraryTarget: "umd",
		library: "NotificationComponent"
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				loader: "babel-loader"
			},
			{
				// sass-loader for the origami pieces
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract("style", "css!sass")
			}
		]
	},
	plugins: [
		// uncomment to minify
		// new webpack.optimize.UglifyJsPlugin({minimize: true}),

		// bowerwebpackplugin makes it so that it searches the bower.json file for which file to add
		new BowerWebpackPlugin({
			modulesDirectories: ["bower_components"],
			manifestFiles: "bower.json",
			includes: /.*/,
			excludes: [],
			searchResolveModulesDirectories: true
		}),

		// css bundles....
		new ExtractTextPlugin("notification.css", {})
	],

	//resolve bower_components
	resolve: {
		modulesDirectories: ["node_modules", "bower_components"],
		extensions: ["", ".js", ".jsx"]
	}
};

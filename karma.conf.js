/*global module, process*/


"use strict";

module.exports = function(config) {
    config.set({
        frameworks: [
            // Reference: https://github.com/karma-runner/karma-jasmine
            // Set framework to jasmine
            "mocha"
        ],

        plugins: [
            "karma-webpack",
            "karma-sourcemap-loader",
            "karma-phantomjs-launcher",
            "karma-spec-reporter",
            "karma-chrome-launcher"
        ],

        reporters: [
            // Reference: https://github.com/mlex/karma-spec-reporter
            // Set reporter to print detailed results to console
            "spec"
        ],

        files: [
            //polyfill like we do with chorme browsers
            "http://polyfill.webservices.ft.com/v1/polyfill.js?ua=safari/4&features=default,WeakMap,Promise",
            // Grab all files in the app folder that contain .test.
            "test/*.test.js"
        ],

        preprocessors: {
            // Reference: http://webpack.github.io/docs/testing.html
            // Reference: https://github.com/webpack/karma-webpack
            // Convert files with webpack and load sourcemaps
            "test/*.test.js": ["webpack", "sourcemap"]
        },

        browsers: [
            // Run tests using PhantomJS
            "PhantomJS"
        ],

        singleRun: true,

        // Configure code coverage reporter
        coverageReporter: {
            dir: "build/coverage/",
            type: "html"
        },

        webpack: {
            module: {
                loaders: [
                    { 
                        test: /\.jsx?$/, 
                        exclude: /(node_modules)/,
                        loader: "babel-loader" 
                    },
                    {
                        // sass-loader for the origami pieces
                        test: /\.scss$/,
                        loader: "null-loader"
                    }
                ]
            },
            resolve: {
                modulesDirectories: ["node_modules"],
                extensions: ["", ".js", ".jsx"]
            },
            plugins: [
            ]
        },

        // Hide webpack build information from output
        webpackMiddleware: {
            noInfo: true
        }
    });
};
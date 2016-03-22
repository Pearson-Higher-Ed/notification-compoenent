# Notification-Component

This is for getting notifications from notification-api onto the screen.  It is assumed eventually it will be added to the o-app-header and show a bell at the top of the header bar with a number of notifications it has brought in.

## Building

```
	npm install
	bower install
	webpack
```

Include the notification.min.js file as well as notification.css.

## Running the demo

You will need to replace the expired pi token found in runNot.js with a current token before running the demo.
Next, build as above, then start the server:

```
webpack-dev-server
```
The demo will be served from http://localhost:8080/index.html

## Running in debug mode

To run the demo in debug mode, open webpack.config.js and comment out the following line:

```
new webpack.optimize.UglifyJsPlugin({minimize: true}),
```

Then, include the -d argument on the webpack command and start the server:

```
webpack -d
webpack-dev-server
```

The demo will be served from http://localhost:8080/index.html and can be debugged using firebug or similar.

## Running tests
```
npm test
```

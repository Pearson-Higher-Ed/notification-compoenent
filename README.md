# Notification-Component

This is for getting notifications from notification-api onto the screen.  It is assumed eventually it will be added to the o-app-header and show a bell at the top of the header bar with a number of notifications it has brought in.

## Building

```
	npm install
	bower install
	webpack
```

Include the notification.min.js file as well as notification.css (skip this if you're just running the demo).

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

## Deployment Notes
The coachmark route of the feedback API can accept any valid JSON, so care must be taken when posting to this route.
Be sure that the spelling of the "options" elements match those of the o-choach-mark component contract's options.

An example [feedbackApi]/coachmark payload:
```
{
	"element": "foo1",
	"uri": "index.html",
	"options": {
		"title": "Coachmark",
		"text": "Some text for a coachmark",
		"hasBack": false,
		"hasNext": true,
		"like": false,
		"currentCM": 1,
		"totalCM": 6
	}
}
```

When creating a notification event that will trigger a coachmark,
be sure to include the masterpieceId element and a list of coachmark IDs in the cmIds element.

The targetUserRole should also be included, this is used by the FeedbackApi as the groupAuthType search field.
If it's missing, the default will be 'N/A'

An example [notificationApi]/events payload:
```
{
	"appType": "aegisTestApp",
	"productType": "aegisTestProduct",
	"eventType": "all",
	"recipientIds": ["ffffffff560c1a1ee4b04ebf43118c60"],
	"eventModel": {
		"id": 5001,
		"title": "CMs 24-29 with masterpieceId",
		"body": "Some body text. Click to open up some coachmarks!",
		"link": "console-stg.pearson.com:8080/account/manage/account",
		"linkText":"Go to Profile Screen",
		"icon": "fa fa-cogs fa-2x",
		"cmIds":"24,25,26,27,28,29",
		"masterpieceId":"200",
		"targetUserRole":"stud"
	}
}
```
Note that the "id" value in the eventModel object must be unique for each notification,
or else the notification component will only display the first notification with that ID.

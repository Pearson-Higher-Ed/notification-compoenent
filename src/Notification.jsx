let NotificationApi = require("./NotificationApi");
let configuration = require("./config");
let drawer = require("o-drawer");
let NotificationList = require("./NotificationList");
let React = require("react");
let ReactDOM = require("react-dom");

function Notification(element, env, configOverride) {

	// -------------------validation area----------------------------- //
	if (!(this instanceof Notification)) {
		throw new TypeError("Constructor Notification requires \"new\"");
	}
	if (!element) {
		throw new TypeError("missing required argument: element");
	}
	if(!env) {
		throw new Error("no environment set need to pass in environment");
	}

	if (typeof element === "string") {
		element = document.querySelector(element);
	}
	if (!element) {
		return;
	}

	if(configOverride) {
		configuration = configOverride;
	}

	let config = configuration[env];
	if(!config) {
		throw new Error("Configuration with " + env + " was not found");
	}
	// -------------------validation area----------------------------- //
	
	// create bell and notificationList objects
	ReactDOM.render(
		<div>
			<i className="fa fa-bell"></i>
			<div id="notificationContent"></div>
		</div>,
		element
	);
	ReactDOM.render(
		<NotificationList />,
		document.getElementById("notificationContent")
	);

	// give the bell some mouse event
	element.onmousedown = function() {
		console.log("mouse down");
	};

	// get notification list
	let notApi = new NotificationApi(config);
	let userNotifications = notApi.getNotifications("console");

	userNotifications.then(function(result) {
		console.log(result);
	}, function(error) {
		console.log(error);
	});

}

module.exports = Notification;
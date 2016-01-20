let configuration = require("./config");
let React = require("react");
let ReactDOM = require("react-dom");
let NotificationDropdown = require("./NotificationDropdown");
let NotificationApi = require("./NotificationApi");

function NotificationComponent(element, env, configOverride) {

	// -------------------validation area----------------------------- //
	if (!(this instanceof NotificationComponent)) {
		throw new TypeError("Constructor NotificationComponent requires \"new\"");
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
	

	let notApi = new NotificationApi(config);
	let userNotifications = notApi.getNotifications("console");

	userNotifications.then((result) => {
		ReactDOM.render(
		<NotificationDropdown notificationList={result}/>,
		element
	);

	}, function(error) {
		console.log(error);
	});
	// create bell and notificationList objects
	

}

module.exports = NotificationComponent;
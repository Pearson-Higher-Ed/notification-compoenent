let NotificationApi = require("./notification-api");
let configuration = require("./config");
let drawer = require("o-drawer");


function Notification(element, env, configOverride) {

	// validation area
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
	// validation area

	let notApi = new NotificationApi(config);

	this.notificationNode = document.createElement("div");
	this.notificationNode.appendChild(document.createTextNode("click here"));
	
	element.appendChild(this.notificationNode);

	let userNotifications = notApi.getNotifications("console");

	userNotifications.then(function(result) {
		console.log(result);
	}, function(error) {
		console.log(error);
	});
}

module.exports = Notification;
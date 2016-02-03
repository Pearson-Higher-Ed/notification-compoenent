let UserNotConfig = require("./NotificationConfig");
module.exports = function() {
	this.getNotifications = function(headerConfig) {
		let responseIs = new Promise(function(resolve, reject) {
			let req = new XMLHttpRequest();
			req.open('GET', UserNotConfig.Stg.UserNotificationURL + headerConfig.RecipientId);
			req.setRequestHeader('X-Authorization', headerConfig.PiToken);
			req.setRequestHeader('Accept', UserNotConfig.Stg.AcceptHeader);
			req.setRequestHeader('Content-Type', UserNotConfig.Stg.ContentTypeHeader);
			req.onload = function() {
				if (req.status == 200) {
					// Resolve the promise with the response text
					resolve(req.response);
				} else {
					// Otherwise reject with the status text
					reject(Error(req.statusText));
				}
			};
			// Handle network errors
			req.onerror = function() {
				reject(Error("Network Error"));
			};
			// Make the request
			req.send();
		});
		return responseIs;
	}

	this.parseResponse = function(response) {
		let userNotificationsList = [];
		let userNotifications = JSON.parse(response)._embedded.usernotifications;
		userNotifications.forEach(notification => {
			if (notification.hasOwnProperty('notificationType') && notification.notificationType === 'inbrowser') {
				try {
					userNotificationsList.push(JSON.parse(notification.payload.message));
				} catch (e) {
					userNotificationsList.pop;
					console.log("Error in the payload " + e);
				}
			}
		});
		return userNotificationsList;
	}
};
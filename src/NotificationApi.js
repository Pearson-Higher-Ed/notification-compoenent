let UserNotConfig = require("./NotificationConfig");
module.exports = function() {
	this.getNotifications = function(headerConfig) {
		let responseIs = new Promise(function(resolve, reject) {
			let req = new XMLHttpRequest();
			req.open('GET', `${UserNotConfig.UserNotificationURL}/${headerConfig.RecipientId}`);
			req.setRequestHeader('X-Authorization', headerConfig.PiToken);
			req.setRequestHeader('Accept', UserNotConfig.AcceptHeader);
			req.setRequestHeader('Content-Type', UserNotConfig.ContentTypeHeader);
			req.onload = () => {
				if (req.status !== 200) {
					return reject(new Error(req.statusText));
				}
				return resolve(req.response);
			};
			req.onerror = (err) => {
				reject(err || new Error('Network Error'));
			};
			req.send();
		});
		return responseIs;
	}

	this.parseResponse = function(response) {
		let userNotifications = JSON.parse(response)._embedded.usernotifications;
		let userNotificationsList = userNotifications.filter((notification) => {
			return (notification.hasOwnProperty('notificationType') && notification.notificationType === 'inbrowser');
		}).map((notification) => {
			return JSON.parse(notification.payload.message);
		});
		return userNotificationsList;
	}
};
import xhr from 'o-xhr';
module.exports = function() {
	this.getNotifications = function(headerConfig, UserNotConfig) {
		let responseIs = new Promise(function(resolve, reject) {
			xhr({
				url: `${UserNotConfig.UserNotificationURL}/${headerConfig.RecipientId}`,
				headers: {
					'X-Authorization': headerConfig.PiToken,
					'Accept': UserNotConfig.AcceptHeader,
					'Content-Type': UserNotConfig.ContentTypeHeader
				},
				onSuccess: function(request) {
					resolve(request.responseText);
				},
				onError: function(request) {
					console.log(request.responseText);
					reject(request.responseText || new Error('Network Error'));
				}
			});
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
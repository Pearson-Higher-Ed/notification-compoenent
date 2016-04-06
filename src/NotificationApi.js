import xhr from 'xhr';

module.exports = function NotificationApi(config) {
	let url = config.nfApiUrl;
	let xAuth = config.nfPiToken;
	let acceptHeader = config.nfAcceptHeader;
	let contentType = config.nfContentTypeHeader;
	let recipientId = config.nfRecipientId;

	this.getNotifications = function() {
		let response = new Promise(function(resolve, reject) {
			xhr({
				url: url + '/' + recipientId,
				headers: {
					'X-Authorization': xAuth,
					'Accept': acceptHeader,
					'Content-Type': contentType
				},
				onSuccess: function(request) {
					resolve(parseResponse(request.responseText));
				},
				onError: function(request) {
					console.log(request.responseText);
					reject(request.responseText || new Error('Network Error'));
				}
			});
		});
		return response;
	};

	this.markAsRead = function(notificationId) {
		let response = new Promise(function(resolve, reject) {
			console.log('STUB: NotificationApi.markAsRead with notificationId: ' + notificationId + ' for recipientId: ' + recipientId); // TODO
		});
		return response;
	};


	 function parseResponse(response) {
		let userNotifications = JSON.parse(response)._embedded.usernotifications;
		let userNotificationsList = userNotifications.filter((notification) => {
			return (notification.hasOwnProperty('notificationType') && notification.notificationType === 'inbrowser');
		}).map((notification) => {
			return JSON.parse(notification.payload.message);
		});
		return userNotificationsList;
	}
};

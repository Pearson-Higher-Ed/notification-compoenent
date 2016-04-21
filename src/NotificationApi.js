
module.exports = function NotificationApi(config) {
	let url = config.nfApiUrl;
	let xAuth = config.nfPiToken;
	let contentType = config.nfContentTypeHeader;
	let recipientId = config.nfRecipientId;

	this.getNotifications = function() {
		let response = new Promise(function(resolve, reject) {
			let request = new Request(url + '/usernotifications/recipientid/' + recipientId, {
				method: 'GET',
				mode: 'cors',
				headers: {
					'X-Authorization': xAuth,
					'Content-Type': contentType
				}
			});
			fetch(request).then(function(response) {
				return response.json();
			}).then(function(j) {
				resolve(parseResponse(j));
			}).catch(function(error) {
				console.log('onError: ', error);
				reject(error);
			});
		});
		return response;
	};

	this.markAsRead = function(userNotificationId) {
		let response = new Promise(function(resolve, reject) {
			let request = new Request(url + '/readusernotifications/' + userNotificationId + '/true', {
				method: 'PUT',
				mode: 'cors',
				headers: {
					'X-Authorization': xAuth,
					'Content-Type': contentType
				}
			});
			fetch(request).then(function(response) {
				resolve(response);
			}).catch(function(error) {
				console.log('onError: ', error);
				reject(error);
			});
		});
		return response;
	};


	 function parseResponse(response) {
		let userNotifications = response._embedded.usernotifications;
		let userNotificationsList = userNotifications.filter((notification) => {
			return (notification.hasOwnProperty('notificationType') && notification.notificationType === 'inbrowser');
		}).map((notification) => {
			let result = JSON.parse(notification.payload.message);
			result.userNotificationId = notification.id;
			result.userId = notification.recipientId;
			return result;
		});
		return userNotificationsList;
	}
};

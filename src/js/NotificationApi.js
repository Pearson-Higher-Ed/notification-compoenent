import 'whatwg-fetch';

function parseResponse(response) {
	'use strict';
	const userNotifications = response._embedded.usernotifications;
	const userNotificationsList = userNotifications.filter((notification) => {
		return (notification.hasOwnProperty('notificationType') && notification.notificationType === 'inbrowser');
	}).map((notification) => {
		const result = JSON.parse(notification.payload.message);
		result.updatedAt = notification.updatedAt;
		result.createdAt = notification.createdAt;
		result.userNotificationId = notification.id;
		result.userId = notification.recipientId;
		return result;
	});
	return userNotificationsList;
}

export default class NotificationApi {

	constructor(config) {
		this.url = config.nfApiUrl;
		this.xAuth = config.nfPiToken;
		this.contentType = config.nfContentTypeHeader;
		this.recipientId = config.nfRecipientId;
	}

	getNotifications() {
		const response = new Promise((resolve, reject) => {
			const request = new Request(this.url + '/usernotifications/recipientid/' + this.recipientId, {
				method: 'GET',
				mode: 'cors',
				headers: {
					'X-Authorization': this.xAuth,
					'Content-Type': this.contentType
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
	}

	markAsRead(userNotificationId) {
		const response = new Promise((resolve, reject) => {
			const request = new Request(this.url + '/readusernotifications/' + userNotificationId + '/true', {
				method: 'PUT',
				mode: 'cors',
				headers: {
					'X-Authorization': this.xAuth,
					'Content-Type': this.contentType
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
	}

};

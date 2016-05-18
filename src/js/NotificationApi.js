import 'whatwg-fetch';

function parseResponse(response) {
	'use strict';
	const userNotifications = response._embedded.usernotifications;

	let newNotifications = false;
	const archivedNotificationsList = [];
	let unreadCount = 0;
	// we are doing this simply to make it so that we flatten the object.  This is because the way notification works is
	// it sends a payload message body which is a template which we made it a template of a json object.  
	const userNotificationsList = userNotifications.filter((notification) => {
		return (notification.hasOwnProperty('notificationType') && notification.notificationType === 'inbrowser');
	}).map((notification) => {
		const result = JSON.parse(notification.payload.message);
		notification.message = result;
		if (notification.status === 'CREATED') {
			newNotifications = true;
		}
		if (notification.status === 'ARCHIVED') {
			archivedNotificationsList.push(notification);
		}
		if (notification.isRead === false) {
			unreadCount++;
		}
		return notification;
	});
	return {
		list: userNotificationsList,
		newNotifications: newNotifications,
		archivedList: archivedNotificationsList,
		unreadCount: unreadCount
	};
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
			}).then(function(json) {
				resolve(parseResponse(json));
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

	markAsViewed(userNotificationId) {
		const response = new Promise((resolve, reject) => {
			const payload = {
				status: 'VIEWED'
			};

			const request = new Request(this.url + '/usernotifications/' + userNotificationId, {
				method: 'PUT',
				mode: 'cors',
				headers: {
					'X-Authorization': this.xAuth,
					'Content-Type': this.contentType
				},
				body: JSON.stringify(payload)
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

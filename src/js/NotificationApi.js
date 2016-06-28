import 'whatwg-fetch';
import decode from './utf8Decoding.js';

function parseResponse(response) {
	'use strict';
	const userNotifications = response._embedded.usernotifications;

	let newNotifications = false;
	let unreadCount = 0;
	// we are doing this simply to make it so that we flatten the object.  This is because the way notification works is
	// it sends a payload message body which is a template which we made it a template of a json object.
	const userNotificationsList = userNotifications.filter((notification) => {
		return (notification.hasOwnProperty('notificationType') && notification.notificationType === 'inbrowser' && notification.status !== 'ARCHIVED');
	}).map((notification) => {
		try {
			const result = JSON.parse(notification.payload.message);
			notification.message = decode.decodeNotificationMessage(result);

			if (notification.status === 'CREATED') {
				newNotifications = true;
			}
			if (notification.isRead === false) {
				unreadCount++;
			}
			notification.createdAt = new Date(notification.createdAt);
			notification.updatedAt = new Date(notification.updatedAt);
			return notification;
		} catch (e) {
			console.log(`Error parsing payload message!\n${e}\nPayload message:\n${notification.payload.message}`);
		}
	});

	const archivedNotificationsList = userNotifications.filter((notification) => {
		try {
			const result = JSON.parse(notification.payload.message);
			notification.message = decode.decodeNotificationMessage(result);
			notification.createdAt = new Date(notification.createdAt);
			notification.updatedAt = new Date(notification.updatedAt);
			return (notification.hasOwnProperty('notificationType') && notification.notificationType === 'inbrowser' && notification.status === 'ARCHIVED');
		} catch (e) {
			console.log(`Error parsing payload message!\n${e}\nPayload message:\n${notification.payload.message}`);
		}
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
			const request = new Request(this.url + '/recipientid/' + this.recipientId + '/notificationtype/inbrowser', {
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
		const payload = {
			isRead: true
		};
		return this.updateUserNotification(userNotificationId, payload);
	}

	markAsViewed(userNotificationId) {
		const payload = {
			status: 'VIEWED'
		};
		return this.updateUserNotification(userNotificationId, payload);
	}

	markAsArchivedAndRead(userNotificationId) {
		const payload = {
			status: 'ARCHIVED',
			isRead: true
		};
		return this.updateUserNotification(userNotificationId, payload);
	}

	updateUserNotification(userNotificationId, payload) {
		const response = new Promise((resolve, reject) => {
			const request = new Request(this.url + '/' + userNotificationId, {
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
}

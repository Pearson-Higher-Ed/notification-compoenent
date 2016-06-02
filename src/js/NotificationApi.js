import 'whatwg-fetch';

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
		const result = JSON.parse(notification.payload.message);
		notification.message = result;
		if (notification.status === 'CREATED') {
			newNotifications = true;
		}
		if (notification.isRead === false) {
			unreadCount++;
		}
		return notification;
	});

	const archivedNotificationsList = userNotifications.filter((notification) => {
		const result = JSON.parse(notification.payload.message);
		notification.message = result;
		return (notification.hasOwnProperty('notificationType') && notification.notificationType === 'inbrowser' && notification.status === 'ARCHIVED');
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
			const request = new Request(this.url + '/usernotifications?filter=recipientId::' + this.recipientId + '|notificationType::inbrowser', {
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

	markAsRead(eventId) {
		const filter = 'isRead::true';
		return this.updateUserNotification(eventId, filter);
	}

	markAsViewed(eventId) {
		const filter = 'status::VIEWED';
		return this.updateUserNotification(eventId, filter);
	}

	markAsArchived(eventId) {
		const filter = 'status::ARCHIVED|isRead::true';
		return this.updateUserNotification(eventId, filter);
	}

	updateUserNotification(eventId, filter) {
		const response = new Promise((resolve, reject) => {
			const request = new Request(this.url + '/events/' + eventId + '/usernotifications?filter=' + filter, {
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

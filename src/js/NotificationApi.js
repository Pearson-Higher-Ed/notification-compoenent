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
		list: fixDefaultValues(userNotificationsList),
		newNotifications: newNotifications,
		archivedList: fixDefaultValues(archivedNotificationsList),
		unreadCount: unreadCount
	};
}

/*
 * If a property wasn't passed in to the API when the notification was created,
 * the Velocity template will default the property value to '$eventModel.[property name]',
 * but we instead need this to default to an empty string.
 */
function fixDefaultValues(notificationList) {
	const badStr = '$eventModel.';
	for (let i = 0; i < notificationList.length; i++) {
		const msgObj = notificationList[i].message;
		for (const prop in msgObj) {
			if (msgObj.hasOwnProperty(prop) && msgObj[prop].toString().substring(0, badStr.length) === badStr) {
				msgObj[prop] = '';
			}
		}
	}
	return notificationList;
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

	markAsArchived(userNotificationId) {
		const payload = {
			status: 'ARCHIVED'
		};
		return this.updateUserNotification(userNotificationId, payload);
	}

	updateUserNotification(userNotificationId, payload) {
		const response = new Promise((resolve, reject) => {
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

import React from 'react';
import ReactDOM from 'react-dom';
import NotificationBell from './src/js/NotificationBell';
import NotificationApi from './src/js/NotificationApi';
import './main.scss';
import NotificationContainer from './src/js/NotificationContainer';
import Drawer from '@pearson-components/drawer/main';
import CoachmarkListener from './src/js/CoachmarkListener';
import NotificationRealTimeApi from './src/js/NotificationRealTimeApi';


/**
 *  NotificationComponent.
 *    NotificationComponent will get larger as it is in charge of making API calls for all of the notification-apis.
 *    To get an instance of it just create require the module inside your javascript file and call 'getInstance' with configuration
 *    as a parameter.  This component needs to make several api calls from places that could change, so we need to pass configuration
 *    into it.
 */
class NotificationComponent {

	constructor(config, element) {
		this.config = config;
		this.notApi = new NotificationApi(config);


		// Connect up the drawer component here.
		const dom = document.createElement('div');
		dom.setAttribute('id', 'notification-component');
		dom.setAttribute('data-o-component', 'o-drawer');
		dom.classList.add('o-drawer-right', 'o-drawer-animated');
		dom.setAttribute('aria-role', 'menu');
		dom.setAttribute('role', 'menu');

		document.body.appendChild(dom);

		//insert the notification as a sibling for the app header so as to get keyboard tab focus in order ,also turn aria-hidden to false inside the appheader
		if (config.bellInsideAppHeaderFlag) {
			dom.setAttribute('style', 'padding-top:' + config.appHeaderClientHeight + ';display: none;');
			const listItemNotification = document.getElementsByClassName('o-header__nav-item o-app-header__nav-item-notification');
			listItemNotification[0].setAttribute('aria-hidden', false);
			const bodyDom = document.getElementsByTagName('body')[0];
			const appHeaderDom = document.querySelector('header.o-app-header') || bodyDom.firstChild;
			bodyDom.insertBefore(dom, appHeaderDom ? appHeaderDom.nextSibling : appHeaderDom);
		}
		this.listDrawer = new Drawer(dom);

		this._createBellReactClass();
		this._createListReactClass();
		this.unreadCount = 0;
		this.notificationList = [];
		this.archivedNotificationList = [];
		// Keep reference to the components to set state later and render the react components now that we have the data
		this.containerComponent = ReactDOM.render(<this.containerClass/>, dom);
		this.bellComponent = ReactDOM.render(<this.bellClass/>, element);


		const realTimeNotification = new NotificationRealTimeApi(config, this._messageListener.bind(this));

		realTimeNotification.then((result) => {

			const userNotifications = this.notApi.getNotifications();
			userNotifications.then((result) => {
				// create the react classes for reference later

				this.notificationList = this.fixNotificationValues(result.list);
				this.archivedNotificationList = this.fixNotificationValues(result.archivedList);
				this.newNotifications = result.newNotifications;
				this.unreadCount = result.unreadCount;

				this._sortNotificationList();
				this._sortArchivedNotificationList();

				this.bellComponent.forceUpdate();
				this.containerComponent.forceUpdate();

				this.coachmarkListener = new CoachmarkListener(config);
				this.coachmarkListener.setupListeners().continueTourIfRedirected();

			}).catch((error) => {
				this.apiError = true;
				this.containerComponent.forceUpdate();
			});

		}).catch((error) => {
			this.apiError = true;
		});
	}

	_messageListener(message) {

		const newNotificationIndex = this.notificationList.map(function(e) {
			return e.id;
		}).indexOf(message.payload.userNotificationId);

		if (newNotificationIndex === -1) {
			this.notificationList.push({
				id: message.payload.userNotificationId,
				isRead: false,
				isComplete: false,
				status: 'CREATED',
				message: JSON.parse(message.payload.data),
				createdAt: new Date(message.payload.createdAt),
				updatedAt: new Date(message.payload.createdAt), //just for sorting purposes this needs to be here
				notificationType: 'inbrowser',
				recipientId: message.payload.recipientId
			});
		}

		this.fixNotificationValues(this.notificationList);
		this._sortNotificationList();
		this.unreadCount++;
		this.newNotifications = true;

		this.bellComponent.forceUpdate();
		this.containerComponent.forceUpdate();

	}

	/*
 * If a property wasn't passed in to the API when the notification was created,
 * the Velocity template will default the property value to '$eventModel.[property name]',
 * but we instead need this to default to an empty string.
 */
fixNotificationValues(notificationList) {
	const badStr = '$eventModel.';
	notificationList = notificationList.filter(n => n !== undefined);

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

	_createBellReactClass() {
		//  Keep track of the parent react class
		const _this = this;//i'm not happy i need to do this....but it would be really complicated since i don't want to actually pass context down to the child except for the notificationList property.

		this.bellClass = React.createClass({
			render: function() {
				return (
					<div>
						<NotificationBell newNotifications={_this.newNotifications} unreadCount={_this.unreadCount} toggleList={_this.toggleList.bind(_this)}/>
					</div>
				);
			}
		});
	}

	_createListReactClass() {

		const _this = this;
		this.containerClass = React.createClass({
			render: function() {
				return (
					<div>
						<NotificationContainer list={_this.notificationList} notificationRead={_this.notificationRead.bind(_this)} config={_this.config} apiError={_this.apiError}
						archivedList={_this.archivedNotificationList} closeDrawer={_this.closeDrawer.bind(_this)} archiveNotification={_this.archiveNotification.bind(_this)}
						coachmarkListener={_this.coachmarkListener}/>
					</div>
				);
			}
		});
	}

	notificationRead(notification) {
		this.notApi.markAsRead(notification.id);
		for(let i = 0; i < this.notificationList.length; i++) {
			if(this.notificationList[i].id === notification.id) {
				this.notificationList[i].isRead = true;
				break;
			}
		}
		this.unreadCount--;
		this.bellComponent.forceUpdate();
	}

	archiveNotification(archivedNotification) {
		this.notificationList = this.notificationList.filter(function(notification) {
			if (notification.id !== archivedNotification.id) {
				return notification;
			}
		});
		this.notApi.markAsArchivedAndRead(archivedNotification.id);
		if(!archivedNotification.isRead) {
			archivedNotification.isRead = true;
			this.unreadCount--;
			this.bellComponent.forceUpdate();
		}
		archivedNotification.status = 'ARCHIVED';
		this.archivedNotificationList.push(archivedNotification);
		this._sortArchivedNotificationList();
		this.containerComponent.forceUpdate();
	}

	toggleList() {
		const drawerDiv = document.getElementById('notification-component');
		while (drawerDiv.firstChild) {
			drawerDiv.removeChild(drawerDiv.firstChild);
		}
		this.containerComponent = this.containerClass && drawerDiv ? ReactDOM.render( <this.containerClass/>, drawerDiv): '';

		this.listDrawer.toggle();
		if (this.newNotifications) {
			// need to call the route that will change the status of all the notifications.
			const viewedList = this.notificationList.filter(function(notification) {
				if (notification.status === 'CREATED') {
					return notification;
				}
			});

			viewedList.forEach((notification) => {
				this.notApi.markAsViewed(notification.id).then(function(result) {
					// we don't care to do anything here...
				}, function(err) {
					// we really don't care about this...
				});
			});

			this.newNotifications = false;
			this.bellComponent.forceUpdate();
		}
	}

    _sortNotificationList() {
	this.notificationList.sort((x, y) => {
		return this._getDateDiff(x, y);
	});
}

    _sortArchivedNotificationList() {
	this.archivedNotificationList.sort((x, y) => {
		return this._getDateDiff(x, y);
	});
}

    _getDateDiff(x, y) {
	return y.createdAt - x.createdAt;
}

	closeDrawer() {
		this.listDrawer.close();
	}
}

export default NotificationComponent;

document.body.addEventListener('o.InitNotificationComponent', e => new NotificationComponent(e.detail.config, e.detail.element));

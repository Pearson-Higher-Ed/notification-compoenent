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
		this.notApi = new NotificationApi(config);
		const userNotifications = this.notApi.getNotifications();
		// Connect up the drawer component here.
		const dom = document.createElement('div');
		dom.setAttribute('id', 'notification-component');
		dom.setAttribute('data-o-component', 'o-drawer');
		dom.classList.add('o-drawer-right', 'o-drawer-animated');
		dom.setAttribute('style', 'top:' + config.appHeaderClientHeight + ';height:95%;');
		this.listDrawer = new Drawer(dom);
		document.body.appendChild(dom);
		this.notificationList = [];
		this.archivedNotificationList = [];
		userNotifications.then((result) => {
			// create the react classes for reference later
			this._createBellReactClass();
			this._createListReactClass(config);

			this.notificationList = result.list;
			this.archivedNotificationList = result.archivedList;
			this.newNotifications = result.newNotifications;
			this.unreadCount = result.unreadCount;


            this._sortNotificationList();
			this._sortArchivedNotificationList();

			// Keep reference to the components to set state later and render the react components now that we have the data
			this.containerComponent = ReactDOM.render(<this.containerClass/>, dom);
			this.bellComponent = ReactDOM.render(<this.bellClass/>, element);

			(new CoachmarkListener(config)).launchCoachmarkIfFromNewUrl();

		}).catch(function(error) {
			console.log(error);
		});

		this.realTimeNotification = new NotificationRealTimeApi(config, this._messageListener.bind(this));

	}

	_messageListener(message) {
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

		this._sortNotificationList();
		this.unreadCount++;
		this.newNotifications = true;

		this.bellComponent.forceUpdate();
		this.containerComponent.forceUpdate();

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

	_createListReactClass(config) {

		const _this = this;
		this.containerClass = React.createClass({
			render: function() {
				return (
					<div>
						<NotificationContainer list={_this.notificationList} notificationRead={_this.notificationRead.bind(_this)} 
						archivedList={_this.archivedNotificationList} closeDrawer={_this.closeDrawer.bind(_this)} archiveNotification={_this.archiveNotification.bind(_this)}/>
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

import React from 'react';
import ReactDOM from 'react-dom';
import NotificationBell from './src/js/NotificationBell';
import NotificationApi from './src/js/NotificationApi';
import './main.scss';
import NotificationContainer from './src/js/NotificationContainer';
import Drawer from '@pearson-components/drawer/main';


/**
 *  NotificationComponent.
 *    NotificationComponent will get larger as it is in charge of making API calls for all of the notification-apis.
 *    To get an instance of it just create require the module inside your javascript file and call 'getInstance' with configuration
 *    as a parameter.  This component needs to make several api calls from places that could change, so we need to pass configuration
 *    into it.
 */
class NotificationComponent {

	constructor(config, elementId) {
		const notApi = new NotificationApi(config);
		const userNotifications = notApi.getNotifications(config);

		// create the react classes for reference later
		this._createBellReactClass();
		this._createListReactClass(config);

		// Connect up the drawer component here.  
		const dom = document.createElement('div');
		dom.setAttribute('data-o-component', 'o-drawer');
		dom.classList.add('o-drawer-right', 'o-drawer-animated');
		this.listDrawer = new Drawer(dom);
		document.body.appendChild(dom);
		
		this.notificationList = [];
		userNotifications.then((result) => {
			// convert to Date objects
			result.forEach(item => {
				item.createdAt = new Date(item.createdAt);
				item.updatedAt = new Date(item.updatedAt);
			});
			// sort by updated field, newest first
			result.sort((x, y) => {
				return y.updatedAt - x.updatedAt;
			});
			this.notificationList = result;
			// Keep reference to the components to set state later and render the react components now that we have the data
			this.containerComponent = ReactDOM.render(<this.containerClass/>, dom);
			this.reactComponent = ReactDOM.render(<this.bellClass/>, document.getElementById(elementId));

		}, function(error) {
			console.log(error);
		});

	}

	_createBellReactClass() {
		//  Keep track of the parent react class
		const _this = this;//i'm not happy i need to do this....but it would be really complicated since i don't want to actually pass context down to the child except for the notificationList property.
		
		this.bellClass = React.createClass({
			render: function() {
				return (
					<div>
						<NotificationBell list={_this.notificationList} toggleList={_this.toggleList.bind(_this)}/>
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
						<NotificationContainer list={_this.notificationList} closeDrawer={_this.closeDrawer.bind(_this)} config={config}/>
					</div>
				);
			}
		});
	}

	toggleList() {
		this.listDrawer.toggle();
	}

	closeDrawer() {
		this.listDrawer.close();
	}
}

export default NotificationComponent;

document.body.addEventListener('o.InitNotificationComponent', e => new NotificationComponent(e.detail.config, e.detail.elementId));

import React from 'react';
import ReactDOM from 'react-dom';
import NotificationDropdown from './src/js/NotificationBell';
import NotificationApi from './src/js/NotificationApi';
import './main.scss';
import NotificationList from './src/js/NotificationList';
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

		// it is possible for promise to come back before the consumer has placed the react component into a dom
		this.notificationList = [];
		userNotifications.then((result) => {
			
			if (this.reactComponent) {
				this.reactComponent.setState({
					notificationList: result
				});
				this.listComponent.setState({
					notificationList: result
				});
			} else {
				this.notificationList = result;
			}

		}, function(error) {
				console.log(error);
		});

		this.createBellReactClass();
		this.createListReactClass(config);

		// Connect up the drawer component here.  
		const dom = document.createElement('div');
		dom.setAttribute('data-o-component', 'o-drawer');
		dom.classList.add('o-drawer-right', 'o-drawer-animated');
		this.listDrawer = new Drawer(dom);
		document.body.appendChild(dom);
		
		// Keep reference to the components to set state later
		this.listComponent = ReactDOM.render(<this.listClass/>, dom);
		this.reactComponent = ReactDOM.render(<this.bellClass/>, document.getElementById(elementId));

	}

	createBellReactClass() {
		//  Keep track of the parent react class
		const _this = this;//i'm not happy i need to do this....but it would be really complicated since i don't want to actually pass context down to the child except for the notificationList property.
		
		this.bellClass = React.createClass({
			getInitialState: function() {
				return {
					notificationList: _this.notificationList
				}
			},
			render: function() {
				return (
					<div>
						<NotificationDropdown toggleList={_this.toggleList.bind(_this)}/>
					</div>
				);
			}
		});
	}

	createListReactClass(config) {

		const _this = this;
		this.listClass = React.createClass({
			getInitialState: function() {
				return {
					notificationList: _this.notificationList
				}
			},
			render: function() {
				return (
					<div>
						<div className="dropdown-title">
							Notifications
							<i className="pe-icon--times close-dropdown pointer" onClick={_this.closeDrawer.bind(_this)}></i>
						</div>
						<NotificationList list={this.state.notificationList} notificationCloseDropdown={_this.closeDrawer.bind(_this)} apiConfig={config}/>
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

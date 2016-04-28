import React from 'react';
import ReactDOM from 'react-dom';
import NotificationDropdown from './src/js/NotificationDropdown';
import NotificationApi from './src/js/NotificationApi';
import './main.scss';


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

		//this is only here because it is possible for promise to come back before the consumer has placed the react component into a dom
		this.notificationList = [];
		userNotifications.then((result) => {
					if (this.reactComponent) {
							this.reactComponent.setState({
									notificationList: result
							});
					} else {
							this.notificationList = result;
					}
			}, function(error) {
					console.log(error);
			});
			//  Keep track of the parent react class
		const _this = this;//i'm not happy i need to do this....but it would be really complicated since i don't want to actually pass context down to the child except for the notificationList property.
		this.reactClass = React.createClass({
			getInitialState: function() {
				return {
					notificationList: _this.notificationList
				}
			},
			render: function() {
				return (
					<div>
						<NotificationDropdown notificationList={this.state.notificationList}/>
					</div>
				);
			}
		});

		// if (!elementId) {
		// 	throw new TypeError('missing required argument: element');
		// }
		// if (typeof elementId === 'string') {
		// 	elementId = document.querySelector(elementId);
		// }
		// if (!elementId) {
		// 	throw new Error('Element could not be found');
		// }

		this.reactComponent = ReactDOM.render(<this.reactClass/>, document.getElementById(elementId));

	}
}

export default NotificationComponent;

document.body.addEventListener('o.InitMyComponent', e => new NotificationComponent(e.detail.config, e.detail.elementId));

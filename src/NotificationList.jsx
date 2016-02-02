let React = require("react");
require("./style/notificationList.scss");
let NotificationNode = require("./NotificationNode");
let classNames = require("classnames");
let NotificationDetails = require("./NotificationDetails");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			isDetails: false,
			notificationDetails: null
		};
	},

	showDetails: function(notification) {

		this.setState({
			isDetails: true,
			notificationDetails : notification
		});
	},

	showList: function() {
		this.setState({
			isDetails: false,
		});
	},
	
	render: function() {
		if(!this.state.isDetails) {
			let notificationNodeList = this.props.list.map((notification) => {
				//console.log('inside notificationlist'+notification);
				let jsonObjNotification = JSON.parse(notification)
				return (	
					<NotificationNode detailsClick={this.showDetails.bind(this, jsonObjNotification)} title={jsonObjNotification.title} icon={jsonObjNotification.icon} key={jsonObjNotification.id} summary={jsonObjNotification.body.substring(0, 30) + "..."}/> 
				);
			});
			return (
				<div className="notification-container">
					{notificationNodeList}
				</div>
			);
		} else {
			return (
				<div className="notification-container">
					<NotificationDetails title={this.state.notificationDetails.title} body={this.state.notificationDetails.body} previousClick={this.showList}/>
				</div>
			)
		}

	}
});
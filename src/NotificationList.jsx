let React = require("react");
require("./style/notificationList.scss");
let NotificationNode = require("./Notification");

module.exports = React.createClass({
	render: function() {
		let notificationNodeList = this.props.list.map(function(notification) {
			return (
				<NotificationNode title={notification.title} icon={notification.icon} key={notification.id} summary={notification.body.substring(0, 30) + "..."}/> 
			);
		});
		return (
			<div>
				<div className="notification-container">
					{notificationNodeList}
				</div>
			</div>
		);
	}
});
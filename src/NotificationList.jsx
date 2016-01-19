let React = require("react");
require("./style/notificationList.scss");

module.exports = React.createClass({

	getList: function() {
		return "hello world";
	},
	render: function() {
		return (
			<div>
				<div className="notification-container">
					{this.getList()}
				</div>
			</div>
		);
	}
});
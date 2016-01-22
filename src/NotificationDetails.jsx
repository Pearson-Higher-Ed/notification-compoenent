let React = require("react");
require("./style/notificationDetails.scss");

module.exports = React.createClass({
	goToDestination: function() {
		
	},
	remindLater: function() {

	},
	render: function() {
		return (
			<div className="notification-details">
				<div className="notification-details__title">
					<h1>{this.props.title}</h1>
				</div>
				<div className="notification-details__body">
					{this.props.body}
				</div>
				<div className="notification-details__buttons">
					<button onClick={this.props.previousClick()}>go back</button>
				</div>
			</div>
		);
	}
});
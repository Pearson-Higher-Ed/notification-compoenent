let React = require("react");

module.exports = React.createClass({

	render: function() {
		return (
			<div className="notification-node">
				<div className="notification-node--details-click" onClick={this.props.detailsClick}>
					<div className="notification-node__icon">
						<i className={this.props.icon}></i>
					</div>
					<div className="notification-node__summary">
						<h1> {this.props.title}</h1>
						<div className="notification-node__summary-description">{this.props.summary}</div>
					</div>
				</div>
				<div className="notification-node__dismiss">
					<i className="fa fa-trash"></i>
				</div>
			</div>
		);
	}
});

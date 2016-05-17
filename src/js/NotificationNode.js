import React from 'react';

export default class NotificationNode extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="notification-node">
				<div className="notification-node--details" onClick={this.props.detailsClick}>
					<div className="notification-node__summary">
						<h1> {this.props.title}</h1>
						<div className="notification-node__summary-description">{this.props.summary}</div>
						
					</div>
				</div>
				<div className="notification-node__dismiss">
					<i className="pe-icon--trash-o"></i>
				</div>
				<div className="notification-node__meta">
					<div className="notification-node__meta-course">
						US History
					</div>
					<div className="notification-node__meta-time">
						{this.props.time}
					</div>
				</div>
			</div>
		);
	}
};


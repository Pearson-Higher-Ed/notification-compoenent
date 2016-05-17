import React from 'react';

export default class NotificationNode extends React.Component {

	constructor(props) {
		super(props);
	}

	setArchivedNotif() {
		this.props.archivedNotif();
	}

	render() {
		return (
		<div>
			<div className="notification-node">
				<div className="notification-node--details" onClick={this.props.detailsClick}>
					<div className="notification-node--summary">
						<h1> {this.props.title}</h1>
						<div className="notification-node--summary-description">{this.props.summary}</div>
					</div>
				</div>
				<div className="notification-node--dismiss">
					<i className="pe-icon--trash-o" onClick={this.setArchivedNotif.bind(this)}></i>
				</div>
				<div className="notification-node--meta">
					<div className="notification-node--meta-course">
						US History
					</div>
					<div className="notification-node--meta-time">
						{this.props.time}
					</div>
				</div>
			</div>
		</div>
		);
	}
};


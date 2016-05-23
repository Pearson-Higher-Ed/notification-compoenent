import React from 'react';
import CoachmarkListener from './CoachmarkListener';

export default class NotificationDetails extends React.Component {

	constructor(props) {
		super(props);
	}

	launchCoachmark() {
		(new CoachmarkListener(this.props.apiConfig)).launchCoachmark(this.props.notification);
		this.props.closeDrawer();
	}

	archiveItem() {
		this.props.appendArchiveList(this.props.notification);
	}

	render() {
		let tourButton = '';
		if (this.props.notification.message.cmIds) {
			let tourButtonText = this.props.notification.message.tourButtonText
			tourButtonText = tourButtonText ? tourButtonText : 'Take the tour';
			tourButton = <button onClick={this.launchCoachmark.bind(this)} className="notification-details--button">{tourButtonText}</button>;
		}

		let archiveCss = 'notification-details--archive';
		if(this.props.notification.status === 'ARCHIVED') {
			archiveCss += ' hide';
		}

		return (
			<div className="notification-details">
				<div className="notification-details--title">
					<h1>{this.props.notification.message.title}</h1>
				</div>
				<div className="notification-details--body">
					{this.props.notification.message.body}
				</div>
				{tourButton}
				<div className="notification-details--align">
					<a href="javascript:void(0);" onClick={this.archiveItem.bind(this)} className={archiveCss}><i className="pe-icon--trash-o"></i> archive this notification </a>
				</div>
			</div>
		);
	}
}

import React from 'react';
import DateParser from './DateParser';
import { defineMessages, injectIntl, intlShape, FormattedMessage, FormattedDate } from 'react-intl';
import NotificationSummary from './NotificationSummary';
import NotificationIcon from './NotificationIcon';
const messages = defineMessages({
	archiveNotificationLink: {
		id: 'notificationDetails.link',
		defaultMessage: 'Archive this Notification'
	}
});

export default class NotificationDetails extends React.Component {

	constructor(props) {
		super(props);
	}

	launchCoachmark() {
		this.props.coachmarkListener.launchTour(this.props.notification)
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
			tourButton = <button onClick={this.launchCoachmark.bind(this)} className="notification-details--button pe-btn">{tourButtonText}</button>;
		}

		let archiveCss = 'decoration-none';
		if(this.props.notification.status === 'ARCHIVED') {
			archiveCss += ' notification-component--hide';
		}

		return (
			<div className="notification-details">
				<div className="pe-label--small" >
					<div>
						{this.props.notification.message.source}
					</div>
					<div>
						{DateParser.getFormatDateString(new Date(this.props.notification.createdAt))}
					</div>
				</div>
				<div className="notification-details--title">
					<h2 className="pe-label--bold pe-label--large">{this.props.hyphenateWords(this.props.notification.message.title)}</h2>
				</div>
				<div className="notification-details--body">
					<NotificationSummary className={'notification-details--bodytext'} summary={this.props.notification.message}/>
				</div>
				{tourButton}
				<div className="center-align">
					<a href="javascript:void(0);" onClick={this.archiveItem.bind(this)} className={archiveCss}>
						<NotificationIcon iconName="archive-18" iconAltText="" /> 
						<FormattedMessage {...messages.archiveNotificationLink} /> 
					</a>
				</div>
			</div>
		);
	}
}

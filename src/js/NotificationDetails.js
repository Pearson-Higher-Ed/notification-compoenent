import React from 'react';
import DateParser from './DateParser';
import { defineMessages, injectIntl, intlShape, FormattedMessage, FormattedDate } from 'react-intl';
import NotificationSummary from './NotificationSummary';
import NotificationIcon from './NotificationIcon';
const messages = defineMessages({
	archiveNotificationLink: {
		id: 'notificationDetails.link',
		defaultMessage: 'Archive'
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

		return (
			<div className="notification-details">
				<div className="notification-details--title">
					<h2 className="pe-label--bold pe-label--large">{this.props.hyphenateWords(this.props.notification.message.title)}</h2>
				</div>
				<div className="notification-details--body">
					<NotificationSummary className={'notification-details--bodytext'} summary={this.props.notification.message}/>
				</div>
				{tourButton}
				<div className="pe-label--small" >
					{DateParser.getFormatDateString(new Date(this.props.notification.createdAt))}{this.props.notification.message.source ? ' \u00b7 ' : ''}{this.props.notification.message.source}
					<span className="notification-details--body--archive">
						<a href="javascript:void(0);" onClick={this.archiveItem.bind(this)} className={this.props.notification.status === 'ARCHIVED'? ' notification-component--hide': ''}>
							<FormattedMessage {...messages.archiveNotificationLink} />
						</a>
					</span>
				</div>
				
			</div>
		);
	}
}

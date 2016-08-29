import React from 'react';
//import PostDate from './DateParser';
import { defineMessages, injectIntl, intlShape, FormattedMessage, FormattedDate } from 'react-intl';
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
			tourButton = <button onClick={this.launchCoachmark.bind(this)} className="notification-details--button">{tourButtonText}</button>;
		}

		let archiveCss = 'notification-details--archive';
		if(this.props.notification.status === 'ARCHIVED') {
			archiveCss += ' notification-componet--hide';
		}

		return (
			<div className="notification-details">
				<div className="notification-details__meta">
					<div className="noticiation-details__meta--source">
						{this.props.notification.message.source}
					</div>
					<div className="notification-details__meta--time">
						
						<FormattedDate value={new Date(1459832991883)} year="numeric" month="long" day="2-digit"/>
						
					</div>
				</div>
				<div className="notification-details--title">
					<h1 className="notification-details--heading">{this.props.hyphenateWords(this.props.notification.message.title)}</h1>
				</div>
				<div className="notification-details--body">
					<p className="notification-details--bodytext" dangerouslySetInnerHTML={{__html: this.props.notification.message.body}}/>
				</div>
				{tourButton}
				<div className="notification-details--align">
					<a href="javascript:void(0);" onClick={this.archiveItem.bind(this)} className={archiveCss}><i className="pe-icon--archive"></i> <FormattedMessage {...messages.archiveNotificationLink} /> </a>
				</div>
			</div>
		);
	}
}

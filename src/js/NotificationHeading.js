import React from 'react';
import CoachmarkApi from './CoachmarkApi';
import FeedbackApi from './FeedbackApi';
import NotificationIcon from './NotificationIcon';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
import ReactDOM from 'react-dom';

const messages = defineMessages({
	
	notificationHeading: {
		id: 'notification.heading',
		defaultMessage: 'Notifications'
	},
	backToNotificationHeading: {
		id: 'backToNotification.heading',
		defaultMessage: 'Back to Notifications'
	},
	backToArchiveHeading: {
		id: 'backToArchive.heading',
		defaultMessage: 'Back to Notifications Archive'
	}
});

 class NotificationHeading extends React.Component {

	constructor(props) {
		super(props);
	}
	componentDidUpdate() {
		if (this.props.isDetails) {
			ReactDOM.findDOMNode(this.refs.heading).focus();
		}
	}
	render() {
		if (this.props.isList) {
			return (
				<div className="notification-title--heading1">
					<h2 className="pe-label--large">
						<FormattedMessage {...messages.notificationHeading} />
					</h2>
				</div>
			);
		}

		if (this.props.isDetails) {
			return (
				<button ref="heading" className="notification-title--heading2 pe-icon--btn pe-label--large" onClick={this.props.back}>
					<NotificationIcon iconName="chevron-back-18" iconAltText={this.props.isArchive ? <FormattedMessage {...messages.backToArchiveHeading} /> : <FormattedMessage {...messages.backToNotificationHeading} />} />
					<div>{this.props.isArchive ? <FormattedMessage {...messages.backToArchiveHeading} /> : <FormattedMessage {...messages.backToNotificationHeading} />}</div>
				</button>
			);
		}
		return (
			<button ref="heading" className="notification-title--heading2 pe-icon--btn pe-label--large" onClick={this.props.archiveBack}>
				<NotificationIcon iconName="chevron-back-18" iconAltText={<FormattedMessage {...messages.backToNotificationHeading} />} />
				<div><FormattedMessage {...messages.backToNotificationHeading} /></div>
			</button>
			);
	}
}

export default NotificationHeading;

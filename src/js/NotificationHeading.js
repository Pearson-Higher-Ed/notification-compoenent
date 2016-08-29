import React from 'react';
import CoachmarkApi from './CoachmarkApi';
import FeedbackApi from './FeedbackApi';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
const messages = defineMessages({
	
	notificationHeading: {
		id: 'notification.heading',
		defaultMessage: 'Notifications!'
	},
	backToNotificationHeading: {
		id: 'backToNotification.heading',
		defaultMessage: 'Back to Notifications'
	},
	backToArchvieHeading: {
		id: 'backToArchive.heading',
		defaultMessage: 'Back to Notifications Archive'
	}
});

export default class NotificationHeading extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.isList) {
			return (
				<div>
					<h1 className="notification-title--heading pe-label pe-label--large">
						<FormattedMessage {...messages.notificationHeading} />
					</h1>
				</div>
			);
		}

		if (this.props.isDetails) {
			return (
				<div>
					<h1 className="notification-title--heading pe-label pe-label--large">
						<a href="javascript:void(0);" className="notification-title--back pe-label pe-label--large" onClick={this.props.back}>
							<i className="pe-icon--chevron-left"></i> <span className="notification-title--back_align">{this.props.isArchive ? <FormattedMessage {...messages.backToArchvieHeading} /> : <FormattedMessage {...messages.backToNotificationHeading} />}</span>
						</a>
					</h1>
				</div>
			);
		}
		return (
			<div>
				<h1 className="notification-title--heading pe-label pe-label--large" >
					<a href="javascript:void(0);" className="notification-title--back pe-label pe-label--large" onClick={this.props.archiveBack}>
						<i className="pe-icon--chevron-left"></i> <span className="notification-title--back_align"><FormattedMessage {...messages.backToNotificationHeading} /></span>
					</a>
				</h1>
			</div>
			);
	}
}

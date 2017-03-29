import React from 'react';
import CoachmarkApi from './CoachmarkApi';
import FeedbackApi from './FeedbackApi';
import NotificationApi from './NotificationApi';
import { defineMessages, injectIntl, intlShape, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
const messages = defineMessages({
	errorMessageHeading: {
		id: 'errorMessage.heading',
		defaultMessage: 'Oh, that’s not good'
	},
	errorMessageDescription: {
		id: 'errorMessage.description',
		defaultMessage: 'There seems to be a problem with this feature.  Try refreshing your browser or clearing your cache.'
	},
	notificationBlankStateHeading: {
		id: 'notificationBlankState.heading',
		defaultMessage: 'Nothing yet!'
	},
	notificationsBlankStateDescription: {
		id: 'notificationBlankState.description',
		defaultMessage: 'We’ll let you know when something comes up. Till then, browse your'
	},
	notificationsBlankStateLink: {
		id: 'notificationBlankState.link',
		defaultMessage: 'Notification Archive'
	},
	archiveBlankStateHeading: {
		id: 'archiveBlankState.heading',
		defaultMessage: 'Nothing here!'
	},
	archiveBlankStateDescription: {
		id: 'archiveBlankState.description',
		defaultMessage: 'This is where you will see your<br/>archived notifications.'
	}
});

export default class NotificationBlankState extends React.Component {

	constructor(props) {
		super(props);
	}

	archiveList() {
		this.props.goToArchiveList();
	}

	render() {  
		const contentHeight = {
			height: window.innerHeight - 175
		};
		
		if (this.props.isError) {
			return (
			<div style={contentHeight}>
				<h2 className="notification-blank-page-heading center-align pe-title--large"><FormattedMessage {...messages.errorMessageHeading} /></h2>
				<h3 className="notification-blank-page-description center-align pe-title--small"><FormattedMessage {...messages.errorMessageDescription} /></h3>
			</div>
			);
		}
		if (!this.props.isArchivedTray) {
			return (
				<div style={contentHeight}>
					<h2 className="notification-blank-page-heading center-align pe-title--large"><FormattedMessage {...messages.notificationBlankStateHeading}/></h2>
					<h3 className="notification-blank-page-description center-align pe-title--small"><FormattedMessage {...messages.notificationsBlankStateDescription}/>
					<br/>
					<button className="pe-link--btn" onClick={this.archiveList.bind(this)}><FormattedMessage {...messages.notificationsBlankStateLink}/></button>
					</h3>
				</div>
			);
		 }
	   
		return (
			<div style={contentHeight}>
				<h2 className="notification-blank-page-heading center-align pe-title--large"><FormattedMessage {...messages.archiveBlankStateHeading}/></h2>
				<h3 className="notification-blank-page-description center-align pe-title--small"><FormattedHTMLMessage {...messages.archiveBlankStateDescription}/></h3>
			</div>
		);  
	}
}

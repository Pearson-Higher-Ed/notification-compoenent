import React from 'react';
import CoachmarkApi from './CoachmarkApi';
import FeedbackApi from './FeedbackApi';
import NotificationApi from './NotificationApi';

export default class NotificationDetails extends React.Component {

	constructor(props) {
		super(props);
		this.notificationApi = new NotificationApi(this.props.apiConfig);
		this.coachmarkApi = new CoachmarkApi(this.props.apiConfig);
	}

	launchCoachmark() {
		console.log('launch the coachmark here');
		// from here close the drawer
		// and then also get the first coachmark that needs to be display
		// and then create that coach mark
	}

	render() {
		return (
			<div className="notification-details">
				<div className="notification-details__title">
					<h1>{this.props.notification.message.title}</h1>
				</div>
				<div className="notification-details__body">
					{this.props.notification.message.body}
				</div>
				<div className="notification-details__buttons">
					<button onClick={this.launchCoachmark.bind(this)}>Launch Coachmark</button>
				</div>
			</div>
		);
	}
}

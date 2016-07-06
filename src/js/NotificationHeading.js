import React from 'react';
import CoachmarkApi from './CoachmarkApi';
import FeedbackApi from './FeedbackApi';

export default class NotificationHeading extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.isList) {
			return (
				<div>
					<h1 className="notification-title--heading pe-label pe-label--large">
						Notifications
					</h1>
				</div>
			);
		}

		if (this.props.isDetails) {
			return (
				<div>
					<h1 className="notification-title--heading pe-label pe-label--large" onClick={this.props.back}>
						<a href="javascript:void(0);" className="notification-title--back pe-label pe-label--large">
							<i className="pe-icon--chevron-left"></i> <span className="notification-title--back_align">{this.props.isArchive ? 'Back to Notifications Archive' : 'Back to Notifications'}</span>
						</a>
					</h1>
				</div>
			);
		}
		return (
			<div>
				<h1 className="notification-title--heading pe-label pe-label--large">
					Notifications Archive
				</h1>
			</div>
			);
	}
}

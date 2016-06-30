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
					<h1 className="notification-title--heading">
						Notifications
					</h1>
				</div>
			);
		} 

		if (this.props.isDetails) {
			return (
				<div>
					<h1 className="notification-title--heading" onClick={this.props.back}>
						<a href="javascript:void(0);" className="notification-title--back">
							<i className="pe-icon--chevron-left align-text"></i> <span>{this.props.isArchive ? 'Back to Notifications Archive' : 'Back to Notifications'}</span>
						</a>
					</h1>
				</div>
			);
		}
		return (
			<div>
				<h1 className="notification-title--heading">
					Notifications Archive
				</h1>
			</div>
			);
	}
}

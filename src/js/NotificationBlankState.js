import React from 'react';
import CoachmarkApi from './CoachmarkApi';
import FeedbackApi from './FeedbackApi';
import NotificationApi from './NotificationApi';

export default class NotificationBlankState extends React.Component {

	constructor(props) {
		super(props);
	}

	archiveList() {
		this.props.goToArchiveList();
	}

	render() {  
		const contentHeight = {
			height: window.innerHeight - 180
		};

		if (this.props.isError) {
			return (
			<div className="notification-blank-page" style={contentHeight}>
				<h2 className="notification-blank-page-heading">Oh, that’s not good</h2>
				<h3 className="notification-blank-page-description">There seems to be a problem with this feature.  Try refreshing your browser or clearing your cache.</h3>
			</div>
			);
		}
		if (!this.props.isArchivedTray) {
			return (
				<div className="notification-blank-page" style={contentHeight}>
					<h2 className="notification-blank-page-heading">Nothing yet!</h2>
					<h3 className="notification-blank-page-description">We’ll let you know when<br/>something comes up. Till then,<br/>find previous notifications in your
					<br/>
					<a href="javascript:void(0);" onClick={this.archiveList.bind(this)}> Archive. </a>
					</h3>
				</div>
			);
		 }
	   
		return (
			<div className="notification-blank-page" style={contentHeight}>
				<h2 className="notification-blank-page-heading">Nothing here!</h2>
				<h3 className="notification-blank-page-description">This is where you will see your<br/>archived notifications.</h3>
			</div>
		);  
	}
}

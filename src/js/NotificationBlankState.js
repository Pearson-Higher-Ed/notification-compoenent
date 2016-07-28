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
			height: window.innerHeight - 175
		}; 
		{ /* need to add margin top and bottom for the scenario where the zoomed screen should not have the heading and the description overlapped*/ }
		const marginpercent = (window.innerHeight - 175 < 350 ? 15 : 0) + '%';
		const headingMarginBottom = {
			marginBottom: marginpercent
		};
		const descriptionMarginTop = {
			marginTop: marginpercent
		};
		
		if (this.props.isError) {
			return (
			<div className="notification-blank-page" style={contentHeight}>
				<h2 className="notification-blank-page-heading" style={headingMarginBottom}>Oh, that’s not good</h2>
				<h3 className="notification-blank-page-description" style={descriptionMarginTop}>There seems to be a problem with this feature.  Try refreshing your browser or clearing your cache.</h3>
			</div>
			);
		}
		if (!this.props.isArchivedTray) {
			return (
				<div className="notification-blank-page" style={contentHeight}>
					<h2 className="notification-blank-page-heading" style={headingMarginBottom}>Nothing yet!</h2>
					<h3 className="notification-blank-page-description" style={descriptionMarginTop}>We’ll let you know when<br/>something comes up. Till then,<br/>find previous notifications in your
					<br/>
					<a href="javascript:void(0);" onClick={this.archiveList.bind(this)}> Archive. </a>
					</h3>
				</div>
			);
		 }
	   
		return (
			<div className="notification-blank-page" style={contentHeight}>
				<h2 className="notification-blank-page-heading" style={headingMarginBottom}>Nothing here!</h2>
				<h3 className="notification-blank-page-description" style={descriptionMarginTop}>This is where you will see your<br/>archived notifications.</h3>
			</div>
		);  
	}
}

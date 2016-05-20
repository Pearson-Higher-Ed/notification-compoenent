// import Coachmark from 'o-coach-mark';

import React from 'react';
import NotificationNode from './NotificationNode';
import DateParser from './DateParser';
import NotificationBlankState from './NotificationBlankState';

export default class NotificationList extends React.Component {

	constructor(props) {
		super(props);
		// Empty objects to be created on load
	}

	showDetails(notification) {
		this.props.showDetails(notification);
	}

	onArchived(notification) {
		this.props.appendArchiveList(notification);
	}

	/**
	 * Render
	 **/
	render() {
		
		let notificationNodeList = {};
		if (this.props.list.length > 0) {
			notificationNodeList = this.props.list.map((notification) => {
			const time = DateParser.getFormatDateString(new Date(notification.createdAt))
			return (
					<NotificationNode key={notification.id} detailsClick={this.showDetails.bind(this, notification)} 
					title={notification.message.title.substring(0, 50) + '...'} summary={notification.message.body.substring(0, 30) + '...'}
					archivedNotification={this.onArchived.bind(this, notification)} trashIconDisable={this.props.isArchiveTray}  time={time} isRead={notification.isRead}/>
				);
			});
		} 
		if (!this.props.list.length > 0) {
			notificationNodeList = <NotificationBlankState isArchivedTray={this.props.isArchiveTray}/>
		}
		
		return (
			<div className="notification-list">
				{notificationNodeList}
			</div>
		);
	}
};

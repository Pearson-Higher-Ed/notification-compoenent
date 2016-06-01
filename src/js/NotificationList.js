// import Coachmark from 'o-coach-mark';

import React from 'react';
import NotificationNode from './NotificationNode';
import DateParser from './DateParser';
import NotificationBlankState from './NotificationBlankState';
import NotificationApi from './NotificationApi';

export default class NotificationList extends React.Component {

	constructor(props) {
		super(props);
		this.notApi = new NotificationApi(this.props.apiConfig);
	}

	showDetails(notification) {
		this.props.showDetails(notification);
	}

	onArchived(notification) {
		this.props.appendArchiveList(notification);
		this.notApi.markAsArchived(notification.eventId).then(function(result) {
			// we don't care to do anything here...
		}, function(err) {
			console.log('error setting status to archive and the error is '+err);
		});
	}

	goToArchiveList() {
		this.props.goToArchiveList();
	}
	/**
	 * Render
	 **/
	render() {
		
		let notificationNodeObjects = {};
		if (this.props.list.length > 0) {
			notificationNodeObjects = this.props.list.map((notification) => {
			const time = DateParser.getFormatDateString(new Date(notification.createdAt))
			return (
					<NotificationNode key={notification.id} detailsClick={this.showDetails.bind(this, notification)} 
					title={notification.message.title.substring(0, 50) + '...'} summary={notification.message.body.substring(0, 30) + '...'}
					archivedNotification={this.onArchived.bind(this, notification)} trashIconDisable={this.props.isArchiveTray}  time={time} isRead={notification.isRead}/>
				);
			});
		} 
		if (!this.props.list.length > 0) {
			notificationNodeObjects = <NotificationBlankState isArchivedTray={this.props.isArchiveTray} goToArchiveList={this.goToArchiveList.bind(this)}/>
		}
		
		return (
			<div className="notification-list">
				{notificationNodeObjects}
			</div>
		);
	}
};

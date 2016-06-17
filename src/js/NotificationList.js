import React from 'react';
import NotificationNode from './NotificationNode';
import DateParser from './DateParser';
import NotificationBlankState from './NotificationBlankState';
import NotificationApi from './NotificationApi';

export default class NotificationList extends React.Component {

	constructor(props) {
		super(props);
	}

	showDetails(notification) {
		this.props.showDetails(notification);
	}

	onArchived(notification) {
		this.props.appendArchiveList(notification);
	}

	goToArchiveList() {
		this.props.goToArchiveList();
	}
	/**
	 * Render
	 **/
	render() {
		const titleLength = 46;
		const bodyLength = 26;
		const sourceLength = 66;

		let notificationNodeObjects = {};
		if (this.props.list.length > 0) {
			notificationNodeObjects = this.props.list.map((notification) => {
				const time = DateParser.getFormatDateString(new Date(notification.createdAt))
				return (
					<NotificationNode key={notification.id} detailsClick={this.showDetails.bind(this, notification)}
					title={(notification.message && notification.message.title.length > titleLength) ? notification.message.title.substring(0, titleLength) + '\u2026' : notification.message.title}
					summary={(notification.message.body && notification.message.body.length > bodyLength) ? notification.message.body.substring(0, bodyLength)  + '\u2026' : notification.message.body}
					archivedNotification={this.onArchived.bind(this, notification)} trashIconDisable={this.props.isArchiveTray}  time={time}
					isRead={notification.isRead}
					source={(notification.message.source && notification.message.source.length > sourceLength) ? notification.message.source.substring(0, sourceLength) + '\u2026' : notification.message.source}/>
				);
			});
		}
		if (this.props.list.length === 0) {
			notificationNodeObjects = <NotificationBlankState isError={this.props.isError} isArchivedTray={this.props.isArchiveTray} goToArchiveList={this.goToArchiveList.bind(this)}/>
		}

		return (
			<div className="notification-list, hyphenate">
				{notificationNodeObjects}
			</div>
		);
	}
};

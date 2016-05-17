// import Coachmark from 'o-coach-mark';

import React from 'react';
import NotificationNode from './NotificationNode';
import DateParser from './DateParser';

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
		console.log('notification list'+this.props.list);
		const notificationNodeList = this.props.list.map((notification) => {
			const time = DateParser.getFormatDateString(new Date(notification.updatedAt))
			return (
				<NotificationNode key={notification.id} detailsClick={this.showDetails.bind(this, notification)} title={notification.message.title}
				archivedNotif={this.onArchived.bind(this, notification)} summary={notification.message.body.substring(0, 30) + '...'} time={time}/>
			);
		});
		return (
			<div className="notification-list">
				{notificationNodeList}
			</div>
		);
	}
};

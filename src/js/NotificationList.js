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
		console.log(notification);
		this.props.showDetails(notification);
	}

	/**
	 * Render
	 **/
	render() {

		const notificationNodeList = this.props.list.map((notification) => {
			const time = DateParser.getFormatDateString(new Date(notification.createdAt))
			return (
				<NotificationNode key={notification.id} detailsClick={this.showDetails.bind(this, notification)} title={notification.message.title}
				summary={notification.message.body.substring(0, 30) + '...'} time={time}/>
			);
		});
		return (
			<div className="notification-list">
				{notificationNodeList}
			</div>
		);
	}
};

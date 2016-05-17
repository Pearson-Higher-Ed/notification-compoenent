import React from 'react';

export default class NotificationBell extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let bellClassNames = 'notification-bell--count';
		console.log(this.props.newNotifications);
		if (this.props.newNotifications) {
			bellClassNames += ' notification-bell--new'
		}
		return (
			<div className="notification-bell">
				<a href="javascript:void(0)" className="notification-bell--activate" onClick={this.props.toggleList}>
					<i className="pe-icon--bell-o"></i>
					<div className={bellClassNames}>
						{this.props.unreadCount}
					</div>
				</a>
			</div>
		);
	}
}

import React from 'react';

export default class NotificationBell extends React.Component {

	constructor(props) {
		super(props);
		this.count = this.props.unreadCount;
		document.addEventListener('NotificationBell.ReadNotification', () => {
			this.count--;
			this.forceUpdate();
		});
	}

	render() {
		let bellClassNames = 'notification-bell--count';
		console.log(this.props.newNotifications);
		if (this.props.newNotifications) {
			bellClassNames += ' notification-bell--new'
		}

		if (this.props.unreadCount === 0) {
			bellClassNames += ' hide';
		}

		if (this.props.unreadCount > 9) {
			this.count = '9+'; 
		}
		console.log(this.count);
		return (
			<div className="notification-bell">
				<a href="javascript:void(0)" className="notification-bell--activate" onClick={this.props.toggleList}>
					<i className="pe-icon--bell-o"></i>
					<div className={bellClassNames}>
						{this.count}
					</div>
				</a>
			</div>
		);
	}
}

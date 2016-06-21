import React from 'react';

const NotificationBell = ({unreadCount, toggleList, newNotifications}) => {

	let bellClassNames = 'notification-bell--count';
	
	if (newNotifications) {
		bellClassNames += ' notification-bell--new'
	}

	if (unreadCount === 0) {
		bellClassNames += ' hide';
	}

	return (
		<div className="notification-bell">
			<a href="javascript:void(0)" className="notification-bell--activate" onClick={toggleList}>
				<i className="pe-icon--bell"></i>
				<div aria-label="NotificationBell" className={bellClassNames}>
					{unreadCount > 9 ? '9+' : unreadCount}
				</div>
			</a>
		</div>
	);
}

export default NotificationBell;

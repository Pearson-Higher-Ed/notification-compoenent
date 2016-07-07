import React from 'react';

const NotificationBell = ({unreadCount, toggleList, newNotifications, label}) => {

	let bellClassNames = 'notification-bell--count';
	
	if (newNotifications) {
		bellClassNames += ' notification-bell--new'
	}

	if (unreadCount === 0) {
		bellClassNames += ' hide-visibility';
	}
	return (
		<div className="notification-bell" role="alert" aria-live="polite" aria-atomic="false">
			<button className="notification-bell--activate" onClick={toggleList}>
				<i className="pe-icon--bell" aria-hidden="true"></i>
				<div className={bellClassNames}>
					<span className="sr-hidden">{unreadCount > 1 ? unreadCount+ 'Notifications' : unreadCount+'Notification'}</span>
					<span aria-hidden="true">{unreadCount > 9 ? '9+' : unreadCount}</span>
				</div>
			</button>
		</div>
	);
}

export default NotificationBell;

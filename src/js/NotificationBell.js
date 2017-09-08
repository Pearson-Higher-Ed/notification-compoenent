import React from 'react';
import NotificationIcon from './NotificationIcon';

const NotificationBell = ({unreadCount, toggleList, newNotifications}) => {

	let bellClassNames = 'notification-bell--count pe-label--small';

	if (newNotifications) {
		bellClassNames += ' notification-bell--new'
	}

	if (unreadCount === 0) {
		bellClassNames += ' hide-visibility';
	}
	return (
		<button
			id="notification-bell"
			type="button"
			className="notification-bell--activate pe-icon--btn"
			onClick={toggleList}
		>
			<span className={unreadCount===0 ? 'pe-sr-only' : 'notification-component--hide'}>Notifications</span>
			<NotificationIcon iconName="notification-18" iconAltText="" />

			<div className={bellClassNames}>
				<span>{unreadCount > 9 ? '9+' : unreadCount}</span>
				<span className="pe-sr-only">
					{unreadCount > 1 ? ' Unread Notifications' : ' Unread Notification'}
				</span>
			</div>
		</button>
	);
}

export default NotificationBell;

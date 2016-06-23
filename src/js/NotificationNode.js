import React from 'react';

const NotificationNode = ({detailsClick, title, summary, source, archivedNotification, time, isRead, trashIconDisable}) => {

	
	let background = 'notification-node';
	if(isRead) {
		background += ' notification-node--isread';
	}
	const timeScreenReader = (time.indexOf('min') !== -1) || (time.indexOf('hr') !== -1) ? ((time.indexOf('min') !== -1) ? time.replace('min', 'minutes') : time.replace('hr', 'hours')) : time;
	return (
		<div className={background}>
			<a href="javascript:void(0)" className="notification-node--no-decoration" onClick={detailsClick}>
				<div className="notification-node--details">
					<div className="notification-node--summary">
						<h1> {title} </h1>
						<div className="notification-node--summary-description">{summary}</div>

					</div>
					<div className="notification-node--meta">
						<div className="notification-node--meta-course">
						<span className="sr-hidden"> {timeScreenReader}{source ? ' \u00b7 ' : ''}{source}</span>
						<span aria-hidden="true">{time}{source ? ' \u00b7 ' : ''}{source}</span>
						</div>
					</div>
				</div>
			</a>
			<div className="notification-node--dismiss">
				<button aria-label="Archive" className={trashIconDisable ? 'hide' : ''} onClick={archivedNotification} ><i className="pe-icon--archive" ></i></button>
			</div>
		</div>
	);
};

export default NotificationNode;

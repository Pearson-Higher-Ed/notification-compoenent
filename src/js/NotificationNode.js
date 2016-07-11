import React from 'react';

const NotificationNode = ({detailsClick, title, summary, source, archivedNotification, time, isRead, trashIconDisable}) => {

	
	let background = 'notification-node';
	if(isRead) {
		background += ' notification-node--isread';
	}

	return (
		<div className={background}>
				<div className="notification-node--details">
					<div className="notification-node--summary">
						<h2> 
							<a href="javascript:void(0)"  className="notification-node--no-decoration" onClick={detailsClick}>
								{title} 
							</a>
						</h2>
						<div className="notification-node--summary-description">{summary}</div>
					</div>
					<div className="notification-node--meta">
						<div className="notification-node--meta-course">{time}{source ? ' \u00b7 ' : ''}{source}</div>
					</div>
				</div>		
			<div className="notification-node--dismiss">
				<button aria-label="Archive" className={trashIconDisable ? 'hide' : ''} onClick={archivedNotification} ><i className="pe-icon--archive" ></i></button>
			</div>
		</div>
	);
};

export default NotificationNode;

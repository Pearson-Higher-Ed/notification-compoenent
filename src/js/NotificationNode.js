import React from 'react';
import NotificationIcon from './NotificationIcon';

const NotificationNode = ({detailsClick, title, summary, source, archivedNotification, time, isRead, trashIconDisable}) => {

	
	let background = 'notification-node';
	if(isRead) {
		background += ' notification-node--isread';
	}

	return (
		<div className={background}>
			<div className="notification-node--details">
				<div className="notification-node--summary">
					<h2 className="pe-label--large"> 
						<a href="javascript:void(0)" onClick={detailsClick}>
							{title} 
						</a>
					</h2>
					<p className="notification-node--summary-description ">{summary}</p>
				</div>
				<div className="notification-node--meta">
					<div className="notification-node--meta-course pe-label--small">{time}{source ? ' \u00b7 ' : ''}{source}</div>
				</div>
			</div>		
			<div className="notification-node--dismiss ">
				<button aria-label="Archive" className={trashIconDisable ? 'notification-component--hide' : 'pe-btn'} onClick={archivedNotification} >
					<NotificationIcon iconName="archive-18" iconAltText="" />
				</button>
			</div>
		</div>
	);
};

export default NotificationNode;

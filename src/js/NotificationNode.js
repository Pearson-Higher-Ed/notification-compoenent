import React from 'react';
import NotificationIcon from './NotificationIcon';

const newNotification = (isRead)=>{
	if(!isRead) {
		return (
			<div className="new-notification-icon">
			 	<NotificationIcon iconName="new-notification-9" iconAltText="" />
			 </div>
		)
	}
}

const NotificationNode = ({detailsClick, title, summary, source, archivedNotification, time, isRead, trashIconDisable, archiveLinkText}) => {

	return (
		<div className="notification-node">
			<div className="notification-node--details">
				<div className="notification-node--summary">
					<div className="pe-bold notification-node--summary-title"> 
						<a href="javascript:void(0)" onClick={detailsClick}>
							{title}
						</a>
					</div>
					<p className="notification-node--summary-description pe-label">{summary}</p>
				</div>
				<div className="notification-node--meta">
					<div className="notification-node--meta-course pe-label--small">{time}{source ? ' \u00b7 ' : ''}{source}</div>
				</div>
			</div>		
			<a href="javascript:void(0)" aria-label="Archive" className={trashIconDisable ? 'notification-component--hide' : 'notification-node--dismiss pe-label--small'} onClick={archivedNotification} >
				{archiveLinkText}
			</a>
			 {newNotification(isRead)}
		</div>
	);
};

export default NotificationNode;

import React from 'react';
import NotificationList from './NotificationList';
import NotificationDetails from './NotificationDetails';
import NotificationHeading from './NotificationHeading';

export default class NotificationContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isArchive: false,
			displayDetails: false,
			notificationDetails: {
				message: {}
			},
			archivedList: props.archivedList || [],
			list: props.list || [],
			notificationList: props.list || []
		};
	}

	showDetails(notification) {
		this.setState({
			displayDetails: true,
			notificationDetails: notification
		});
	}

	showList() {
		this.setState({
			displayDetails: false
		});
	}

	appendArchiveList(archivedNotification) {
		const newList = this.state.list.filter(function(notification) {
			if (notification.id !== archivedNotification.id) {
				return notification;
			}
		});
		const newArchiveList = this.state.archivedList;
		newArchiveList.push(archivedNotification);
		this.setState({
			archivedList: newArchiveList,
			list: newList,
			notificationList:newList,
			displayDetails: false
		});
	}

	toggleArchive() {
		this.setState({
			list: this.state.archivedList,
			isArchive: true
		});
	}

	updatedNotificationList() {
		this.setState({
			list: this.state.notificationList,
			isArchive: false
		});
	}

	render() {
		return (
			<div>
				<div className="notification-title">
					<NotificationHeading back={this.showList.bind(this)} isList={!this.state.isArchive && !this.state.displayDetails} 
					isDetails={this.state.displayDetails} isArchive={this.state.isArchive}/>
					<div className="notification-archive--back ">
						<i className={this.state.isArchive ? 'pe-icon--chevron-down pointer' : 'pe-icon--times close-dropdown pointer'} onClick={this.state.isArchive  ? this.updatedNotificationList.bind(this) : this.props.closeDrawer}></i>
					</div>	
				</div>
				<div className={this.state.displayDetails ? 'hide' : ''}>
					<NotificationList list={this.state.list}  closeDrawer={this.props.closeDrawer} apiConfig={this.props.config} showDetails={this.showDetails.bind(this)}
					 appendArchiveList={this.appendArchiveList.bind(this)} isArchiveTray={this.state.isArchive} archivedList={this.state.archivedList}/>
				</div>
				<div className={this.state.displayDetails ? '' : 'hide'}>
					<div className="notification-list">
						<NotificationDetails notification={this.state.notificationDetails} closeDrawer={this.props.closeDrawer} apiConfig={this.props.config} appendArchiveList={this.appendArchiveList.bind(this)}/>
					</div>
				</div>
				<div className="notification-title" onClick={this.toggleArchive.bind(this)}>
					<h1 className={this.state.isArchive || this.state.displayDetails ? 'hide' : 'notification-title--heading'}>
						 Notification Archive
					</h1>
		
				</div>	
			</div>
		);
	}
}

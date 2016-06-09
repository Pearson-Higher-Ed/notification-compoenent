import React from 'react';
import NotificationList from './NotificationList';
import NotificationDetails from './NotificationDetails';
import NotificationHeading from './NotificationHeading';
import NotificationApi from './NotificationApi';

export default class NotificationContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isArchive: false,
			displayDetails: false,
			notificationDetails: {
				message: {}
			}
		};
	}

	showDetails(notification) {
		const state = {
			displayDetails: true,
			notificationDetails: notification
		};
		if(!this.state.isArchive && !notification.isRead) {
			this.props.notificationRead(notification);
		}
		this.refs.heading && this.refs.heading.focus();
		this.setState(state);
	}

	showList() {
		this.setState({
			displayDetails: false
		});
	}

	appendArchiveList(archivedNotification) {
		this.props.archiveNotification(archivedNotification);
		this.setState({
			displayDetails: false
		});
	}

	goToArchiveList() {
		this.setState({
			isArchive: true
		});
	}

	showNonArchivedList() {
		this.setState({
			isArchive: false
		});
	}

	render() {
		return (
			<div>
				<div className="notification-title">
					<div tabIndex={-1} ref="heading">
						<NotificationHeading back={this.showList.bind(this)} isList={!this.state.isArchive && !this.state.displayDetails} 
						isDetails={this.state.displayDetails} isArchive={this.state.isArchive}/>
					</div>
				</div>
				<div className={this.state.displayDetails ? 'hide' : ''}>
					<div className={this.state.isArchive ? 'hide': ''}>
						<NotificationList list={this.props.list} showDetails={this.showDetails.bind(this)}
						 appendArchiveList={this.appendArchiveList.bind(this)} isArchiveTray={false} goToArchiveList={this.goToArchiveList.bind(this)}/>
					</div>
					<div className={this.state.isArchive ? '': 'hide'}>
						<NotificationList list={this.props.archivedList} showDetails={this.showDetails.bind(this)}
						 appendArchiveList={this.appendArchiveList.bind(this)} isArchiveTray={true} goToArchiveList={this.goToArchiveList.bind(this)}/>
					</div>
				</div>
				<div className={this.state.displayDetails ? '' : 'hide'}>
					<div className="notification-list">
						<NotificationDetails notification={this.state.notificationDetails} closeDrawer={this.props.closeDrawer} apiConfig={this.props.config} appendArchiveList={this.appendArchiveList.bind(this)}/>
					</div>
				</div>
				<div className="notification-title" onClick={this.goToArchiveList.bind(this)}>
					<h1 className={this.state.isArchive || this.state.displayDetails ? 'hide' : 'notification-title--heading'}>
						<a href="javascript:void(0);"> Notification Archive </a> 
					</h1>
				</div>
				<div className="notification-archive--back">
					<button onClick={this.state.isArchive && !this.state.displayDetails ? this.showNonArchivedList.bind(this) : this.props.closeDrawer}> <i className={this.state.isArchive && !this.state.displayDetails ? 'pe-icon--chevron-down pointer' : 'pe-icon--times close-dropdown pointer'}></i> </button>
				</div>		
			</div>
		);
	}
}

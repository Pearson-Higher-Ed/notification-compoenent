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
		this.showDetails = this.showDetails.bind(this);
		this.showList = this.showList.bind(this);
		this.appendArchiveList = this.appendArchiveList.bind(this);
		this.goToArchiveList = this.goToArchiveList.bind(this);
		this.showNonArchivedList = this.showNonArchivedList.bind(this);
		this.resetListOnCloseDrawer = this.resetListOnCloseDrawer.bind(this);
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
		this.refs.closeButton && this.refs.closeButton.focus();
		this.setState({
			isArchive: true
		});
	}

	showNonArchivedList() {
		this.setState({
			isArchive: false
		});
	}

	resetListOnCloseDrawer() {
		this.setState({
			displayDetails: false,
			isArchive: false,
			list: this.state.notificationList
		});
		this.props.closeDrawer();
	}

	render() {
		return (
			<div>
				<div className={!this.state.displayDetails || this.state.isArchive ? 'notification-archive--back' : 'hide'} tabIndex={-1} ref="closeButton">
					<button onClick={this.state.isArchive && !this.state.displayDetails ? this.showNonArchivedList : this.resetListOnCloseDrawer}> <i className={this.state.isArchive && !this.state.displayDetails ? 'pe-icon--chevron-down pointer' : 'pe-icon--times close-dropdown pointer'}></i> </button>
				</div>
				<div className="notification-title">
					<div tabIndex={-1} ref="heading">
						<NotificationHeading back={this.showList} isList={!this.state.isArchive && !this.state.displayDetails}
						isDetails={this.state.displayDetails} isArchive={this.state.isArchive}/>
					</div>
				</div>
				<div className={this.state.displayDetails ? 'hide' : ''}>
					<div className={this.state.isArchive ? 'hide': ''}>
						<NotificationList list={this.props.list} showDetails={this.showDetails} isError={this.props.apiError}
						 appendArchiveList={this.appendArchiveList} isArchiveTray={false} goToArchiveList={this.goToArchiveList}/>
					</div>
					<div className={this.state.isArchive ? '': 'hide'}>
						<NotificationList list={this.props.archivedList} showDetails={this.showDetails} isError={this.props.apiError}
						 appendArchiveList={this.appendArchiveList} isArchiveTray={true} goToArchiveList={this.goToArchiveList}/>
					</div>
				</div>
				<div className={this.state.displayDetails ? '' : 'hide'}>
					<div className="notification-list">
						<NotificationDetails notification={this.state.notificationDetails} closeDrawer={this.props.closeDrawer} apiConfig={this.props.config} appendArchiveList={this.appendArchiveList}
							coachmarkListener={this.props.coachmarkListener}/>
					</div>
				</div>
				<div className="notification-title" onClick={this.goToArchiveList}>
					<h1 className={this.state.isArchive || this.state.displayDetails ? 'hide' : 'notification-title--heading'}>
						<a href="javascript:void(0);"> Notification Archive </a>
					</h1>
				</div>
				<div className={this.state.displayDetails ? 'notification-archive--back' : 'hide'}>
					<button onClick={this.state.isArchive && !this.state.displayDetails ? this.showNonArchivedList : this.resetListOnCloseDrawer}> <i className={this.state.isArchive && !this.state.displayDetails ? 'pe-icon--chevron-down pointer' : 'pe-icon--times close-dropdown pointer'}></i> </button>
				</div>
			</div>
		);
	}
}

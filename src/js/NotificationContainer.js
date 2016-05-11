import React from 'react';
import NotificationList from './NotificationList';

export default class NotificationContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isArchive: false
		};
	}

	changeHeading() {

	}

	render() {
		return (
			<div>
				<div className="notification-title">
					<h1 className="notification-title--heading">
						Notifications
					</h1>
					<i className="pe-icon--times close-dropdown pointer" onClick={this.props.closeDrawer}></i>
				</div>
				<NotificationList list={this.props.list} notificationCloseDropdown={this.props.closeDrawer} apiConfig={this.props.config}/>
			</div>
		);
	}
}

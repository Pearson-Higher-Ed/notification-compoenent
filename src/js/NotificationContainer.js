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
			notificationDetails: {message:{}}
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

	render() {
		return (
			<div>
				<div className="notification-title">
					<NotificationHeading back={this.showList.bind(this)} isList={!this.state.isArchive && !this.state.displayDetails} 
					isDetails={this.state.displayDetails} />
					<i className="pe-icon--times close-dropdown pointer" onClick={this.props.closeDrawer}></i>
				</div>
				<div className={this.state.displayDetails ? 'hide' : ''}>
					<NotificationList list={this.props.list} closeDrawer={this.props.closeDrawer} apiConfig={this.props.config} showDetails={this.showDetails.bind(this)}/>
				</div>
				<div className={this.state.displayDetails ? '' : 'hide'}>
					<div className="notification-list">
						<NotificationDetails notification={this.state.notificationDetails} closeDrawer={this.props.closeDrawer} apiConfig={this.props.config}/>
					</div>
				</div>
			</div>
		);
	}
}

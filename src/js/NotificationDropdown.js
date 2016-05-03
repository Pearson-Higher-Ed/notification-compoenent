import React from 'react';
import NotificationList from './NotificationList';

export default class NotificationDropdown extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showDropdown: false
		};
	}

	closeDropdown() {
		this.setState({showDropdown: false});
	}

	toggle() {
		if (this.state.showDropdown) {
			this.setState({showDropdown: false});
			return;
		}
		this.setState({showDropdown: true});

	}

	render() {
		return (
			<div>
				<i className="pe-icon--envelope pointer" onClick={this.toggle.bind(this)}></i>
				<div className={this.state.showDropdown ? '' : 'hide'}>
					<div className="notification-dropdown">
						<div className="dropdown-title">
							Notifications
							<i className="fa fa-remove close-dropdown pointer" onClick={this.closeDropdown.bind(this)}></i>
						</div>
						<NotificationList list={this.props.notificationList} notificationCloseDropdown={this.closeDropdown.bind(this)} apiConfig={this.props.apiConfig}/>
					</div>
				</div>
			</div>
		);
	}
}

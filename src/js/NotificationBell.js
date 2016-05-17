import React from 'react';

export default class NotificationBell extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="notification-bell">
				<i className="pe-icon--bell-o pointer" onClick={this.props.toggleList}></i>
			</div>
		);
	}
}

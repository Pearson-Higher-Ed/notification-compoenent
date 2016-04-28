import React from 'react';

export default class NotificationDetails extends React.Component {

	render() {
		return (
			<div className="notification-details">
				<div className="notification-details__title">
					<h1>{this.props.title}</h1>
				</div>
				<div className="notification-details__body">
					{this.props.body}
				</div>
				<div className="notification-details__buttons">
					<button onClick={this.props.previousClick}>go back</button>
				</div>
			</div>
		);
	}
}

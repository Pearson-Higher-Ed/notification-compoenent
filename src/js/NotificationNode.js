import React from 'react';

export default class NotificationNode extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="notification-node">
				<a href="javascript:void(0)" className="notification-node--no-decoration" onClick={this.props.detailsClick}>
					<div className="notification-node--details">
						<div className="notification-node--summary">
							<h1> {this.props.title} </h1>
							<div className="notification-node--summary-description">{this.props.summary}</div>
							
						</div>
						<div className="notification-node--meta">
							<div className="notification-node--meta-course">
								US History &#183; {this.props.time}
							</div>
						</div>
					</div>
				</a>
				<div className="notification-node--dismiss">
					<button><i className="pe-icon--trash-o"></i></button>
				</div>
			</div>
		);
	}
};


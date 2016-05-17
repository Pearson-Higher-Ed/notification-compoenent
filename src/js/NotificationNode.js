import React from 'react';

export default class NotificationNode extends React.Component {

	constructor(props) {
		super(props);
	}

	// when we hook up the course meta data.  We need to limit the course to not let it wrap.  
	render() {
		let background = 'notification-node';
		if(!this.props.isRead) {
			background += ' notification-node--unread';
		}
		return (
			<div className={background}>
				<a href="javascript:void(0)" className="notification-node--no-decoration" onClick={this.props.detailsClick}>
					<div className="notification-node--details">
						<div className="notification-node--summary">
							<h1> {this.props.title} </h1>
							<div className="notification-node--summary-description">{this.props.summary}</div>
							
						</div>
						<div className="notification-node--meta">
							<div className="notification-node--meta-course">
								{this.props.time} &#183; US History
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


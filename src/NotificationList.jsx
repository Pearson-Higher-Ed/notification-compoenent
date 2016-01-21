let React = require("react");
require("./style/notificationList.scss");
let NotificationNode = require("./NotificationNode");
let classNames = require("classnames");
let NotificationDetails = require("./NotificationDetails");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			isDetails: false
		};
	},

	showDetails: function(notification) {
		
		this.notificationDetails = ( 
			<NotificationDetails title={notification.title} body={notification.body} previousClick={this.showList}/>
		);
		this.setState({isDetails: true});

	},

	showList: function() {
		this.setState({isDetails: false});
	},
	
	render: function() {
		let notificationNodeList = this.props.list.map((notification) => {
			let detailsClick = this.showDetails.bind(this, notification);
			return (
				<NotificationNode detailsClick={detailsClick} title={notification.title} icon={notification.icon} key={notification.id} summary={notification.body.substring(0, 30) + "..."}/> 
			);
		});

		let listClassNames = classNames({
			"notifcation-container__list": true,
			"notification-container--hide": this.state.isDetails
		});
		this.listContainer = (
			<div className={listClassNames}>
				{notificationNodeList}
			</div>
		);
		let detailClassNames = classNames({
			"notification-container__details": true,
			"notification-container--hide": !this.state.isDetails
		});
		this.detailsContainer = (
			<div className={detailClassNames}>
				{this.notificationDetails}
			</div>
		);
		return (
			<div>
				<div className="notification-container">
					{this.listContainer}
					{this.detailsContainer}					
				</div>
			</div>
		);
	}
});
let React = require("react");
let NotificationNode = require("./NotificationNode");
let classNames = require("classnames");
let NotificationDetails = require("./NotificationDetails");
import CoachMark from 'o-coach-mark';


module.exports = React.createClass({
	getInitialState: function() {
		return {
			isDetails: false,
			notificationDetails: null
		};
	},

	showDetails: function(notification) {

		this.setState({
			isDetails: true,
			notificationDetails : notification
		});
	},

	showList: function() {
		this.setState({
			isDetails: false,
		});
	},

	launchCoachmark: function() {

		// Toggle the list and close the dropdown
		this.showList();
		this.props.notificationCloseDropdown();

		// Collect coachmark data and display
		var element = document.getElementById('foo');

		var data = {
			placement: 'bottom',
			title: 'Coach Mark Below Feature',
			text: 'Some text explaining to the user why you changed their interface',
			id: '9834893498'
		};

		var callback = function (id) { console.log('Callback executed on exit '+ id);};

		new CoachMark(element, data, callback);
	},

	render: function() {
		if(!this.state.isDetails) {
			let notificationNodeList = this.props.list.map((notification) => {
				return (
					<NotificationNode detailsClick={this.showDetails.bind(this, notification)} title={notification.title} icon={notification.icon} key={notification.id} summary={notification.body.substring(0, 30) + "..."}/>
				);
			});
			return (
				<div className="notification-container">
					{notificationNodeList}
				</div>
			);
		} else {
			return (
				<div className="notification-container">
					<button onClick={this.launchCoachmark}>Launch Coachmark</button>
					<NotificationDetails title={this.state.notificationDetails.title} body={this.state.notificationDetails.body} previousClick={this.showList}/>
				</div>
			)
		}

	}
});

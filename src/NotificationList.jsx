let React = require("react");
let NotificationNode = require("./NotificationNode");
let classNames = require("classnames");
let NotificationDetails = require("./NotificationDetails");
import Coachmark from 'o-coach-mark';

//CoachmarkAPI
let CoachmarkApi = require("./CoachmarkApi");
let cmApi = new CoachmarkApi();

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

	// Triggered from the click event on the page
	// Closes the notifications, creates listeners, and launches the first coachmark
	launchCoachmark: function(cmIds) {
		//Close the notifications
		this.showList();
		this.props.notificationCloseDropdown();

		// Creates the back/next button event listener
		document.addEventListener('o-cm-backNext-clicked', function(event) {
			let index = cmIds.indexOf(event.data.id);
			if (index < cmIds.length && event.data.type === 'nextButton') {
				return this.getDisplayCoachmark(cmIds, index + 1);
			}
			if (index > 0 && event.data.type === 'backButton') {
				return this.getDisplayCoachmark(cmIds, index - 1);
			}
			return;
		}.bind(this));

		// TODO: the rest of the listeners

		// Launches the first callback in the series
		this.getDisplayCoachmark(cmIds, 0);
	},

	// Gets and displays a coachmark by the ID found at cmIds[index]
	getDisplayCoachmark: function(cmIds, index) {
		let coachmarkData = cmApi.getCoachmark(cmIds[index]);
		coachmarkData.then(function(result) {
			new Coachmark(document.getElementById(result.element), result.options, function(id){});
		}, function(error) {
			console.log('Error: ', error);
		});
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
					<button onClick={this.launchCoachmark.bind(this, this.state.notificationDetails.cmId)}>Launch Coachmark</button>
					<NotificationDetails title={this.state.notificationDetails.title} body={this.state.notificationDetails.body} previousClick={this.showList}/>
				</div>
			)
		}

	}
});

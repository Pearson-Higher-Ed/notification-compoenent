let React = require("react");
let NotificationNode = require("./NotificationNode");
let classNames = require("classnames");
let NotificationDetails = require("./NotificationDetails");
import Coachmark from 'o-coach-mark';
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

	// Entry point for user interaction with the UI, launches first CM in the series
	launchCoachmark: function(cmIds) {
		this.showList(); // toggles the list
		this.props.notificationCloseDropdown();
		this.cmListenerSetup(cmIds);
		this.getDisplayCoachmark(cmIds, 0);
	},

	// Launches a CM if cmId and cmIndex exist, otherwise falls through and does nothing
	launchCoachmarkFromNewUrl: function() {
		let cmIndex = localStorage.getItem('coachmark.index');
		localStorage.removeItem('coachmark.index');

		let cmIds = localStorage.getItem('coachmark.cmIds');
		localStorage.removeItem('coachmark.cmIds');
		cmIds = cmIds ? cmIds.split(',') : null;

		if (cmIds && cmIndex) {
			cmIds = cmIds.map((param) => +param);
			cmIndex = (+cmIndex);
			this.cmListenerSetup(cmIds);
			this.getDisplayCoachmark(cmIds, cmIndex);
		}
	},

	cmListenerSetup: function(cmIds) {
		// Test if we already have listeners set up for these cmIds
		if (!this.notifications_coachmark_areCmListenersSetup) {
			this.notifications_coachmark_areCmListenersSetup = {};
		}
		if (this.notifications_coachmark_areCmListenersSetup[cmIds]) {
			return;
		}
		this.notifications_coachmark_areCmListenersSetup[cmIds] = true;

		// Back/Next event listener
		document.addEventListener('o-cm-backNext-clicked', function(event) {
			let eventIndex = this.getEventIndex(cmIds, event);
			if (eventIndex < 0) {
				return;
			}
			// Delete the current coachmark from the dom
			this.closeCoachmark(event.target.nextSibling);
			// use correct index based on navigation direction to create the new CM
			if (eventIndex < cmIds.length && event.data.type === 'nextButton') {
				return this.getDisplayCoachmark(cmIds, eventIndex + 1);
			}
			if (eventIndex > 0 && event.data.type === 'backButton') {
				return this.getDisplayCoachmark(cmIds, eventIndex - 1);
			}
			return;
		}.bind(this));

		// Like event listener
		document.addEventListener('o-cm-like-clicked', function(event) {
			// Don't trigger if this event isn't part of the list of IDs we're looking for
			if (this.getEventIndex(cmIds, event) < 0) {
				return;
			}
			console.log("Like event: log to API"); // TODO
		}.bind(this));

		// Submit event listener
		document.addEventListener('o-cm-submit-clicked', function(event) {
			// Don't trigger if this event isn't part of the list of IDs we're looking for
			if (this.getEventIndex(cmIds, event) < 0) {
				return;
			}
			console.log("Submit event: log to API"); // TODO
			console.log('Mark as READ in the API'); // TODO
			this.closeCoachmark(event.target.nextSibling);
		}.bind(this));

		// Cancel event listener
		document.addEventListener('o-cm-cancel-clicked', function(event) {
			// Don't trigger if this event isn't part of the list of IDs we're looking for
			if (this.getEventIndex(cmIds, event) < 0) {
				return;
			}
			console.log("Cancel event. What's supposed to happen here?"); // TODO
		}.bind(this));
	},

	// Gets data from the API and displays a coachmark on the correct page
	getDisplayCoachmark: function(cmIds, index) {
		let coachmarkData = cmApi.getCoachmark(+cmIds[index]);
		coachmarkData.then(function(result) {
			let isRedirecting = this.redirectIfNewUri(result.uri, cmIds, index);
			if (!isRedirecting) {
				let cm = new Coachmark(document.getElementById(result.element), result.options, function(){
					console.log('Mark as READ in the API'); // TODO
					this.closeCoachmark(cm.element.nextSibling);
				}.bind(this));
			}
		}.bind(this), function(error) {
			console.log('Error: ', error);
		});
	},

	getEventIndex: function(cmIds, event) {
		let eventIndex = cmIds.indexOf(event.data.id);
		return eventIndex;
	},

	redirectIfNewUri: function(uri, cmIds, index) {
		if (!uri) {
			return false;
		}
		// if relative, change to absolute using current domain
		let currentUri = window.location.href;
		if (!uri.toLowerCase().startsWith('http')) {
			let arr = (currentUri).split('/');
			let domain = arr[0] + '//' + arr[2];
			uri = domain + '/' + uri;
		}
		// Redirect only if the target url and current url don't match
		if (uri === currentUri ) {
			return false;
		}
		// Set local storage
		localStorage.setItem('coachmark.cmIds', cmIds);
		localStorage.setItem('coachmark.index', index);
		window.location.href = uri;
		return true;
	},

	// Removes a coachmark associated with the target node
	closeCoachmark: function(coachmarkNode) {
		// Verify the node. This is important because we don't want to delete random nodes.
		if (coachmarkNode === coachmarkNode.getElementsByClassName('o-coach-mark__container')[0].parentNode) {
			coachmarkNode.parentNode.removeChild(coachmarkNode);
		} else {
			throw new Error('No coachmark to remove')
		}
	},

	render: function() {
		// Will launch a CM if query params for one exist.
		this.launchCoachmarkFromNewUrl();

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

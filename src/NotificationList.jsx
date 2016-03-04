import Coachmark from 'o-coach-mark';

let React = require("react");
let NotificationNode = require("./NotificationNode");
let classNames = require("classnames");
let NotificationDetails = require("./NotificationDetails");
let CoachmarkApi = require("./CoachmarkApi");

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
		cmIds = cmIds ? cmIds.split(',') : null;
		if (!cmIds) {
			return;
		}
		cmIds = cmIds.map((param) => +param);

		this.showList(); // toggles the list
		this.props.notificationCloseDropdown();
		this.cmListenerSetup(cmIds);
		this.getDisplayCoachmark(cmIds, 0);
	},

	// Launches a CM if cmId and cmIndex exist, otherwise falls through and does nothing
	launchCoachmarkIfFromNewUrl: function() {
		let cmIndex = localStorage.getItem('notifications.coachmark.index');
		localStorage.removeItem('notifications.coachmark.index');

		let cmIds = localStorage.getItem('notifications.coachmark.cmIds');
		localStorage.removeItem('notifications.coachmark.cmIds');
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
			console.log('increment count in cmapi for cmId: ', event.data.id); // TODO
			let eventIndex = cmIds.indexOf(event.data.id);
			if (eventIndex < 0) {
				return; // event wasn't meant for this instance of this listener
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
			if (cmIds.indexOf(event.data.id) < 0) {
				return; // event wasn't meant for this instance of this listener
			}
			console.log("Like event: log to API"); // TODO
		}.bind(this));

		// Submit event listener
		document.addEventListener('o-cm-submit-clicked', function(event) {
			// Don't trigger if this event isn't part of the list of IDs we're looking for
			if (cmIds.indexOf(event.data.id) < 0) {
				return; // event wasn't meant for this instance of this listener
			}
			console.log("Submit event: log to API"); // TODO
			console.log('Mark as READ in the API'); // TODO
			this.closeCoachmark(event.target.nextSibling);
		}.bind(this));

		// Cancel event listener
		document.addEventListener('o-cm-cancel-clicked', function(event) {
			// Don't trigger if this event isn't part of the list of IDs we're looking for
			if (cmIds.indexOf(event.data.id) < 0) {
				return; // event wasn't meant for this instance of this listener
			}
			console.log("Cancel event. What's supposed to happen here?"); // TODO
		}.bind(this));
	},

	// Gets data from the API and displays a coachmark on the correct page
	getDisplayCoachmark: function(cmIds, index) {
		let coachmarkData = CoachmarkApi.getInstance().getCoachmark(+cmIds[index]);
		console.log('coachmarkData: ', coachmarkData);
		coachmarkData.then(function(result) {
			console.log('result: ', result);
			if (this.redirectIfNewUri(result.uri, cmIds, index)) {
				return;
			}
			let cm = new Coachmark(document.getElementById(result.element), result.options, function(){
				console.log('Mark as READ in the API'); // TODO
				this.closeCoachmark(cm.element.nextSibling);
			}.bind(this));

		}.bind(this), function(error) {
			console.log('Error: ', error); // TODO
		});
	},

	redirectIfNewUri: function(uri, cmIds, index) {
		if (!uri) {
			return false;
		}
		// String.startsWith pollyfill for Safari
		if (!String.prototype.startsWith) {
    	String.prototype.startsWith = function(searchString, position){
      	position = position || 0;
      	return this.substr(position, searchString.length) === searchString;
  		};
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
		localStorage.setItem('notifications.coachmark.cmIds', cmIds);
		localStorage.setItem('notifications.coachmark.index', index);
		window.location.href = uri;
		return true;
	},

	// Removes a coachmark associated with the target node
	closeCoachmark: function(coachmarkNode) {
		// Verify the node. This is important because we don't want to delete the wrong node.
		if (coachmarkNode === coachmarkNode.getElementsByClassName('o-coach-mark__container')[0].parentNode) {
			coachmarkNode.parentNode.removeChild(coachmarkNode);
		}
	},

	render: function() {
		this.launchCoachmarkIfFromNewUrl();

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
					<button onClick={this.launchCoachmark.bind(this, this.state.notificationDetails.cmIds)}>Launch Coachmark</button>
					<NotificationDetails title={this.state.notificationDetails.title} body={this.state.notificationDetails.body} previousClick={this.showList}/>
				</div>
			)
		}
	}
});

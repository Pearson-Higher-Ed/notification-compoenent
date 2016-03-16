import Coachmark from 'o-coach-mark';

let React = require("react");
let NotificationNode = require("./NotificationNode");
let classNames = require("classnames");
let NotificationDetails = require("./NotificationDetails");
let CoachmarkApi = require("./CoachmarkApi");
let FeedbackApi = require("./FeedbackApi");
let NotificationApi = require("./NotificationApi");

// Empty objects to be created on load
let cmState = {};
let notApi; // use getNotificationApi()
let cmApi; // use getCoachmarkApi()
let fbApi; // use getFeedbackApi()


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

	/**
	 * Lazy load notificationApi
	 **/
	getNotificationApi: function() {
		if (!notApi && this.props.apiConfig) {
			notApi = new NotificationApi(this.props.apiConfig)
		}
		return notApi;
	},

	/**
	 * Lazy load coachmarkApi
	 **/
	getCoachmarkApi: function() {
		if (!cmApi && this.props.apiConfig) {
			cmApi = new CoachmarkApi(this.props.apiConfig)
		}
		return cmApi;
	},

	/**
	 * Lazy load feedbackApi
	 **/
	getFeedbackApi: function() {
		if (!fbApi && this.props.apiConfig) {
			fbApi = new FeedbackApi(this.props.apiConfig)
		}
		return fbApi;
	},

	/**
	 * Entry point from user interaction with the UI,
	 * launches the first CM in the set contained in the triggering notification
	 **/
	launchCoachmark: function(notificationDetails) {
		let cmIds = notificationDetails.cmIds;
		cmIds = cmIds ? cmIds.split(',') : null;
		if (!cmIds) {
			return;
		}
		cmIds = cmIds.map((param) => parseInt(param));
		let notificationId = parseInt(notificationDetails.id);

		cmState[notificationId] = {
			notificationId: notificationId,
			cmIds: cmIds,
			index: 0,
			isVisited: {},
			likeCmSeries: '',
			areListenersSet: false
		};

		this.showList(); // toggles the list, which we assume this was triggered from
		this.props.notificationCloseDropdown();

		this.cmListenerSetup(notificationId);
		this.getDisplayCoachmark(notificationId);
	},

	/**
	 * Entry point if details in local storage. Runs on each page load.
	 * If we placed details in local storage in order to keep state for a redirect to a new url,
	 * this function will read those values and launch a coachmark right were we left off.
	 * Otherwise, we return false and do nothing.
	 **/
	launchCoachmarkIfFromNewUrl: function() {
		let fromLocal = localStorage.getItem('notifications.coachmark.stateObject');
		localStorage.removeItem('notifications.coachmark.stateObject');
		if (!fromLocal) {
			return false;
		}
		try {
			fromLocal = JSON.parse(fromLocal);
		} catch (e) {
			console.log('Exception parsing JSON from local storage: ', e);
		}

		if (!fromLocal.notificationId) {
			return false; // We aren't here because of a redirect
		}

		fromLocal.notificationId = parseInt(fromLocal.notificationId);
		fromLocal.cmIds = fromLocal.cmIds.map((param) => parseInt(param));
		fromLocal.index = +fromLocal.index;

		cmState[fromLocal.notificationId] = fromLocal;

		this.cmListenerSetup(fromLocal.notificationId);
		this.getDisplayCoachmark(fromLocal.notificationId);
	},

	/**
	 * Sets up the back/next listener
	 **/
	setupBackNextListener: function(notificationId) {
		let cmIds = cmState[notificationId].cmIds;
		document.addEventListener('o-cm-backNext-clicked', function(event) {
			let eventIndex = cmIds.indexOf(event.data.id);
			if (eventIndex !== cmState[notificationId].index) {
				return; // event wasn't meant for this instance of this listener
			}
			this.closeCoachmark(event.target.nextSibling); // close the current CM
			if (eventIndex + 1 <= cmIds.length && event.data.type === 'nextButton') {
				eventIndex++;
			}
			if (eventIndex > 0 && event.data.type === 'backButton') {
				eventIndex--;
			}
			cmState[notificationId].index = eventIndex;
			this.getDisplayCoachmark(notificationId);
		}.bind(this));
	},

	/**
	 * Sets up the like button listener
	 **/
	setupLikeListener: function(notificationId) {
		let cmIds = cmState[notificationId].cmIds;
		document.addEventListener('o-cm-like-clicked', function(event) {
			if (cmIds.indexOf(event.data.id) !== cmState[notificationId].index) {
				return; // event wasn't meant for this instance of this listener
			}
			cmState[notificationId].likeCmSeries = event.data.type;
		}.bind(this));
	},

	/**
	 * Sets up the submit button listener
	 **/
	setupSubmitListener(notificationId) {
		let cmIds = cmState[notificationId].cmIds;
		document.addEventListener('o-cm-submit-clicked', function(event) {
			if (cmIds.indexOf(event.data.id) !== cmState[notificationId].index) {
				return; // event wasn't meant for this instance of this listener
			}
			this.getFeedbackApi().submitFeedback(notificationId, event.data.payload);
			this.getFeedbackApi().likeCmSeries(notificationId, cmState[notificationId].likeCmSeries);
			this.getNotificationApi().markAsRead(notificationId);
			this.closeCoachmark(event.target.nextSibling);
		}.bind(this));
	},

	/**
	 * Sets up the cancel (return to like/dislike button) listener
	 **/
	setupCancelListener(notificationId) {
		let cmIds = cmState[notificationId].cmIds;
		document.addEventListener('o-cm-cancel-clicked', function(event) {
			if (cmIds.indexOf(event.data.id) !== cmState[notificationId].index) {
				return; // event wasn't meant for this instance of this listener
			}
			cmState[notificationId].likeCmSeries = '';
		}.bind(this));
	},

	/**
	 * Sets up listeners for this series of coachmarks
	 **/
	cmListenerSetup: function(notificationId) {
		if (cmState[notificationId].areListenersSet) {
			return
		}
		this.setupBackNextListener(notificationId);
		this.setupLikeListener(notificationId);
		this.setupSubmitListener(notificationId);
		this.setupCancelListener(notificationId);

		cmState[notificationId].areListenersSet = true;
	},

	/**
	 * Gets data from the API and displays a coachmark on the correct page
	 **/
	getDisplayCoachmark: function(notificationId) {
		let cmId = parseInt(cmState[notificationId].cmIds[cmState[notificationId].index]);

		let coachmarkData = this.getCoachmarkApi().getCoachmark(cmId);
		coachmarkData.then(function(result) {
			if (this.redirectIfNewUri(result.uri, notificationId)) {
				return;
			}
			let cm = new Coachmark(document.getElementById(result.element), result.options, function() {
				this.getNotificationApi().markAsRead(notificationId);
				this.closeCoachmark(cm.element.nextSibling);
			}.bind(this));
			if (!cmState[notificationId].isVisited[cmId]) {
				this.getCoachmarkApi().incrementViewCount(cmId);
				cmState[notificationId].isVisited[cmId] = true;
			}
		}.bind(this), function(error) {
			console.log('Error: ', error);
		});
	},

	/**
	 * if the current uri and the uri passed in do not match,
	 * store state in local storage and redirect to the new uri
	 **/
	redirectIfNewUri: function(uri, notificationId) {
		if (!uri) {
			return false;
		}
		// String.startsWith pollyfill for Safari
		if (!String.prototype.startsWith) {
    	String.prototype.startsWith = function(searchString, position) {
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
		cmState[notificationId].areListenersSet = false;
		localStorage.setItem('notifications.coachmark.stateObject', JSON.stringify(cmState[notificationId]));

		window.location.href = uri;
		return true;
	},

	/**
	 * Removes a coachmark associated with the target node from the DOM
	 **/
	closeCoachmark: function(coachmarkNode) {
		// Verify the node. This is important because we don't want to delete the wrong node.
		if (coachmarkNode === coachmarkNode.getElementsByClassName('o-coach-mark__container')[0].parentNode) {
			coachmarkNode.parentNode.removeChild(coachmarkNode);
		}
	},

	/**
	 * Render
	 **/
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
					<button onClick={this.launchCoachmark.bind(this, this.state.notificationDetails)}>Launch Coachmark</button>
					<NotificationDetails title={this.state.notificationDetails.title} body={this.state.notificationDetails.body} previousClick={this.showList}/>
				</div>
			)
		}
	}
});

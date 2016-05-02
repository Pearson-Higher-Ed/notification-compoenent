// import Coachmark from 'o-coach-mark';

import React from 'react';
import NotificationNode from './NotificationNode';
import NotificationDetails from './NotificationDetails';
import CoachmarkApi from './CoachmarkApi';
import FeedbackApi from './FeedbackApi';
import NotificationApi from './NotificationApi';

function Coachmark() {

}


export default class NotificationList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isDetails: false,
			notificationDetails: null
		};
		// Empty objects to be created on load
		this.cmState = {};
		this.notApi; // use getNotificationApi()
		this.cmApi; // use getCoachmarkApi()
		this.fbApi; // use getFeedbackApi()
	}

	showDetails(notification) {
		this.setState({
			isDetails: true,
			notificationDetails : notification
		});
	}

	showList() {
		this.setState({
			isDetails: false
		});
	}

	/**
	 * Lazy load notificationApi
	 **/
	getNotificationApi() {
		if (!this.notApi && this.props.apiConfig) {
			this.notApi = new NotificationApi(this.props.apiConfig)
		}
		return this.notApi;
	}

	/**
	 * Lazy load coachmarkApi
	 **/
	getCoachmarkApi() {
		if (!this.cmApi && this.props.apiConfig) {
			this.cmApi = new CoachmarkApi(this.props.apiConfig)
		}
		return this.cmApi;
	}

	/**
	 * Lazy load feedbackApi
	 **/
	getFeedbackApi() {
		if (!this.fbApi && this.props.apiConfig) {
			this.fbApi = new FeedbackApi(this.props.apiConfig)
		}
		return this.fbApi;
	}

	/**
	 * Entry point from user interaction with the UI,
	 * launches the first CM in the set contained in the triggering notification
	 **/
	launchCoachmark(notificationDetails) {
		let cmIds = notificationDetails.cmIds;
		cmIds = cmIds ? cmIds.split(',') : null;
		if (!cmIds) {
			return;
		}

		let masterpieceId = notificationDetails.masterpieceId;
		if (!masterpieceId) {
			return;
		}

		cmIds = cmIds.map((param) => parseInt(param));
		masterpieceId = parseInt(notificationDetails.masterpieceId);

		this.cmState[masterpieceId] = {
			userNotificationId: notificationDetails.userNotificationId,
			userId: notificationDetails.userId,
			targetUserRole: notificationDetails.targetUserRole ? notificationDetails.targetUserRole : 'N/A',
			masterpieceId: masterpieceId,
			cmIds: cmIds,
			index: 0,
			isVisited: {},
			likeCmSeries: '',
			areListenersSet: false
		};

		this.showList(); // toggles the list, which we assume this was triggered from
		this.props.notificationCloseDropdown();

		this.cmListenerSetup(masterpieceId);
		this.getDisplayCoachmark(masterpieceId);
	}

	/**
	 * Entry point if details in local storage. Runs on each page load.
	 * If we placed details in local storage in order to keep state for a redirect to a new url,
	 * this function will read those values and launch a coachmark right were we left off.
	 * Otherwise, we return false and do nothing.
	 **/
	launchCoachmarkIfFromNewUrl() {
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

		if (!fromLocal.masterpieceId) {
			return false; // We aren't here because of a redirect
		}

		fromLocal.masterpieceId = parseInt(fromLocal.masterpieceId);
		fromLocal.cmIds = fromLocal.cmIds.map((param) => parseInt(param));
		fromLocal.index = parseInt(fromLocal.index);

		this.cmState[fromLocal.masterpieceId] = fromLocal;

		this.cmListenerSetup(fromLocal.masterpieceId);
		this.getDisplayCoachmark(fromLocal.masterpieceId);
	}

	/**
	 * Sets up the back/next listener
	 **/
	setupBackNextListener(masterpieceId) {
		const cmIds = this.cmState[masterpieceId].cmIds;
		document.addEventListener('o-cm-backNext-clicked', function(event) {
			let eventIndex = cmIds.indexOf(event.data.id);
			if (eventIndex !== this.cmState[masterpieceId].index) {
				return; // event wasn't meant for this instance of this listener
			}
			this.closeCoachmark(event.target.nextSibling); // close the current CM
			if (eventIndex + 1 <= cmIds.length && event.data.type === 'nextButton') {
				eventIndex++;
			}
			if (eventIndex > 0 && event.data.type === 'backButton') {
				eventIndex--;
			}
			this.cmState[masterpieceId].index = eventIndex;
			this.getDisplayCoachmark(masterpieceId);
		}.bind(this));
	}

	/**
	 * Sets up the like button listener
	 **/
	setupLikeListener(masterpieceId) {
		const cmIds = this.cmState[masterpieceId].cmIds;
		document.addEventListener('o-cm-like-clicked', function(event) {
			if (cmIds.indexOf(event.data.id) !== this.cmState[masterpieceId].index) {
				return; // event wasn't meant for this instance of this listener
			}
			this.cmState[masterpieceId].likeCmSeries = event.data.type;
		}.bind(this));
	}

	/**
	 * Sets up the submit button listener
	 **/
	setupSubmitListener(masterpieceId) {
		const cmIds = this.cmState[masterpieceId].cmIds;
		document.addEventListener('o-cm-submit-clicked', function(event) {
			if (cmIds.indexOf(event.data.id) !== this.cmState[masterpieceId].index) {
				return; // event wasn't meant for this instance of this listener
			}
			this.getFeedbackApi().submitFeedback(
				masterpieceId,
				this.cmState[masterpieceId].userId,
				this.cmState[masterpieceId].targetUserRole,
				event.data.payload,
				this.cmState[masterpieceId].likeCmSeries
			);
			this.getNotificationApi().markAsRead(this.cmState[masterpieceId].userNotificationId);
			this.closeCoachmark(event.target.nextSibling);
		}.bind(this));
	}

	/**
	 * Sets up the cancel (return to like/dislike button) listener
	 **/
	setupCancelListener(masterpieceId) {
		const cmIds = this.cmState[masterpieceId].cmIds;
		document.addEventListener('o-cm-cancel-clicked', function(event) {
			if (cmIds.indexOf(event.data.id) !== this.cmState[masterpieceId].index) {
				return; // event wasn't meant for this instance of this listener
			}
			this.cmState[masterpieceId].likeCmSeries = '';
		}.bind(this));
	}

	/**
	 * Sets up listeners for this series of coachmarks
	 **/
	cmListenerSetup(masterpieceId) {
		if (this.cmState[masterpieceId].areListenersSet) {
			return
		}
		this.setupBackNextListener(masterpieceId);
		this.setupLikeListener(masterpieceId);
		this.setupSubmitListener(masterpieceId);
		this.setupCancelListener(masterpieceId);

		this.cmState[masterpieceId].areListenersSet = true;
	}

	/**
	 * Gets data from the API and displays a coachmark on the correct page
	 **/
	getDisplayCoachmark(masterpieceId) {
		const cmId = parseInt(this.cmState[masterpieceId].cmIds[this.cmState[masterpieceId].index]);

		const coachmarkData = this.getCoachmarkApi().getCoachmark(cmId);
		coachmarkData.then(function(result) {
			if (this.redirectIfNewUri(result.uri, masterpieceId)) {
				return;
			}
			const cm = new Coachmark(document.getElementById(result.element), result.options, function() {
				this.getNotificationApi().markAsRead(this.cmState[masterpieceId].userNotificationId);
				this.closeCoachmark(cm.element.nextSibling);
			}.bind(this));
			if (!this.cmState[masterpieceId].isVisited[cmId]) {
				this.getCoachmarkApi().incrementViewCount(cmId);
				this.cmState[masterpieceId].isVisited[cmId] = true;
			}
		}.bind(this), function(error) {
			console.log('Error: ', error);
		});
	}

	/**
	 * if the current uri and the uri passed in do not match,
	 * store state in local storage and redirect to the new uri
	 **/
	redirectIfNewUri(uri, masterpieceId) {
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
		const currentUri = window.location.href;
		if (!uri.toLowerCase().startsWith('http')) {
			const arr = (currentUri).split('/');
			const domain = arr[0] + '//' + arr[2];
			uri = domain + '/' + uri;
		}
		// Redirect only if the target url and current url don't match
		if (uri === currentUri ) {
			return false;
		}
		// Set local storage
		this.cmState[masterpieceId].areListenersSet = false;
		localStorage.setItem('notifications.coachmark.stateObject', JSON.stringify(this.cmState[masterpieceId]));

		window.location.href = uri;
		return true;
	}

	/**
	 * Removes a coachmark associated with the target node from the DOM
	 **/
	closeCoachmark(coachmarkNode) {
		// Verify the node. This is important because we don't want to delete the wrong node.
		if (coachmarkNode === coachmarkNode.getElementsByClassName('o-coach-mark__container')[0].parentNode) {
			coachmarkNode.parentNode.removeChild(coachmarkNode);
		}
	}

	/**
	 * Render
	 **/
	render() {
		this.launchCoachmarkIfFromNewUrl();

		if (!this.state.isDetails) {
			const notificationNodeList = this.props.list.map((notification) => {
				return (
					<NotificationNode detailsClick={this.showDetails.bind(this, notification)} title={notification.title} icon={notification.icon} key={notification.id}
					summary={notification.body.substring(0, 30) + '...'}/>
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
};

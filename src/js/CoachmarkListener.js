import Coachmark from '@pearson-components/coach-mark';
import CoachmarkApi from './CoachmarkApi';
import FeedbackApi from './FeedbackApi';
import NotificationApi from './NotificationApi';

export default class CoachmarkListener {

	constructor(config) {
		this.coachmarkApi = new CoachmarkApi(config);
		this.feedbackApi = new FeedbackApi(config);
		this.notificationApi = new NotificationApi(config);
	}

	/**
	 * Entry point from user interaction with the UI,
	 * launches the first CM in the set contained in the triggering notification
	 **/
	launchCoachmark(notification) {
		const notificationDetails = notification.message;
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
		this.cmState = {};
		this.cmState[masterpieceId] = {
			userNotificationId: notification.id,
			userId: notification.recipientId,
			masterpieceId: masterpieceId,
			cmIds: cmIds,
			index: 0,
			isVisited: {},
			areListenersSet: false
		};

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
		this.cmState = {};
		this.cmState[fromLocal.masterpieceId] = fromLocal;

		this.cmListenerSetup(fromLocal.masterpieceId);
		this.getDisplayCoachmark(fromLocal.masterpieceId);
		return true;
	}

	/**
	 * Sets up listeners for this series of coachmarks
	 **/
	cmListenerSetup(masterpieceId) {
		if (this.cmState[masterpieceId].areListenersSet) {
			return;
		}
		this.setupBackListener(masterpieceId);
		this.setupNextListener(masterpieceId);
		this.cmState[masterpieceId].areListenersSet = true;
	}

	/**
	 * Sets up the back listener
	 **/
	setupBackListener(masterpieceId) {
		const cmIds = this.cmState[masterpieceId].cmIds;

		document.addEventListener('o-cm-previous-clicked', (event) => {
			const index = this.cmState[masterpieceId].index;
			if (masterpieceId !== event.data.id || index === 0) {
				return; // event wasn't meant for this instance of this listener
			}
			this.cmState[masterpieceId].index--;
			this.getDisplayCoachmark(masterpieceId);
		});
	}

	/**
	 * Sets up the next listener
	 **/
	setupNextListener(masterpieceId) {
		const cmIds = this.cmState[masterpieceId].cmIds;

		document.addEventListener('o-cm-next-clicked', (event) => {
			const index = this.cmState[masterpieceId].index;
			if (masterpieceId !== event.data.id || index + 1 === cmIds.length) {
				return;
			}
			this.cmState[masterpieceId].index++;
			this.getDisplayCoachmark(masterpieceId);
		});
	}


	/**
	 * Gets data from the API and displays a coachmark on the correct page
	 **/
	getDisplayCoachmark(masterpieceId) {
		const cmIds = this.cmState[masterpieceId].cmIds;
		const index = this.cmState[masterpieceId].index;
		const cmId = cmIds[index];

		this.coachmarkApi.getCoachmark(cmId).then((result) => {
			// Redirect if this coachmark ID is meant to display on a different page
			if (this.redirectIfNewUri(result.uri, masterpieceId)) {
				return;
			}

			// Auto-populating options to simplify the coachmark payload
			const options = result.options;
			options.id = masterpieceId;
			options.currentCM = parseInt(index) + 1;
			options.totalCM = cmIds.length;

			// Display the coach mark
			new Coachmark(document.getElementById(result.element), options, () => {
				this.notificationApi.markAsRead(this.cmState[masterpieceId].userNotificationId);
			});

			// Tick hit counter if first visit
			if (!this.cmState[masterpieceId].isVisited[cmId]) {
				this.coachmarkApi.incrementViewCount(cmId);
				this.cmState[masterpieceId].isVisited[cmId] = true;
			}
		}, (error) => {
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
		if (uri === currentUri) {
			return false;
		}
		// Set local storage
		this.cmState[masterpieceId].areListenersSet = false;
		localStorage.setItem('notifications.coachmark.stateObject', JSON.stringify(this.cmState[masterpieceId]));

		window.location.href = uri;
		return true;
	}
}

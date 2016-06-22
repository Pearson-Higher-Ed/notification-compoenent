import Coachmark from '@pearson-components/coach-mark';
import CoachmarkApi from './CoachmarkApi';
import FeedbackApi from './FeedbackApi';
import NotificationApi from './NotificationApi';

export default class CoachmarkListener {

	constructor(config) {
		// String.startsWith pollyfill for Safari
		if (!String.prototype.startsWith) {
			String.prototype.startsWith = function(searchString, position) {
				position = position || 0;
				return this.substr(position, searchString.length) === searchString;
			};
		}

		// global vars
		this.localStorageKey = 'notifications.coachmark.stateObject';

		// APIs
		this.coachmarkApi = new CoachmarkApi(config);
		this.feedbackApi = new FeedbackApi(config);
		this.notificationApi = new NotificationApi(config);

	}

	setupListeners() {
		this._setupBackListener();
		this._setupNextListener();
		return this;
	}

	/**
	 * Entry point if details in local storage. Runs on each page load.
	 * If we placed details in local storage in order to keep state for a redirect to a new url,
	 * this function will read those values and launch a coachmark right were we left off.
	 * Otherwise, we return false and do nothing.
	 **/
	continueTourIfRedirected() {
		let state;
		try {
			state = localStorage.getItem(this.localStorageKey);
			localStorage.removeItem(this.localStorageKey);
		} catch (e) {
			this._handleError(e, true);
		}

		if (!state) {
			return false;
		}

		try {
			state = JSON.parse(state);
			this._getDisplayCoachmark(state, true);
			return true;
		} catch (e) {
			this._handleError(e);
		}
	}

	/**
	 * Entry point from user interaction with the UI,
	 * launches the first CM in the set contained in the triggering notification
	 **/
	launchTour(notification) {
		try {
			let cmIds = notification.message.cmIds;
			cmIds = cmIds ? cmIds.split(',') : null;
			cmIds = cmIds.map((param) => parseInt(param));

			const state = {
				userNotificationId: notification.id,
				cmIds: cmIds,
				index: 0,
				isVisited: {}
			};

			this._getDisplayCoachmark(state);

		} catch (e) {
			this._handleError(e);
		}
	}

	/**
	 * Sets up the back listener
	 **/
	_setupBackListener() {
		document.addEventListener('o-cm-previous-clicked', (event) => {
			try {
				const state = JSON.parse(event.data.id);
				if (state.index === 0) {
					return;
				}
				state.index--;
				this._getDisplayCoachmark(state);
			} catch (e) {
				this._handleError(e);
			}
		});
	}

	/**
	 * Sets up the next listener
	 **/
	_setupNextListener() {
		document.addEventListener('o-cm-next-clicked', (event) => {
			try {
				const state = JSON.parse(event.data.id);
				if (state.index + 1 === state.cmIds.length) {
					return;
				}
				state.index++;
				this._getDisplayCoachmark(state);
			} catch (e) {
				this._handleError(e);
			}
		});
	}

	/**
	 * Gets data from the API and displays a coachmark on the correct page
	 **/
	_getDisplayCoachmark(state, isAlreadyRedirected) {
		const cmId = state.cmIds[state.index];

		this.coachmarkApi.getCoachmark(cmId)
			.then((coachmark) => {
				// continueTourIfRedirected is the only thing setting this flag.
				// If it's set to true, it means we're trying to load a coach mark from a redirect
				// and we can bypass this check. This is meant to prevent a situation
				// where hitting back on a bad redirect always triggers the redirect again.
				if (!isAlreadyRedirected) {
					// Redirect if this coachmark ID is meant to display on a different page
					if (this._redirectIfNewUri(coachmark.uri, state)) {
						return;
					}
				}

				// Tick hit counter if first visit
				try {
					if (!state.isVisited[cmId]) {
						this.coachmarkApi.incrementViewCount(cmId);
						state.isVisited[cmId] = true;
					}
				} catch (e) {
					this._handleError(e, true);
				}

				// Auto-populating options to simplify the coachmark payload
				const options = coachmark.options;
				options.id = JSON.stringify(state);
				if (state.cmIds.length > 1) {
					options.currentCM = parseInt(state.index) + 1;
					options.totalCM = state.cmIds.length;
				}

				// Display the coach mark
				new Coachmark(document.getElementById(coachmark.element), options, () => {
					this.notificationApi.markAsRead(state.userNotificationId);
				});

			}, (error) => {
				this._handleError(error);
			});
	}

	/**
	 * if the current uri and the uri passed in do not match,
	 * store state in local storage and redirect to the new uri
	 **/
	_redirectIfNewUri(uri, state) {
		if (!uri) {
			return false;
		}

		// if relative, change to absolute using current domain
		const currentUri = window.location.href;
		if (!uri.toLowerCase().startsWith('http')) {
			const arr = (currentUri).split('/');
			const domain = arr[0] + '//' + arr[2];
			uri = domain + '/' + uri;
		}
		// If the target URI and current URI are the same, don't redirect
		if (uri === currentUri) {
			return false;
		}
		// Set local storage
		localStorage.setItem(this.localStorageKey, JSON.stringify(state));

		window.location.href = uri;
		return true;
	}

	_handleError(error, isSilentFailure) {
		//TODO: We should probably log back all errors

		if (window.sessionStorage) {
			const errKey = 'CoachMark_ERROR';
			let err = Date().toString() + ': ' + error.toString() + '\n';
			const currErr = sessionStorage.getItem(errKey);
			err += currErr ? currErr : '';
			sessionStorage.setItem(errKey, err);
		}

		console.log('Handled error: ', error);

		if (isSilentFailure) {
			return;
		}

		const options = {
			title: 'There seems to be a problem with this feature.',
			text: 'Try refreshing your browser or clearing your cache.​',
			id: Date.now(),
			disableShadow: true,
			disablePointer: true
		};
		new Coachmark(document.getElementsByClassName('notification-bell')[0], options, () => {});
	}
}

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

	cmListenerSetup: function(cmIds) {
		// Creates the back/next button event listener
		let backNextListener = document.addEventListener('o-cm-backNext-clicked', function(event) {
			let eventIndex = cmIds.indexOf(event.data.id);
			if (eventIndex < cmIds.length && event.data.type === 'nextButton') {
				return this.getDisplayCoachmark(cmIds, eventIndex + 1);
			}
			if (eventIndex > 0 && event.data.type === 'backButton') {
				return this.getDisplayCoachmark(cmIds, eventIndex - 1);
			}
			return;
		}.bind(this));

		// TODO: the rest of the listeners.

	},

	// Closes the notifications, creates listeners, and launches the coachmark at cmIds[index]
	launchCoachmark: function(cmIds, index) {
		this.showList();
		this.props.notificationCloseDropdown();
		this.cmListenerSetup(cmIds);
		// TODO: Do something with the callback in the cm-api payload
		this.getDisplayCoachmark(cmIds, index);
	},

	removeQueryParam: function(uri, param) {
		if (!uri || !uri.includes(param)) {
			return uri;
		}
		var reg = new RegExp( '([?&]' + param + '=[^&#]*)', 'i' );
		return uri.replace(reg, '');
	},

	redirectIfNewUri: function(uri, cmIds, index) {
		if (!uri) {
			return;
		}

		// if relative, change to absolute using current domain
		let currentUri = window.location.href;
		if (!uri.toLowerCase().startsWith('http')) {
			let arr = (currentUri).split('/');
			let domain = arr[0] + '//' + arr[2];
			uri = domain + '/' + uri;
		}

		// If our query params already exist in the uri, take them out before we compare
		currentUri = this.removeQueryParam(currentUri, 'cmIds');
		currentUri = this.removeQueryParam(currentUri, 'cmIndex');

		// Redirect only if the target url and current url don't match
		if (uri === currentUri ) {
			return;
		}

		let qstart = (uri.includes('?') ? '&' : '?');
		uri = uri + qstart + 'cmIds=' + encodeURIComponent(cmIds) + '&cmIndex=' + index;
		window.location.href = uri;
	},

	// Gets and displays a coachmark by the ID found at cmIds[index]
	getDisplayCoachmark: function(cmIds, index) {
		let coachmarkData = cmApi.getCoachmark(+cmIds[index]);
		coachmarkData.then(function(result) {
			this.redirectIfNewUri(result.uri, cmIds, index);
			new Coachmark(document.getElementById(result.element), result.options, function(id){});
		}.bind(this), function(error) {
			console.log('Error: ', error);
		});
	},

	parseQueryParams: function(field, url) {
		var href = url ? url : window.location.href;
		var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
		var string = reg.exec(href);
		return string ? string[1] : null;
	},

	launchCoachmarkFromUrl: function() {
		// Getting multiple CMs on load when params exist, which is bad.
		// There has got to be a better way of preventing this.
		if (this.cmAlreadyLaunchedFromUrl) {
			return;
		}
		this.cmAlreadyLaunchedFromUrl = true;

		let cmIndex = this.parseQueryParams('cmIndex');
		let cmIds = this.parseQueryParams('cmIds');
		cmIds = cmIds ? (decodeURIComponent(cmIds)).split(',') : null;

		if (cmIds && cmIndex) {
			cmIds = cmIds.map((param) => +param);
			cmIndex = (+cmIndex);
			this.cmListenerSetup(cmIds);
			this.getDisplayCoachmark(cmIds, cmIndex);
		}
	},

	render: function() {
		// Will launch a CM if query params for one exist.
		this.launchCoachmarkFromUrl();

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
					<button onClick={this.launchCoachmark.bind(this, this.state.notificationDetails.cmId, 0)}>Launch Coachmark</button>
					<NotificationDetails title={this.state.notificationDetails.title} body={this.state.notificationDetails.body} previousClick={this.showList}/>
				</div>
			)
		}
	}
});

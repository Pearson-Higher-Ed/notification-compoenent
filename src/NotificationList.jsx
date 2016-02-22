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

	// Entry point for user interaction with the UI
	launchCoachmark: function(cmIds, index) {
		this.showList();
		this.props.notificationCloseDropdown();
		this.cmListenerSetup(cmIds);
		this.getDisplayCoachmark(cmIds, index);
	},

	cmListenerSetup: function(cmIds) {
		// Back/Next event listener
		document.addEventListener('o-cm-backNext-clicked', function(event) {
			let eventIndex = cmIds.indexOf(event.data.id);
			// Delete the current coachmark
			var cm = event.target.nextSibling;
			cm.parentNode.removeChild(cm);
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
			console.log("Like event: log to API"); // TODO
		});

		// Submit event listener
		document.addEventListener('o-cm-submit-clicked', function(event) {
			console.log("Submit event: log to API. Should there be a thank you message?"); // TODO
			this.closeCoachmarkReloadPage()
		}.bind(this));

		// Cancel event listener
		document.addEventListener('o-cm-cancel-clicked', function(event) {
			console.log("Cancel event. What's supposed to happen here?"); // TODO
		});
	},

	// Gets data from the API and displays a coachmark on the correct page
	getDisplayCoachmark: function(cmIds, index) {
		let coachmarkData = cmApi.getCoachmark(+cmIds[index]);
		coachmarkData.then(function(result) {
			this.redirectIfNewUri(result.uri, cmIds, index);
			new Coachmark(document.getElementById(result.element), result.options, function(){this.closeCoachmarkReloadPage()}.bind(this));
		}.bind(this), function(error) {
			console.log('Error: ', error);
		});
	},

	// Closes the coachmark, resets the url, and reloads the page. Do this last!
	closeCoachmarkReloadPage: function() {
		console.log('Mark as READ in the API, reloading page.'); // TODO
		let newUri = this.removeQueryParams(window.location.href);
		console.log(newUri);
		window.location.href = newUri;
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
		currentUri = this.removeQueryParams(currentUri);
		// Redirect only if the target url and current url don't match
		if (uri === currentUri ) {
			return;
		}
		let qstart = (uri.includes('?') ? '&' : '?');
		uri = uri + qstart + 'cmIds=' + encodeURIComponent(cmIds) + '&cmIndex=' + index;
		window.location.href = uri;
	},

	removeQueryParams: function(uri) {
		let params = ['cmIds', 'cmIndex'];
		for (var i = 0; i < params.length; i++) {
			let param = params[i];
			let reg = new RegExp( '([?&]' + param + '=[^&#]*)', 'i' );
			if (uri && uri.includes(param)) {
				uri = uri.replace(reg, '');
			}
		}
		return uri;
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

	parseQueryParams: function(field, url) {
		var href = url ? url : window.location.href;
		var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
		var string = reg.exec(href);
		return string ? string[1] : null;
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

import xhr from 'o-xhr';

function CoachmarkApi(config) {
	let url = config.cmApiUrl;
	let xAuth = config.cmPiToken;
	let acceptHeader = config.cmAcceptHeader;
	let contentType = config.cmContentTypeHeader;

	this.getCoachmark = function(cmId) {

		let responseIs = new Promise(function(resolve, reject) {
			console.log('xAuth: ', xAuth);

			xhr({
				url: url + '/coachmark/' + cmId,
				headers: {
					'X-Authorization': xAuth,
					'Accept': acceptHeader,
					'Content-Type': contentType
				},
				onSuccess: function(request) {
					resolve(parseResponse(request.responseText));
				},
				onError: function(request) {
					console.log('onError: ', request);
					reject(request.responseText || new Error('Network Error: ', request));
				}
			});
		});
		console.log('Response: ', responseIs);
		return responseIs;
	};

	 function parseResponse(response) {
		let userNotifications = JSON.parse(response)._embedded.usernotifications;
		let userNotificationsList = userNotifications.filter((notification) => {
			return (notification.hasOwnProperty('notificationType') && notification.notificationType === 'inbrowser');
		}).map((notification) => {
			return JSON.parse(notification.payload.message);
		});
		return userNotificationsList;
	}
}

/**
 * Singleton
 **/
module.exports = (function() {
	var instance;

	function createInstance(config) {
		if (!config) {
			throw new Error('Config is required when initializing this singleton, yet none was provided.');
		}
		var object = new CoachmarkApi(config);
		return object;
	}

	return {
		getInstance: function(config) {
			if (!instance) {
				instance = createInstance(config);
			}
			return instance;
		}
	};

})();

import xhr from 'o-xhr';

function FeedbackApi(config) {
	let url = config.fbApiUrl;
	let xAuth = config.fbPiToken;
	let acceptHeader = config.fbAcceptHeader;
	let contentType = config.fbContentTypeHeader;

	this.likeCmSeries = function(notificationId, likeDislike) {
		console.log('STUB: feedbackApi.likeCmSeries for notificationId: ' +  notificationId + ', ' + likeDislike); // TODO
	};

	this.submitFeedback = function(notificationId, feedback) {
		console.log('STUB: feedbackApi.submitFeedback for notificationId: ' + notificationId + ' Feedback: ' + feedback); // TODO
	};
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
		var object = new FeedbackApi(config);
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

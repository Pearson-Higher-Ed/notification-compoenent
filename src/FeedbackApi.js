import xhr from './xhr';

module.exports = function FeedbackApi(config) {
	let url = config.fbApiUrl;
	let xAuth = config.fbPiToken;
	let acceptHeader = config.fbAcceptHeader;
	let contentType = config.fbContentTypeHeader;

	this.likeCmSeries = function(notificationId, likeDislike) {
		let response = new Promise(function(resolve, reject) {
			console.log('STUB: feedbackApi.likeCmSeries for notificationId: ' +  notificationId + ', ' + likeDislike); // TODO
		});
		return response;
	};

	this.submitFeedback = function(notificationId, feedback) {
		let response = new Promise(function(resolve, reject) {
			console.log('STUB: feedbackApi.submitFeedback for notificationId: ' + notificationId + ' Feedback: ' + feedback); // TODO
		});
		return response;
	};
};

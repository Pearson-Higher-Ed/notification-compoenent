import xhr from './xhr';

module.exports = function FeedbackApi(config) {
	let url = config.fbApiUrl;
	let xAuth = config.fbPiToken;
	let acceptHeader = config.fbAcceptHeader;
	let contentType = config.fbContentTypeHeader;

	this.submitFeedback = function(masterpieceId, userId, targetUserRole, comment, likeDislike) {
		let response = new Promise(function(resolve, reject) {
			let payload = {
				masterpieceId: masterpieceId,
				userId: userId,
				groupAuthType: targetUserRole,
				comment: comment,
				like: (likeDislike === 'like' ? 'L' : 'D')
			};
			payload = JSON.stringify(payload);
			xhr({
				method: 'POST',
				url: url + '/feedback',
				headers: {
					'X-Authorization': xAuth,
					'Accept': acceptHeader,
					'Content-Type': contentType
				},
				data: payload,
				onSuccess: function(request) {
					resolve(request.responseText);
				},
				onError: function(request) {
					console.log('onError: ', request);
					reject(request.responseText || new Error('Network Error: ', request));
				}
			});
		});
		return response;
	};
};

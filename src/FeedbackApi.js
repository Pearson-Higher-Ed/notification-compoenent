
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
			let request = new Request(url + '/feedback', {
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify(payload),
				headers: {
					'X-Authorization': xAuth,
					'Content-Type': contentType
				}
			});
			fetch(request).then(function(response) {
				resolve(response);
			}).catch(function(error) {
				console.log('onError: ', error);
				reject(error);
			});
		});
		return response;
	};
};

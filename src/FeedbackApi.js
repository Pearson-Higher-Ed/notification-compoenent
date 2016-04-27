import 'whatwg-fetch';

export default class FeedbackApi {
	constructor(config) {
		this.url = config.fbApiUrl;
		this.xAuth = config.fbPiToken;
		this.acceptHeader = config.fbAcceptHeader;
		this.contentType = config.fbContentTypeHeader;
	}
	
	submitFeedback(masterpieceId, userId, targetUserRole, comment, likeDislike) {
		let response = new Promise((resolve, reject) => {
			let payload = {
				masterpieceId: masterpieceId,
				userId: userId,
				groupAuthType: targetUserRole,
				comment: comment,
				like: (likeDislike === 'like' ? 'L' : 'D')
			};
			let request = new Request(this.url + '/feedback', {
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify(payload),
				headers: {
					'X-Authorization': this.xAuth,
					'Content-Type': this.contentType
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
	}
}

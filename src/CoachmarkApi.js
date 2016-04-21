
module.exports = function CoachmarkApi(config) {
	let url = config.cmApiUrl;
	let xAuth = config.cmPiToken;
	let contentType = config.cmContentTypeHeader;

	/**
	 * Gets a coachmark by id
	 **/
	this.getCoachmark = function(cmId) {
		let response = new Promise(function(resolve, reject) {
			let request = new Request(url + '/coachmark/' + cmId, {
				method: 'GET',
				mode: 'cors',
				headers: {
					'X-Authorization': xAuth,
					'Content-Type': contentType
				}
			});
			fetch(request).then(function(response) {
				return response.json();
			}).then(function(coachmark) {
				if (!coachmark.options.id) {
					coachmark.options.id = cmId;
				}
				resolve(coachmark);
			}).catch(function(error) {
				console.log('onError: ', error);
				reject(error);
			});
		});
		return response;
	};

	/**
	 * Tracks how many times a coachmark has been viewed
	 **/
	this.incrementViewCount = function(cmId) {
		let response = new Promise(function(resolve, reject) {
			let request = new Request(url + '/coachmark/' + cmId + '/increment', {
				method: 'PUT',
				mode: 'cors',
				headers: new Headers({
					'X-Authorization': xAuth,
					'Content-Type': contentType
				})
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

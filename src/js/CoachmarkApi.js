import 'whatwg-fetch';

export default class CoachmarkApi {

	constructor(config) {
		this.url = config.cmApiUrl;
		this.auth = config.cmPiToken;
		this.contentType = config.cmContentTypeHeader;
	}


	/**
	 * Gets a coachmark by id
	 **/
	getCoachmark(cmId) {
		let response = new Promise((resolve, reject) => {
			let request = new Request(this.url + '/coachmark/' + cmId, {
				method: 'GET',
				mode: 'cors',
				headers: {
					'X-Authorization': this.xAuth,
					'Content-Type': this.contentType
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
	}

	/**
	 * Tracks how many times a coachmark has been viewed
	 **/
	incrementViewCount(cmId) {
		let response = new Promise((resolve, reject) => {
			let request = new Request(this.url + '/coachmark/' + cmId + '/increment', {
				method: 'PUT',
				mode: 'cors',
				headers: new Headers({
					'X-Authorization': this.xAuth,
					'Content-Type': this.contentType
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
	}
}

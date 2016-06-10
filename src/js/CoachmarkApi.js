import 'whatwg-fetch';

export default class CoachmarkApi {

	constructor(config) {
		this.url = config.cmApiUrl;
		this.xAuth = config.cmPiToken;
		this.contentType = config.cmContentTypeHeader;
	}


	/**
	 * Gets a coachmark by id
	 **/
	getCoachmark(cmId) {
		const request = new Request(this.url + '/coachmark/' + cmId, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'X-Authorization': this.xAuth,
				'Content-Type': this.contentType
			}
		});
		return new Promise((resolve, reject) => {
			fetch(request)
				.then((response) => {
					return response.ok ? resolve(response.json()) : reject(Error(`GET ${response.url} ${response.statusText} (${response.status})`));
				})
				.catch((error) => {
					return reject(Error(error));
				});
		});
	}

	/**
	 * Tracks how many times a coachmark has been viewed
	 **/
	incrementViewCount(cmId) {
		const request = new Request(this.url + '/coachmark/' + cmId + '/increment', {
			method: 'PUT',
			mode: 'cors',
			headers: new Headers({
				'X-Authorization': this.xAuth,
				'Content-Type': this.contentType
			})
		});
		return new Promise((resolve, reject) => {
			fetch(request)
				.then((response) => {
				return response.ok ? resolve(response) : reject(Error(`PUT ${response.url} ${response.statusText} (${response.status})`));
			}).catch(function(error) {
				return reject(Error(error));
			});
		});
	}
}

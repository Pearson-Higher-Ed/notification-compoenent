module.exports = function() {
	this.getNotifications = function(config) {
		let responseIs = null;
		responseIs = new Promise(function(resolve, reject) {
			var req = new XMLHttpRequest();
			req.open('GET', 'https://notifications-api.stg-prsn.com/usernotifications/recipientid/ffffffff5627a777e4b010809dff5781');
			req.setRequestHeader('X-Authorization', 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NTQxMDUxMzgsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiYjcyZDY3NGI2M2I5NDIxYmFiMGNkMWJiMGIzOTNiY2QiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NTQwOTQzMzd9.QHCyvc8ZAlXzYUbPGlyIy5GXpYktqV0YaTLkKNQ5zUxX00n91rUhmpFeKuscnyH6Njrajnojx4WezdLvtFwf8kfO8_BGDEPyVFl-cFhVeiFGKEgLQUHiUJgehbv_ubcSCni-ifcXKAdNdrX7alolPhzrOd95pGj13YGivHrBBBw');
			req.setRequestHeader('Accept', '*/*');
			req.setRequestHeader('Content-Type', 'application/json');
			req.onload = function() {
				// This is called even on 404 etc
				// so check the status
				if (req.status == 200) {
					// Resolve the promise with the response text
					resolve(req.response);
				} else {
					// Otherwise reject with the status text
					// which will hopefully be a meaningful error
					reject(Error(req.statusText));
				}
			};

			// Handle network errors
			req.onerror = function() {
				reject(Error("Network Error"));
			};

			// Make the request
			req.send();
		});
		return responseIs;
	}
};
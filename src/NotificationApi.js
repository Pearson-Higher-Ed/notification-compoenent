import xhr from 'o-xhr';
module.exports = function() {
	this.getNotifications = function(headerConfig) {
		let responseIs = new Promise(function(resolve, reject) {
			xhr({
				url: `${headerConfig.nfUrl}/${headerConfig.nfRecipientId}`,
				headers: {
					'X-Authorization': headerConfig.nfPiToken,
					'Accept': headerConfig.nfAcceptHeader,
					'Content-Type': headerConfig.nfContentTypeHeader
				},
				onSuccess: function(request) {
					resolve(parseResponse(request.responseText));
				},
				onError: function(request) {
					console.log(request.responseText);
					reject(request.responseText || new Error('Network Error'));
				}
			});
		});
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
};

var xhr = require("o-xhr");


module.exports = function(config) {
	this.getNotifications = function(application) {
		let async = new Promise(function(resolve, reject) {
			setTimeout(function() {
				resolve({"_links":{"self":{"href":"https://notifications-api.stg-prsn.com/usernotifications/recipientid/ffffffff5644fb1be4b055212c8ffa3c"}},"_embedded":{"usernotifications":[{"_links":{"self":{"href":"https://notifications-api.stg-prsn.com/usernotifications/66e4fc4e-8672-4464-8c1e-ba91e0bbcc95"}},"notificationType":"aggregation","recipientId":"ffffffff5644fb1be4b055212c8ffa3c","eventModel":[{"testevent0608":{"gk":{"ak":{"firstName":"testuser"}}}},{"testevent0608":{"gk":{"ak":{"firstName":"testuser"}}}}],"templateId":"5156fe22-b629-4dd0-aa10-5cae26555fea","eventId":"3ad998e1-1627-4088-9856-6d9f26183cdb","isRead":false,"payload":{"body":"&lt;p&gt;Hi There!&lt;/p&gt;&lt;table&gt;  &lt;/table&gt;&lt;p&gt;Hi There!&lt;/p&gt;&lt;table&gt;  &lt;/table&gt;","subject":"Hi There!"},"id":"66e4fc4e-8672-4464-8c1e-ba91e0bbcc95","createdAt":"2016-01-11T17:58:13.989Z","updatedAt":"2016-01-11T17:58:13.989Z"}]}});
			}, 2000);
		});

		return async;
	}
};
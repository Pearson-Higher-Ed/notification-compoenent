'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = '<token>';

const AppHeaderConfig = {
	// NotificationAPI
	nfApiUrl: '<notificationUrl>',
	nfContentTypeHeader: 'application/json',
	nfPiToken: pt,
	nfRecipientId: '<userId>',

	// CoachmarkAPI
	cmApiUrl: 'http://localhost:8080',
	cmContentTypeHeader: 'application/json',
	cmPiToken: pt,

	// FeedbackAPI
	fbApiUrl: 'http://localhost:8080',
	fbContentTypeHeader: 'application/json',
	fbPiToken: pt
};
function init() {

	// Demo eventing API
	document.body.dispatchEvent(new CustomEvent('o.InitNotificationComponent', {
			detail: {
				config: AppHeaderConfig,
				elementId: 'demo-target1'
			}
	 }));

}

window.onload = init;

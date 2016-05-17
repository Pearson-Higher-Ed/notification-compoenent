'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = '1.0|idm|idm|piid=ffffffff53da3cb3e4b0eaaddd576877&sessid=d503859d93ab438e96633018c3d57fcb|2016-05-17T00:02:06+00:00|2016-05-17T03:02:07+00:00|ca99655d648d162ddc2376d4bafb9ab8';

const AppHeaderConfig = {
	// NotificationAPI
	nfApiUrl: 'https://notifications-api.stg-prsn.com',
	nfContentTypeHeader: 'application/json',
	nfPiToken: pt,
	nfRecipientId: 'ffffffff560c1a1ee4b04ebf43118c60',

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

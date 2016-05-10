'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = '1.0|idm|idm|piid=ffffffff53da3cb3e4b0eaaddd576877&sessid=5570bbcb074b40f0a96fa614f42fa237|2016-05-10T19:58:08+00:00|2016-05-10T22:58:08+00:00|f40aff9f97c788c2d4b89001e6af4e1c';

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

	// Demo direct API
	// new NotificationComponent(
	// 		AppHeaderConfig,
	// 		'demo-target2'
	//  );

}

window.onload = init;

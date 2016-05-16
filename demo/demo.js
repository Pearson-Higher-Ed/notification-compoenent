'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = '1.0|idm|idm|piid=ffffffff53da3cb3e4b0eaaddd576877&sessid=beeaa30c981b41fbbb52dc3937006aa2|2016-05-11T19:09:18+00:00|2016-05-11T22:09:18+00:00|823b1d93bedb555b4a89f9807fe01b51';

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

'use strict';

import './demo.scss';
import NotificationComponent from '../main'; // for direct API usage

const pt = '<token>';

const AppHeaderConfig = {
	// NotificationAPI
	nfApiUrl: '<notificationUrl>',
	nfContentTypeHeader: 'application/json',
	nfPiToken: pt,
	nfRecipientId: '<userId>',
	rtdUrl: '<rtdUrl>',
	rtdProductType: '<rtdProductType>',
	// CoachmarkAPI
	cmApiUrl: '<coachmarkUrl>',
	cmContentTypeHeader: 'application/json',
	cmPiToken: pt,

	// FeedbackAPI
	fbApiUrl: '<feedbackUrl>',
	fbContentTypeHeader: 'application/json',
	fbPiToken: pt
};
function init() {

	// Demo eventing API
	document.body.dispatchEvent(new CustomEvent('o.InitNotificationComponent', {
			detail: {
				config: AppHeaderConfig,
				element: document.getElementById('demo-target1')
			}
	 }));

}

window.onload = init;

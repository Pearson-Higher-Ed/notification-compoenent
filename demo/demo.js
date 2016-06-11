'use strict';

import './demo.scss';
import NotificationComponent from '../main'; // for direct API usage
import AppHeader from '@pearson-components/app-header/main'; // for integrating inside the app header

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
	new AppHeader(document.body); // instantiate app header only if it is not already instantiated
	const appHeaderNotificationDiv = document.getElementsByClassName('o-app-header__nav-item-notification');
	if (appHeaderNotificationDiv.length) {
		document.body.dispatchEvent(new CustomEvent('o.InitNotificationComponent', {
			detail: {
				config: AppHeaderConfig,
				element: appHeaderNotificationDiv[0]
			}
		}))
	}

}

window.onload = init;

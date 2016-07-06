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
	fbPiToken: pt,

	//If the notification bell is part of the app-header set the below flag to true
	bellInsideAppHeaderFlag: true,
	
	appHeaderClientHeight:'54px',
	notificationListDomHeight:'582px' // NotificationListHeight need to add this for scroll height when there is a long list of notifications 
									 // Ex:notificationListDomHeight:618px for appHeaderClientHeight:44px  and notificationListDomHeight:610px for appHeaderClientHeight:54px  
};
function init() {

	// Demo eventing API
	new AppHeader(document.body); // instantiate app header only if it is not already instantiated
	const appHeaderNotificationDiv = document.getElementsByClassName('o-app-header__nav-item-notification');
	const appHeaderElement = document.getElementsByClassName('o-app-header o-header o-header--fixed')
	const appHeaderClientHeight = (appHeaderElement && appHeaderElement[0] && appHeaderElement[0].clientHeight) ? appHeaderElement[0].clientHeight+'px' : '54px';
	AppHeaderConfig.appHeaderClientHeight = appHeaderClientHeight; // need to do this jusst to make sure we get proper height of the appheader
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

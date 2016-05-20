'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjM3NzI5MTksInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiODM2NmJjNWJjYjBhNDE3MGE4ZmNlOTdmOGU3OWFhNjgiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjM3NjIxMTl9.hJC_0RLx3YGTBp1jksDCNuKteu11KZ4bs39n7Ch3ZS_bXytuiVMLps_q5IH61zge4vQKp6GaEcbN8LNKJsYzVwsAh3qgFlMsvlN2rpoZy77FRRRT7r7CLt7kOA_4Xm-fXaGNSRvQQlFt09WC-RZvklH_i_WJv0O1xI3PSv3CURE';

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

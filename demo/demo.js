'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjQyMDIzMDgsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiZWZiY2EzNWJmNmZjNDQ3NmJlZjgwNmFlMjc5ZTMxYzUiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjQxOTE1MDd9.Br6C0rzLDiPW2LKd_t9Z1LMupe8b7sF7_-1ufhE8VrRzb4vVyKP7XZu8NyADUIrV8W0Nr3NTsJqEurWH451lEbPDXT_JQ-j-G-8LyMD0X8bKzD4wIBSN8UZC9V-4cQxC0ywAsBIfmWeuYdojbB-ThO9qyzzLxnmQ-AlqvFBCCbM';

const AppHeaderConfig = {
	// NotificationAPI
	nfApiUrl: 'https://notifications-api.stg-prsn.com',
	nfContentTypeHeader: 'application/json',
	nfPiToken: pt,
	nfRecipientId: 'ffffffff560c1a1ee4b04ebf43118c60',

	// CoachmarkAPI
	cmApiUrl: 'https://feedback-api.stg-prsn.com',
	cmContentTypeHeader: 'application/json',
	cmPiToken: pt,

	// FeedbackAPI
	fbApiUrl: 'https://feedback-api.stg-prsn.com',
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

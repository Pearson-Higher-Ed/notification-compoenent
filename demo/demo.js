'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjM3NzY1NjUsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiZGNmOTljOTBlYTJkNDI3YWE2YzE1NjNmODJkYzBkMmYiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjM3NjU3NjR9.BpDvRUCbiH1nrAnPRB6dXWPiydwXEI1BXz4AZq2FRggjOtKakuvxGGF9PcXXM6GXqQLFW9SwpSdC0_1ZPc56i0Kui9vMqPGxWOSzR-9KfUWhVuc6g8NuM-dMH1CJNKTe-HSqFkuuMMo22Mv1fZYXarGW4reaMOKp054381ZwMiA';

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

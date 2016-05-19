'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjM3MDUyMDQsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiOTZmYzkzYzUzMzE4NDhmNGEzODM2NjgzZDNmYmRlNjYiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjM2OTQ0MDN9.IxQ9rLOdE2we-iVRaw6nnjE6tTeKJEsw6jpT-lN2oBbdsvYAhlWYnqHHMRbFOqgBV0xKlue8MEzm7lStznPewNEjtWjezVpwjjgVSVkm31PJ524fY_7E9Nq6NtIyo77-bG3AJcSG7WmoLct7gVchcc--EypsAm_BPOY451wxFns';

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

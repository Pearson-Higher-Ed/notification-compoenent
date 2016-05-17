'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjM1MzE0ODQsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiNWM5YTA5YzgyYWUwNDQxYWFiNzg4ZTgxZDJjOTgyOGQiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjM1MjA2ODR9.DIDM1nIG8vrSzYYkzqDpkz8dEttxxEc5gNbgWi2yp9Z8NbXVRbl0nSuusMYWf2rslu2J4IjyTXUPHitIT-vpjK0H4BG2hIb1XqOd-AsqVIXn8yEfFB1xe-Ko-SASunN0y2ovme07vQpOAmft10Eb6Qd3EnmC-OLJQ0Hmjg6-COM';

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

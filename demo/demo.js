'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjM3NTY5MjIsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiNjZlNDEyZDAyMzYwNGZjZGI2ZTUwYjg1MzNiMWZiNWIiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjM3NDYxMjJ9.A388vM0IRcQmr1SjlFIyEcV33fe7hNWR5gNnJg3mlMobfDowUI6QORIF8gGIjM6dUFA6Mp9dN2_ESWumM33p1y2YrOcFolw1rDw0E0C8DNUhSTifyhRBmKUf3Jd1SsDIBq4jO_6FNiF0hWn6L9JmZTf7KbOdUc7tQ3P1IRlu9S0';

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

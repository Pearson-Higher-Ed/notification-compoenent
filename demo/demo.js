'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjM1MjM2ODIsInN1YiI6ImZmZmZmZmZmNTMzZWRlNGRlNGIwNmVmNjQ5NGM5MGI1Iiwic2Vzc2lkIjoiOGUyMDE5NTM5ZGY1NDA1OWI2MTY2N2E2NzU2ZjdkNTYiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjM1MTI4ODJ9.BRUqr4pIYNKHV7eNglZcAfHTzJAyBk9jNxLHe1iOWQVB8rtj2ALQoNX8GzY694zG2pwmU3AsPKP7olBC29F20uKu6Fbn3iS6kqDzXx0cGNfLbNQGwIMvgVJ3D3VTqDjW7lwtxs34fF15s5_EZHi1Td5134Sjc03uAnfnkgzP1MU';

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

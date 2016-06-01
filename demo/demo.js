'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjQ4MDQ3NjcsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiNWZmYjMyMjFjYzg1NDE1ZjlkMjRkOTIxYzRkZWM0OTEiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjQ3OTM5Njd9.WqjT7XJ8d0Nwh4G6qVFFtaYgGU_396liqM0a4-g830booOmM7EWXbdg11cA96mftQSOnsgiTttqRYHkK5eS88PHUThYBzsVINqyOuWkx2T2YFUiviAyczljDtoeKEuQV17IebNn8H1LDdt8DF2zy86htnuf-yJLhK0saQCWtV_M';

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
				element: document.getElementById('demo-target1')
			}
	 }));

}

window.onload = init;

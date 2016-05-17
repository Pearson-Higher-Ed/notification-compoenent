'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjM1MjQ5NzMsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiYTdmMTUzZWU1NDAxNGZmOWFhNWI3MWI1MzA2ZDhjMWIiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjM1MTQxNzN9.JIKkQrGcPCWBszL6abnD_W7UQ_oJogjtzTmK4OqKS3a6kA4pkf3KZ-nasMS_GI5pzUu2-cXC5csbrtTndUWipzBqCS5Otgrirn86uyXUdFLksOUwBok-1NpMKmLJlCVEQ4W2qujjFbAVqiQRa62_eRwdiP3GUZKuNhgsa1-ZbhU';

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

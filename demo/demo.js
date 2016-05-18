'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjM1NDU1NjQsInN1YiI6ImZmZmZmZmZmNTMzZWRlNGRlNGIwNmVmNjQ5NGM5MGI1Iiwic2Vzc2lkIjoiZTkyNmEyOWFiMTNkNDQ4NjhjOWY0MzA1MDcxNjM5NmIiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjM1MzQ3NjN9.LTZnnV8m2kfx5aUy44TKa_LgtOFktwJhNymKdlXvnEDPWrjsTaW58dVYw0jPIyI9WFB8V7pDzhXagJYPkZjWfJFsgNTEeUw6OKZU3T19HQnEmRhnkMj4022ChG_PMf_CAgrWP9mQ2YzpHB7jBuaE5OShxZHjkHFix43zvgWIp1o';

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

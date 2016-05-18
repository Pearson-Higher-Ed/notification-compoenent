'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjM1MjEwMTcsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiNGI0OTU4MDdmOGViNGIzNWE4MjVmMzQ3NDk3ZDU4MWUiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjM1MTAyMTZ9.AORxIHT2YA4ZC13bcjvcU19lHiN7WkKARpU2Y__dKzc6INCPmQUhoqgn-bEEWc2ciyrhlnOAzmF6FvIt5n78Q7v1BW6uiab-WtkmthmGILyvVvrEXzPkzKsRhYmTAm7VkRgn0Sai7L2X4L7Dy4C71gEmTJFIC87ULEWfNL_uZuM';

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

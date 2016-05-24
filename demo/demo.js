'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjQxMTQzMjEsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiOGMxMTU1MTc2Njg5NDM5N2I3ODU1NThhYWEyY2E5YTciLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjQxMDM1MjB9.DOe0g1oGfXTF41Wky3FlOQ7wUpGpH83ZgEDPquvhtxWLKzMmhx25pgfq9lxfZ7eSD5ibt91Mpr9tMz42EeehvQbj1OShDPxNhLMl0q6-c6aj2cxHt3HlTidu7igHkxNkBaF7J27QO1S9NdDl1s2D08LtnXX3UkYWmPFRl06bfbQ';

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

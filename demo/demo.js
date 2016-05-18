'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjM2MDQzMjUsInN1YiI6ImZmZmZmZmZmNTMzZWRlNGRlNGIwNmVmNjQ5NGM5MGI1Iiwic2Vzc2lkIjoiYTE1NzUzZGQ0NDViNDBlYWFiNzEwNjM1ODcyNmU2MWQiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjM1OTM1MjV9.YBVugKACjrf9YcZF-25IgEmU8R45uIgy5PIqFQdMEQLIbcGsK4WC_8GIFdcQL20LKoZ32cxAZPHsjaOVBejXKLffx0bMDzgRPtw_PGHbhkpqQdGQ3rVRzuw0w24SwjzUeC9RecTLMnTzBEHTLQQWvBMnsxBGH6Fbxg9oCNd7_lk';

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

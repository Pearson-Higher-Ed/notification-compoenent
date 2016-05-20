'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjM3ODM3NzksInN1YiI6ImZmZmZmZmZmNTMzZWRlNGRlNGIwNmVmNjQ5NGM5MGI1Iiwic2Vzc2lkIjoiYTQwYTRmZDJjZTlmNDE5ZDhmNzk3MjUxYzI5YWNiNzciLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjM3NzI5Nzh9.bnmVahRwOl_GVVIGmGyyK5Af1ShmdrF2f2va0_r0yp76RyvdFSRXKVN3ztRNTuSUdNccljfrcKf-j52v-wcGLPDTlbSFVp7pNYFFtyI-m6bAsO760oN4pKx9TGBoD9obWUoeV2zEMEVka77fxhVSYwzyoEVOtsRHMfDMy0v_og8';

const AppHeaderConfig = {
	// NotificationAPI
	nfApiUrl: 'https://notifications-api.stg-prsn.com',
	nfContentTypeHeader: 'application/json',
	nfPiToken: pt,
	nfRecipientId: 'ffffffff5482258ce4b05a12806d3b14',

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

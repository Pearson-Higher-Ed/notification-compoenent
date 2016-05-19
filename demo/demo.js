'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjM2OTQzMjksInN1YiI6ImZmZmZmZmZmNTMzZWRlNGRlNGIwNmVmNjQ5NGM5MGI1Iiwic2Vzc2lkIjoiOWMzZjgxM2UxZmFlNDgyODk2NjI5NzAxN2I4NTA3MTkiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjM2ODM1Mjh9.LemJJ450TNi_w328JxWWrr2jbU6ndWJe9xqdRusVACQIxrgDmYfbQCvSaeG3qN7pf93IGXjK99Bu5VPEZgxIpBp5D6a4qarNDn3an2W2intlTr4zKJyb6epmT_V3NzVtXlHS79CKFgPH9Xywrgqk3RnAYuZeVpjki0sM8_iycDM';

const AppHeaderConfig = {
	// NotificationAPI
	nfApiUrl: 'https://notifications-api.stg-prsn.com',
	nfContentTypeHeader: 'application/json',
	nfPiToken: pt,
	nfRecipientId: 'ffffffff560c1a1ee4b04ebf43118c60',
	//ffffffff53a840c2e4b07ba3e2a74458

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

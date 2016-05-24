'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjQxMjczMzgsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiMGFlYjg2NTNhOGQ4NGU4MmIzODJmZDE0NmQ1YjIyNDAiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjQxMTY1Mzd9.LTRwis0rXGNCM9e5V08dxTKYa-5zzlRT5OA-y5DAnuJpfJLbeSafJdPOJ59Q5LBVzAejZos6EqOpU-0h780GKc9Za0qbmpC08f9kgAag7fPZ8dyd3sBL4qoJxSiqlR-mkzcN509TTCTmH1rYum94i3BU4FzFdF1izFTYDan5pyY';

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

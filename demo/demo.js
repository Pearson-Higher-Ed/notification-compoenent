'use strict';

import NotificationComponent from '../main'; // for direct API usage

let pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjE4NjQ3NTQsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiODAxNzgzMDM5MTE0NDM5NDgwMTc5MzFjZTRlZDk4ODgiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjE4NTM5NTN9.hBEA12RJ6ckn5WcaFkbPlkQhS4z3b3Uf7LctPZQCMfNl0jup3aEjRB70pyE2GjaEeahAuwGwroY4fFy0r1HzqJOlnE4JJKQuryvNYpQyNF6EkduYF1BZ6eeLuST-mau_ZmohPwrDmaiRNCl0NZbw_6oTXBukvIcuzF8H9QGs-Aw';

let AppHeaderConfig = {
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
	document.body.dispatchEvent(new CustomEvent('o.InitMyComponent', {
			detail: {
				config: AppHeaderConfig,
				elementId: 'demo-target1'
			}
	 }));

	// Demo direct API
	new NotificationComponent(
			AppHeaderConfig,
			'demo-target2'
	 );

}

window.onload = init;

'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjM1MzQ1MDAsInN1YiI6ImZmZmZmZmZmNTMzZWRlNGRlNGIwNmVmNjQ5NGM5MGI1Iiwic2Vzc2lkIjoiNzMwNTU0NzUzZTlmNDk1ZWIyZTA3NWM0OTZlZTExYTYiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjM1MjM2OTl9.Ob6RCDnoADikknSgIctSF00e09gpbikVf8LcVoVzjojAPBxmmWdOdMV2ImMCDxuLEsHYVRsgn_XXk50rn6Il_AL10cHMOG0OKNdBo1KJC33avWz4Knm14aerqimL5tf2MIPWRfDPhLMBz4rGA0HMbympUTui-w67fvn9qTcVnjI';

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

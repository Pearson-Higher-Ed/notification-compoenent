'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjM1OTU5ODQsInN1YiI6ImZmZmZmZmZmNTMzZWRlNGRlNGIwNmVmNjQ5NGM5MGI1Iiwic2Vzc2lkIjoiZWMyOTUwZTI3ODRhNDJmYWJmMWY4ZWQ2ZDIzZGUxNTkiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjM1ODUxODR9.NmZ8mmgvsncTTEyIlDFNurGVQEdakrFKjPNKLhXps3MqctJ7fEK-sSg_Zs4uub36p_rLoQR95s5GpfNRki6BTqMb1xh-DLVpbm0JICjft10lcJH7I6NllAiY4HgyH-TbxjL7_gVsk7vjzyetbyr-wpzBmcb_5XdCNhrTjUJI234';

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

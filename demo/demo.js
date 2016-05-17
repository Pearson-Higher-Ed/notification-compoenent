'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjM1MjA5MzYsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiOWNiYTIwYTg0NWU4NDJjNjk0NjA4ZDI1OTRmMzRjMTEiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjM1MTAxMzZ9.VnwKJzj8zl6vu8Vdnu7w9npK85Xu8G3z-q7xd5Hmno2MdebhTXMTQ6IsRtf3ykiTYibDLAvskr_3b3wjdovD1Oy7a3QXtYpmmQ4BG-A2CRYbYMMEoF_5xEN8RCQ_hV3vUlPjLhSxlQssFdIYN6y70J0NCVKvctdNv-4z0na81ZQ';

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

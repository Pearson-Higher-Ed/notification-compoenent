'use strict';

import './demo.scss';
import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjQwNDI1MDcsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiNzAwOWM5MmVhMDNhNDFjMzg2MzVlNTRkMmVmOWQ4OWIiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjQwMzE3MDZ9.CHlV5XVjLGd6p8tAOza_eWyTX4tfxV1tH4PfCnMxfATL6AUKXjohprVjqOazae8u5zA1tJL2h6AnmxhUNxLn_28L3bcBuK010VIR8I14DkWII1PeCQDzG8uUUSie8AyyCN-SC8d2YGiFE-kljY4FzC99z2tpWTwHHIk7k7s_aSk';

const AppHeaderConfig = {
	// NotificationAPI
	nfApiUrl: 'https://notifications-api.stg-prsn.com',
	nfContentTypeHeader: 'application/json',
	nfPiToken: pt,
	nfRecipientId: 'ffffffff560c1a1ee4b04ebf43118c60',

	// CoachmarkAPI
	cmApiUrl: 'https://feedback-api.stg-prsn.com',
	cmContentTypeHeader: 'application/json',
	cmPiToken: pt,

	// FeedbackAPI
	fbApiUrl: 'https://feedback-api.stg-prsn.com',
	fbContentTypeHeader: 'application/json',
	fbPiToken: pt
};
function init() {

	// Demo eventing API
	document.body.dispatchEvent(new CustomEvent('o.InitNotificationComponent', {
			detail: {
				config: AppHeaderConfig,
				element: document.getElementById('demo-target1')
			}
	 }));

}

window.onload = init;

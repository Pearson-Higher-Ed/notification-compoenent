'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjQzODAwMjksInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiYzk3MGRjZDdmN2FjNDhkZWFhOGYyZDYwMDNiMWM1ZDMiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjQzNjkyMjh9.Kn-Vwo-MPNv-cuQHnAZTOcSxVRgaUwEuobSXwIu_DIvlJ-Bk_2cXX2VMuT4_iVNSEII0gE05Ry3B-T1NgF1w37gtR6eox5ZzCFI_WP3LYEb62PKeVgcceAnGE296wpt4LicOb71YhBOG-f1esZeV6twuCg6vhye1huVURDGVpW4';

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
				element: document.getElementById('demo-target1')
			}
	 }));

}

window.onload = init;

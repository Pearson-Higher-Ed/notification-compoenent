
import DateParser from '../src/js/DateParser';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider ,addLocaleData } from 'react-intl';
import ReactDOM from 'react-dom';
import IntlPolyfill from 'intl';
import en from 'intl/locale-data/jsonp/en.js';
import i18n from '../translations/';


describe('DateParser', () => {
	beforeEach(function() {
		Intl.NumberFormat = IntlPolyfill.NumberFormat;
		Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
	})

	it('should display 10 minutes', () => {

		let now = new Date();
		let tenMinutesAgo = new Date(now.getTime() - 60000 * 10);

		let intlData = {
			locale: 'en-US',
			messages: i18n['en']
		};
		const minutesAgo = TestUtils.renderIntoDocument(
			<IntlProvider {...intlData}>
				{DateParser.getFormatDateString(tenMinutesAgo)}
			</IntlProvider>);
		expect(ReactDOM.findDOMNode(minutesAgo).textContent).toEqual('10 minutes ago');
	});

    it('should display 1 minute as Just Now', () => {
        let now = new Date();
		let minuteAgo = new Date(now.getTime() - 60000);

		let intlData = {
			locale: 'en-US',
			messages: i18n['en']
		};
		const justNow = TestUtils.renderIntoDocument(
			<IntlProvider {...intlData}>
				{DateParser.getFormatDateString(minuteAgo)}
			</IntlProvider>);
		expect(ReactDOM.findDOMNode(justNow).textContent).toEqual('Just Now');
    });

     it('should display Just Now', () => {
        let now = new Date();
		let minuteAgo = new Date(now.getTime());

		let intlData = {
			locale: 'en-US',
			messages: i18n['en']
		};
		const justNow = TestUtils.renderIntoDocument(
			<IntlProvider {...intlData}>
				{DateParser.getFormatDateString(minuteAgo)}
			</IntlProvider>);
		expect(ReactDOM.findDOMNode(justNow).textContent).toEqual('Just Now');
    });

    it('should display 1 hour', () => {
        let now = new Date();
		let oneHourAgo = new Date(now.getTime() - 600000 * 6);

		let intlData = {
			locale: 'en-US',
			messages: i18n['en']
		};
		const hourAgo = TestUtils.renderIntoDocument(
			<IntlProvider {...intlData}>
				{DateParser.getFormatDateString(oneHourAgo)}
			</IntlProvider>);
		expect(ReactDOM.findDOMNode(hourAgo).textContent).toEqual('1 hour ago');
    });

    it('should display 2 hours', () => {
        let now = new Date();
		let oneHourAgo = new Date(now.getTime() - 600000 * 12);

		let intlData = {
			locale: 'en-US',
			messages: i18n['en']
		};
		const hourAgo = TestUtils.renderIntoDocument(
			<IntlProvider {...intlData}>
				{DateParser.getFormatDateString(oneHourAgo)}
			</IntlProvider>);
		expect(ReactDOM.findDOMNode(hourAgo).textContent).toEqual('2 hours ago');
    });

    it('should display 1 day before', () => {
        let now = new Date();
		let oneHourAgo = new Date(now.getTime()-(24*60*60*1000));

		let intlData = {
			locale: 'en-US',
			messages: i18n['en']
		};
		const hourAgo = TestUtils.renderIntoDocument(
			<IntlProvider {...intlData}>
				{DateParser.getFormatDateString(oneHourAgo)}
			</IntlProvider>);
		expect(ReactDOM.findDOMNode(hourAgo).textContent).toMatch(/[a-zA-Z]{3},\s[a-zA-z]{3}\s\d{1,2},\s\d{4}/);
    });
});

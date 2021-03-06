import React from 'react';
import NotificationContainer from '../src/js/NotificationContainer';
import ReactTestUtils from 'react-addons-test-utils';
import IntlPolyfill from 'intl';
import { IntlProvider ,addLocaleData } from 'react-intl';
import en from 'intl/locale-data/jsonp/en.js';
import i18n from '../translations/';


describe('NotificationContainer', () => {
    let list = [{
        id: '1',
        link: 'console-stg.pearson.com:8080/account/manage/account',
        linkText:'Go to Profile Screen',
        icon: 'fa fa-cogs fa-2x',
        message: {
            title: 'title',
            body: 'body'
        }
    }];
    
     let archivedList = [{
        id: '2',
        title: 'Introducing Profile Options',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo urna at nisi dictum commodo. Curabitur placerat sapien id finibus facilisis. In non leo ultricies, aliquam massa vel, ornare orci. Curabitur sed diam aliquam, mollis velit sit amet, consectetur tellus. Vivamus accumsan, erat vel convallis sagittis, massa velit ornare est, rutrum luctus nulla felis quis lectus. Sed non accumsan nibh. Phasellus placerat odio euismod dui ultricies luctus. Curabitur quis elit efficitur, aliquam nisl feugiat, convallis erat. Sed dictum sem eu purus faucibus, nec convallis purus varius. Duis pretium commodo urna, vitae ullamcorper odio vestibulum non. In a diam pellentesque dui ornare pellentesque a eu ex. Morbi gravida diam id justo euismod, ac luctus nisl tempor. Integer elementum, dui a sollicitudin sollicitudin, quam ipsum blandit libero, nec bibendum nisl eros at velit. In hac habitasse platea dictumst. Vestibulum et ex id nisl iaculis volutpat eu eget eros. Quisque quis justo quis ipsum malesuada luctus. Mauris lobortis enim vitae sapien varius, at ultrices purus malesuada. Ut sed ante fringilla, vehicula felis ac, pellentesque ipsum. Aenean maximus augue massa, quis sodales nunc congue scelerisque. Phasellus euismod libero id lorem elementum dictum. Morbi gravida elit est. In facilisis, justo et sodales rhoncus, risus mauris ornare nisl, eu gravida est neque ut odio.',
        link: 'console-stg.pearson.com:8080/account/manage/account',
        linkText:'Go to Profile Screen',
        icon: 'fa fa-cogs fa-2x',
        message: {
            title: 'title',
            body: 'body'
        }
    }];

    let config = {
        // NotificationAPI
        nfApiUrl: 'https://notifications-api.stg-prsn.com',
        nfContentTypeHeader: 'application/json',
        nfRecipientId: 'ffffffff560c1a1ee4b04ebf43118c60',

        // CoachmarkAPI
        cmApiUrl: 'http://localhost:8080',
        cmContentTypeHeader: 'application/json',
        locale:'en',
        // FeedbackAPI
        fbApiUrl: 'http://localhost:8080',
        fbContentTypeHeader: 'application/json'
    };

    let container = null;
    let closeDrawerFunctionCalled,
        notifcationReadFunctionCalled,
        archiveNotificationFunctionCalled;
    // mocked close function...
    let closeDrawerFunction = function() {
        closeDrawerFunctionCalled = true;
    };
    let notificationRead = function() {
        notifcationReadFunctionCalled = true;
    };
    let archiveNotification = function() {
        archiveNotificationFunctionCalled = true;
    }
	function renderWithIntl(element) {
		let instance;
		let intlData = {
			locale: 'en',
			messages: i18n['en']
		};
		ReactTestUtils.renderIntoDocument(
			<IntlProvider {...intlData}>
				{React.cloneElement(element, {ref: (c) => instance = c.refs.wrappedInstance})}
			</IntlProvider>);

		return instance;
	}
    beforeEach(() => {
        Intl.NumberFormat = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
        closeDrawerFunctionCalled = false;
        notifcationReadFunctionCalled = false;
        archiveNotificationFunctionCalled = false;
        container = renderWithIntl(<NotificationContainer archiveNotification={archiveNotification} notificationRead={notificationRead} list={list} config={config} archivedList={archivedList} closeDrawer={closeDrawerFunction} />);
    });

    describe('showDetails', function() {
        it('should set displayDetails to true and publish event when not in archive mode', function() {
            let passedParam = {check: true, message: {title: 'test', body: 'body'}};
            container.showDetails(passedParam);
            expect(container.state.displayDetails).toBe(true);
            expect(container.state.notificationDetails).toBe(passedParam);
            expect(notifcationReadFunctionCalled).toBe(true);

        });
    });

    describe('showList', function() {
        it('should set displayDetails to false', function() {
            container.showList();
            expect(container.state.displayDetails).toBe(false);
        });
    });

    describe('goToArchiveList', function() {
        it('should set isArchive to true', function() {
            container.goToArchiveList();
            expect(container.state.isArchive).toBe(true);
        });
    });

    describe('showNonArchivedList', function() {
        it('should set isArchive to false', function() {
            container.showNonArchivedList();
            expect(container.state.isArchive).toBe(false);
        });
    });


    describe('appendArchiveList', function() {
        it('should verify if we get the archivedlist and newupdated notificationslist', function() {

            container.appendArchiveList({});

            expect(archiveNotificationFunctionCalled).toBe(true);
            expect(container.state.displayDetails).toBe(false);
        });
    });


});
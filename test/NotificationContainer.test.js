import React from 'react';
import NotificationContainer from '../src/js/NotificationContainer';
import ReactTestUtils from 'react-addons-test-utils';



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
    
    let config = {
        // NotificationAPI
        nfApiUrl: 'https://notifications-api.stg-prsn.com',
        nfContentTypeHeader: 'application/json',
        nfRecipientId: 'ffffffff560c1a1ee4b04ebf43118c60',

        // CoachmarkAPI
        cmApiUrl: 'http://localhost:8080',
        cmContentTypeHeader: 'application/json',

        // FeedbackAPI
        fbApiUrl: 'http://localhost:8080',
        fbContentTypeHeader: 'application/json'
    };

    let container = null;

    // mocked close function...
    let closeDrawerFunction = function() {
    };
    
    beforeEach(() => {
        container = ReactTestUtils.renderIntoDocument(<NotificationContainer list={list} config={config} closeDrawer={closeDrawerFunction} />);
    });

    describe('showDetails', function() {
        it('should set displayDetails to true and notification to the passed parameter', function() {
            let passedParam = {check: true, message: {title: 'test', body: 'body'}};
            container.showDetails(passedParam);
            expect(container.state.displayDetails).toBe(true);
            expect(container.state.notificationDetails).toBe(passedParam);
        });
    });

    describe('showList', function() {
        it('should set displayDetails to false', function() {
            container.showList();
            expect(container.state.displayDetails).toBe(false);
        });
    });
    
});
import React from 'react';
import NotificationComponent from '../main';
import ReactTestUtils from 'react-addons-test-utils';

describe('NotificationComponent', () => {
    
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


    describe('NotificationComponent', function() {
        it('closed drawer', function() {
            let functionCalled = false;
            NotificationComponent.__Rewire__('Drawer', function(config) {
                this.close = function(){ 
                    functionCalled = true;
                }
            });
            let notificationComponent = new NotificationComponent(config);
            notificationComponent.closeDrawer();

            expect(functionCalled).toBe(true);
            NotificationComponent.__ResetDependency__('Drawer');
        });
    });

    
});
import React from 'react';
import NotificationComponent from '../main';
import ReactTestUtils from 'react-addons-test-utils';


// These tests are kind of "hacky"  I'm mocking out a lot of things that should be able to "rewired" but isn't doing it 
// properly.  So i took a different approach at it.  They work, but i do not suggest testing anything insde of the constructor
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
        describe('closeDrawer', function() {
            it('should close drawer', function() {
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

        describe('toggleList', function() {
            let notificationComponent;
            let functionCalled;
            beforeEach(function() {
                functionCalled = false;

                NotificationComponent.__Rewire__('Drawer', function(config) {
                    this.toggle = function(){ 
                        functionCalled = true;
                    }
                });
                notificationComponent = new NotificationComponent(config);
            });

            it('should toggle the drawer', function() {
                
                notificationComponent.toggleList();

                expect(functionCalled).toBe(true);
            });

            it('should toggle the drawer and mark all items as viewed', function() {
                let forceUpdateCalled = false;
                notificationComponent.newNotifications = true;
                notificationComponent.notificationList = [{
                    status: 'CREATED',
                    id: 1
                }];
                // i'm mocking this out because it was never called.  This doesnt always work, it only works here because
                // i had made bellComponent be property of notificationComponent.  Otherwise i would have had to setup a Rewire
                notificationComponent.bellComponent = {
                    forceUpdate: function() {
                        forceUpdateCalled = true;
                    }
                };

                let markAsViewedCalled = false;
                notificationComponent.notApi = {
                    markAsViewed: function() {
                        markAsViewedCalled = true;
                        return Promise.resolve("");
                    }
                }

                notificationComponent.toggleList();

                expect(functionCalled).toBe(true);
                expect(forceUpdateCalled).toBe(true);
                expect(notificationComponent.newNotifications).toBe(false);
                expect(markAsViewedCalled).toBe(true);
            });

            afterEach(function() {
                NotificationComponent.__ResetDependency__('Drawer');
            });
        });
    });

    
});
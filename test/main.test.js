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

	let notificationComponent;
	let closeCalled, toggleCalled, bellComponentUpdateCalled, markAsViewedCalled, containerComponentUpdateCalled;
	beforeEach(function() {
		closeCalled = false;
		toggleCalled = false;
		bellComponentUpdateCalled = false;
		markAsViewedCalled = false;
		containerComponentUpdateCalled = false;

		NotificationComponent.__Rewire__('Drawer', function(config) {
			this.close = function(){ 
				closeCalled = true;
			};

			this.toggle = function() {
				toggleCalled = true;
			}
		});

		notificationComponent = new NotificationComponent(config);

		// override for testing purposes
		notificationComponent.bellComponent = {
			forceUpdate: function() {
				bellComponentUpdateCalled = true;
			}
		};

		// override for testing purposes
		notificationComponent.containerComponent = {
			forceUpdate: function() {
				containerComponentUpdateCalled = true;
			}
		};

		notificationComponent.notApi = {
			markAsViewed: function() {
				markAsViewedCalled = true;
				return Promise.resolve("");
			}
		}

		NotificationComponent.__ResetDependency__('Drawer');
	});

	afterEach(function() {
		NotificationComponent.__ResetDependency__('Drawer');
	});

	describe('NotificationComponent', function() {
		describe('closeDrawer', function() {
			it('should close drawer', function() {
				
				notificationComponent.closeDrawer();

				expect(closeCalled).toBe(true);
			});
		});

		describe('toggleList', function() {

			it('should toggle the drawer', function() {
				
				notificationComponent.toggleList();

				expect(toggleCalled).toBe(true);
			});

			it('should toggle the drawer and mark all items as viewed', function() {
				notificationComponent.newNotifications = true;
				notificationComponent.notificationList = [{
					status: 'CREATED',
					id: 1
				}];


				notificationComponent.toggleList();

				expect(toggleCalled).toBe(true);
				expect(bellComponentUpdateCalled).toBe(true);
				expect(notificationComponent.newNotifications).toBe(false);
				expect(markAsViewedCalled).toBe(true);
			});


		});

		describe('messageListener', function() {
			it('should add new message to list and update components', function() {
				const message = {
					title: "some message",
					payload: {
						userNotificationId: 1235,
						data: '{"some":"jsonObject"}'
					}
				};
				notificationComponent.notificationList = [];
				notificationComponent.unreadCount = 0;
				notificationComponent.newNotifications = false;

				notificationComponent._messageListener(message);

				expect(notificationComponent.notificationList.length).toBe(1);
				expect(notificationComponent.unreadCount).toBe(1);
				expect(notificationComponent.newNotifications).toBe(true);
				expect(bellComponentUpdateCalled).toBe(true);
				expect(containerComponentUpdateCalled).toBe(true);
			});
		});
	});

	
});
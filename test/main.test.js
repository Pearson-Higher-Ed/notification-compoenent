import React from 'react';
import NotificationComponent from '../main';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';


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
		locale:'en',
		// FeedbackAPI
		fbApiUrl: 'http://localhost:8080',
		fbContentTypeHeader: 'application/json'
	};

	let notificationComponent;
	let closeCalled, toggleCalled, markAsArchivedAndReadCalled, bellComponentUpdateCalled, markAsViewedCalled, 
		containerComponentUpdateCalled, markAsReadCalled;
	beforeEach(function() {
		closeCalled = false;
		toggleCalled = false;
		bellComponentUpdateCalled = false;
		markAsViewedCalled = false;
		containerComponentUpdateCalled = false;
		markAsReadCalled = false;
		markAsArchivedAndReadCalled = false;

		NotificationComponent.__Rewire__('Drawer', function(config) {
			this.close = function(){ 
				closeCalled = true;
			};

			this.toggle = function() {
				toggleCalled = true;
			}
		});

		notificationComponent = new NotificationComponent(config, document.createElement('div'));

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
			},
			markAsRead: function() {
				markAsReadCalled = true;
			},
			markAsArchivedAndRead: function() {
				markAsArchivedAndReadCalled = true;
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
					id: 1,
					message: {
						title: "blah"
					}
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

		describe('notificationRead', function() {
			
			it('should updateNotificationList and unreadCount and forceUpdate bell' , function() {
				let notification = {
					id: 1
				};
				notificationComponent.notificationList = [{
					id: 1, isRead: false
				}];
				notificationComponent.unreadCount = 1;
				notificationComponent.notificationRead(notification);

				expect(markAsReadCalled).toBe(true);
				expect(notificationComponent.notificationList[0].isRead).toBe(true);
				expect(notificationComponent.unreadCount).toBe(0);
				expect(bellComponentUpdateCalled).toBe(true);
			});
		});

		describe('archiveNotification', function() {
			it('should filter old notification out of list, markAsArchivedAndRead, update containerComponent and bellComponent', function() {

				notificationComponent.archivedNotificationList = [];
				notificationComponent.notificationList = [{id: 1, isRead: false}];
				notificationComponent.unreadCount = 1;
				notificationComponent.archiveNotification({id: 1, isRead: false});

				expect(markAsArchivedAndReadCalled).toBe(true);
				expect(containerComponentUpdateCalled).toBe(true);
				expect(bellComponentUpdateCalled).toBe(true);
				expect(notificationComponent.unreadCount).toBe(0);
				expect(notificationComponent.notificationList.length).toBe(0);
				expect(notificationComponent.archivedNotificationList.length).toBe(1);
			});
		});
	});

	
});
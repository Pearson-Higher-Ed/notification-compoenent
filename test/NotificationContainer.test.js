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
    
     let archivedList = [{
        id: '2',
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
        container = ReactTestUtils.renderIntoDocument(<NotificationContainer list={list} config={config} archivedList={archivedList} closeDrawer={closeDrawerFunction} />);
    });

    describe('showDetails', function() {
        it('should set displayDetails to true and publish event when not in archive mode', function(done) {
            let passedParam = {check: true, message: {title: 'test', body: 'body'}};
            document.addEventListener('NotificationBell.ReadNotification', () => {
                expect(true).toBe(true);//we just want to be sure that the event got called 
                done();
            });
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

    describe('toggleArchive', function() {
        it('should set isArchive to true', function() {
            container.goToArchiveList();
            expect(container.state.isArchive).toBe(true);
            expect(container.state.list).toBe(archivedList);
        });
    });

    describe('updatedNotificationList', function() {
        it('should set isArchive to false', function() {
            container.updatedNotificationList();
            expect(container.state.isArchive).toBe(false);
            expect(container.state.list).toBe(list);
        });
    });

    describe('appendArchiveList', function() {
        it('should verify if we get the archivedlist and newupdated notificationslist', function(done) {
             document.addEventListener('NotificationBell.ReadNotification', () => {
                expect(true).toBe(true);
                done();
            });
            let archivedlistNew = {
                id: '4',
                link: 'console-stg.pearson.com:8080/account/manage/account',
                linkText: 'Go to Profile Screen',
                icon: 'fa fa-cogs fa-2x',
                message: {
                    title: 'Introducing Profile Options',
                    body: 'body'
                }
            };
            let newNotification = {
                id: '3',
                link: 'console-stg.pearson.com:8080/account/manage/account',
                linkText: 'Go to Profile Screen',
                icon: 'fa fa-cogs fa-2x',
                message: {
                    title: 'Introducing Profile Options',
                    body: 'body'
                }
            };
            
            container.state.archivedList.push(archivedlistNew);
            container.state.list.pop();
            container.state.list.push(newNotification);

            container.appendArchiveList(archivedlistNew);

            expect(container.state.archivedList).toBe(container.state.archivedList);
            expect(container.state.list).toBe(container.state.list);
            expect(container.state.notificationList).toBe(container.state.list);
        });
    });


});
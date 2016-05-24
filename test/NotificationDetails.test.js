import React from 'react';
import NotificationDetails from '../src/js/NotificationDetails';
import ReactTestUtils from 'react-addons-test-utils';


// These tests are kind of "hacky"  I'm mocking out a lot of things that should be able to "rewired" but isn't doing it 
// properly.  So i took a different approach at it.  They work, but i do not suggest testing anything insde of the constructor
describe('NotificationDetails', () => {
    
     let list = [{
        id: '1',
        link: 'console-stg.pearson.com:8080/account/manage/account',
        linkText:'Go to Profile Screen',
        icon: 'fa fa-cogs fa-2x',
        message: {
            title: 'title',
            body: 'body',
            cmIds: '9'
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
            body: 'body',
            cmIds: '9'
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
    
    let appendArchiveList = function() {
    };
    beforeEach(() => {
        container = ReactTestUtils.renderIntoDocument( 
            this.props.notification.message.cmIds = '7';
            <NotificationDetails notification={list} closeDrawer={closeDrawerFunction} apiConfig={config} appendArchiveList={appendArchiveList}/>);
    });



        describe('archiveItem', function() {

            it('should toggle the drawer and mark all items as viewed', function() {
                 container.archiveItem();
                let markAsViewedCalled = false;
                container.notificationApi = {
                    markAsViewedOrArchived: function() {
                        markAsViewedCalled = true;
                        return Promise.resolve("");
                    }
                }
                console.log('markviewed'+markAsViewedCalled)
                expect(markAsViewedCalled).toBe(true);
            });

        
    });

    
});
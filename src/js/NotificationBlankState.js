import React from 'react';
import CoachmarkApi from './CoachmarkApi';
import FeedbackApi from './FeedbackApi';
import NotificationApi from './NotificationApi';

export default class NotificationBlankState extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {  
        
        if (!this.props.isArchivedTray) {
        return (
            <div className="notification-blank-page">
                <p> 
                <h2>Nothing Yet</h2>
                <br/>
                <h3>We’ll let you know when<br/>something comes up. Till then,<br/>find previous notifications in your
                    <br/><u> Archive.</u>
                </h3>
                </p>
            </div>
            );
         }

        if (this.props.blankArchivedNotification && this.props.clickedNotificationArchive) {
              return (
                <div className="notification-blank-page">
                    <p> 
                    <h2>Nothing Here</h2>
                    <br/><br/>
                    <h3>This is where you will see your<br/>archived notifications.</h3>
                    </p>
                </div>
            );
        }
        
    }
}

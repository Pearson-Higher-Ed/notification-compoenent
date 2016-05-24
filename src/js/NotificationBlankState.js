import React from 'react';
import CoachmarkApi from './CoachmarkApi';
import FeedbackApi from './FeedbackApi';
import NotificationApi from './NotificationApi';

export default class NotificationBlankState extends React.Component {

    constructor(props) {
        super(props);
    }

    archiveList() {
        this.props.goToArchiveList();
    }


    render() {  
        if (!this.props.isArchivedTray) {
            return (
                <div className="notification-blank-page">
                    <h2>Nothing Yet!</h2>
                    <br/>
                    <h3>We’ll let you know when<br/>something comes up. Till then,<br/>find previous notifications in your
                    <br/>
                    <a href="javascript:void(0);" onClick={this.archiveList.bind(this)}> Archive </a>
                    </h3>
                </div>
            );
         }
       
        return (
            <div className="notification-blank-page">
                <h2>Nothing Here!</h2>
                <br/>
                <h3>This is where you will see your<br/>archived notifications.</h3>
            </div>
        );  
    }
}

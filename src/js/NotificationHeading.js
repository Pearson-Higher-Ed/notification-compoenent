import React from 'react';
import CoachmarkApi from './CoachmarkApi';
import FeedbackApi from './FeedbackApi';
import NotificationApi from './NotificationApi';

export default class NotificationHeading extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isList) {
            return (
                <div>
                    <h1 className="notification-title--heading">
                        Notifications
                    </h1>
                </div>
            );
        } 

        if (!this.props.isList && !this.props.isDetails) {
            return (
                <div>
                    <h1 className="notification-title--heading">
                        Notifications Archive
                    </h1>
                </div>
            );
        }

        if (this.props.isDetails) {
            return (
                <div>
                    <h1 className="notification-title--heading" onClick={this.props.back}>
                        <a href="javascript:void(0);" className="notification-title--back">
                            <i className="pe-icon--chevron-left"></i> <span className="notification-title--back_align">Back to Notifications</span>
                        </a>
                    </h1>
                </div>
            );
        }
        
    }
}

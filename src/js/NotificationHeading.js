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

        if (this.props.isDetails) {
            return (
                <div>
                    <h1 className="notification-title--heading notification-title--back" onClick={this.props.back}>
                        &#60; Back to Notifications
                    </h1>
                </div>
            );
        }
        
    }
}

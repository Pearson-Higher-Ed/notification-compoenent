import React from 'react';
import NotificationList from './NotificationList';
import NotificationDetails from './NotificationDetails';
import NotificationHeading from './NotificationHeading';
import NotificationApi from './NotificationApi';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import NotificationIcon from './NotificationIcon';
const messages = defineMessages({
	goToNotificationArchive: {
		id: 'notification.footer',
		defaultMessage: 'Go to Notifications Archive'
	}
});
class NotificationContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isArchive: false,
			displayDetails: false,
			notificationDetails: {
				message: {}
			}
		};
		this.showDetails = this.showDetails.bind(this);
		this.showList = this.showList.bind(this);
		this.appendArchiveList = this.appendArchiveList.bind(this);
		this.goToArchiveList = this.goToArchiveList.bind(this);
		this.showNonArchivedList = this.showNonArchivedList.bind(this);
		this.resetListOnCloseDrawer = this.resetListOnCloseDrawer.bind(this);
	}

	showDetails(notification) {
		const state = {
			displayDetails: true,
			notificationDetails: notification
		};
		if(!this.state.isArchive && !notification.isRead) {
			this.props.notificationRead(notification);
		}
		this.refs.heading && this.refs.heading.focus();
		this.setState(state);
	}

	showList() {
		this.setState({
			displayDetails: false
		});
	}

	appendArchiveList(archivedNotification) {
		this.props.archiveNotification(archivedNotification);
		this.setState({
			displayDetails: false
		});
	}

	goToArchiveList() {
		this.refs.closeButton && this.refs.closeButton.focus();
		this.setState({
			isArchive: true
		});
	}

	showNonArchivedList() {
		this.setState({
			isArchive: false
		});
	}

	resetListOnCloseDrawer() {
		this.setState({
			displayDetails: false,
			isArchive: false,
			list: this.state.notificationList
		});
		this.props.closeDrawer();
	}

	hyphenateWords(sentence) {
		const maxLength = 12;
		if (typeof sentence !== 'string') {
			return sentence;
		}
		return sentence.split(' ').map((word) => {
			if (word.length <= maxLength) {
				return word;
			}
			const chunkCount = Math.floor(word.length / maxLength) + 1;
			const chunkSize = Math.round(word.length / chunkCount);

			let result = '';
			for (let spacer = '', i = 0; i < chunkCount; i++) {
				const chunkStart = i * chunkSize;
				const chunkEnd = (i + 1) * chunkSize;
				result += spacer + word.substring(chunkStart, chunkEnd);
				spacer = '\u00AD';
			}
			return result;
		}).join(' ');
	}

	render() {
		// this is super dumb because product wants things to "snap" to the bottom
		const contentHeight = {
			height: window.innerHeight - 175
		};
		const positionTop = {
			top: window.innerHeight - 175
		};
		return (
			<div aria-label="Notifications Menu" role="menuitem" className="notification-container">
				<div className="notifications--close">
					<button ref="closeButton" className="pe-icon--btn" aria-label="Close Notification" onClick={this.resetListOnCloseDrawer}>
						<NotificationIcon iconName="remove-sm-18" iconAltText="" />
					</button>
				</div>
				<div className="notification-title">
					<NotificationHeading back={this.showList} isList={!this.state.isArchive && !this.state.displayDetails}
					isDetails={this.state.displayDetails} isArchive={this.state.isArchive} archiveBack={this.showNonArchivedList} />
				</div>
				<div className="notification-content">
					<div className={!this.state.isArchive && !this.state.displayDetails ? 'transition-middle' : 'transition-middle transition-to-left notification-component--hide'}>
						<div className="content-list" style={contentHeight}>
							<NotificationList list={this.props.list} config={this.props.config} showDetails={this.showDetails} isError={this.props.apiError}
							appendArchiveList={this.appendArchiveList} isArchiveTray={false} goToArchiveList={this.goToArchiveList} hyphenateWords={this.hyphenateWords}/>
							<div className="notification-title bottom-archive" style={positionTop}>
								<div className="notification-title--heading1 center-align pe-label--large pe-label--bold">
									<a href="javascript:void(0);" onClick={this.goToArchiveList} className={this.state.isArchive ? 'notification-component--hide' : 'decoration-none'}> <FormattedMessage {...messages.goToNotificationArchive} /></a>
								</div>
							</div>
						</div>
					</div>
					<div className={this.state.isArchive && !this.state.displayDetails ? 'transition-middle': 'transition-middle transition-to-right notification-component--hide'}>
						<NotificationList list={this.props.archivedList} config={this.props.config} showDetails={this.showDetails} isError={this.props.apiError}
						 appendArchiveList={this.appendArchiveList} isArchiveTray={true} goToArchiveList={this.goToArchiveList} hyphenateWords={this.hyphenateWords}/>
					</div>
					<div className={this.state.displayDetails ? 'transition-middle' : 'transition-middle transition-to-right notification-component--hide'}>
						<NotificationDetails notification={this.state.notificationDetails} closeDrawer={this.props.closeDrawer} apiConfig={this.props.config} appendArchiveList={this.appendArchiveList}
						coachmarkListener={this.props.coachmarkListener} hyphenateWords={this.hyphenateWords}/>
					</div>
				</div>
				<div className="notifications--close">
					<button  className="pe-icon--btn" aria-label="Close Notification" onClick={this.resetListOnCloseDrawer}>
						<NotificationIcon iconName="remove-sm-18" iconAltText="" />
					</button>
				</div>
			</div>
		);
	}
}
export default injectIntl(NotificationContainer, {withRef: true});

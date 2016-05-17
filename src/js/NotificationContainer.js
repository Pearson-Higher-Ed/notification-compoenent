import React from 'react';
import NotificationList from './NotificationList';
import NotificationDetails from './NotificationDetails';
import NotificationHeading from './NotificationHeading';

export default class NotificationContainer extends React.Component {

	constructor(props) {
		super(props);
		console.log('contaier const'+props)
		this.state = {
			isArchive: false,
			displayDetails: false,
			archivedList:props.archivedList||[],
			notificationDetails: {message:{}},
			list:props.list
		};
	}

	showDetails(notification) {
		this.setState({
			displayDetails: true,
			notificationDetails: notification
		});
	}

	showList() {
		this.setState({
			displayDetails: false
		});
	}

	appendArchiveList(archivedNotif) {
       const newArchivedList = this.state.archivedList.slice();    
        newArchivedList.push(archivedNotif);  
        this.setState({ archivedList: newArchivedList });
    }

	toggleArchive() { 
        this.setState({ 
        	list: this.state.archivedList,
        	isArchive : true
        });
        console.log('list in toggle'+this.state.list)
	}

	render() {
		console.log('in render'+this.state.list);
		console.log('display details'+this.state.displayDetails)
		return (
			<div>
				<div className="notification-title">
					<NotificationHeading back={this.showList.bind(this)} isList={!this.state.isArchive && !this.state.displayDetails} 
					isDetails={this.state.displayDetails} />
					<i className="pe-icon--times close-dropdown pointer" onClick={this.props.closeDrawer}></i>
				</div>
				<div className={this.state.displayDetails ? 'hide' : ''}>
					<NotificationList list={this.state.list}  closeDrawer={this.props.closeDrawer} apiConfig={this.props.config} showDetails={this.showDetails.bind(this)}
					 appendArchiveList={this.appendArchiveList.bind(this)}/>
				</div>
				<div className={this.state.displayDetails ? '' : 'hide'}>
					<div className="notification-list">
						<NotificationDetails notification={this.state.notificationDetails} closeDrawer={this.props.closeDrawer} apiConfig={this.props.config}/>
					</div>
				</div>
				<div className="notification-title" onClick={this.toggleArchive.bind(this)}>
					<h1 className="notification-title--heading">
						 Notification Archive
					</h1>
		
				</div>	
			</div>
		);
	}
}

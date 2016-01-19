let React = require("react");
let NotificationList = require("./NotificationList");
let NotificationApi = require("./NotificationApi");
require("./style/notificationDropdown.scss");

module.exports = React.createClass({
	componentDidMount: function() {
		// get notification list
		let notApi = new NotificationApi(this.props.config);
		let userNotifications = notApi.getNotifications("console");

		userNotifications.then((result) => {
			console.log(result);
			this.setState({notificationList: result});

		}, function(error) {
			console.log(error);
		});
	},
	getInitialState: function() {
		return {
			showDropdown: false,
			notificationList: []
		};
	},
	closeDropdown : function() {
		this.setState({showDropdown: false});
	},
	toggle: function() {
		if(this.state.showDropdown) {
			this.setState({showDropdown: false});
			return;
		}
		this.setState({showDropdown: true});


	},
	render: function() {
		return (
			<div>
				<i className="fa fa-lg fa-bell pointer" onClick={this.toggle}></i>
				<div className={this.state.showDropdown ? "" : "hide"}>
					<div className="notification-dropdown">
						<div className="dropdown-title">
							Notifications
							<i className="fa fa-remove close-dropdown pointer" onClick={this.closeDropdown}></i>
						</div>
						<NotificationList />
					</div>
				</div>
			</div>
		);
	}
});
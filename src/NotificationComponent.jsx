let React = require("react");
let ReactDOM = require("react-dom");
let NotificationDropdown = require("./NotificationDropdown");
let NotificationApi = require("./NotificationApi");

function NotificationComponent(config) {
	
	let notApi = new NotificationApi();
	let userNotifications = notApi.getNotifications("console");

	userNotifications.then((result) => {
		this.reactComponent.setState({notificationList: result});
	}, function(error) {
		console.log(error);
	});
	
	this.reactClass = React.createClass({
		getInitialState: function() {
			return {
				notificationList: []
			}
		},
		render: function() {
			return (
				<div>
					<NotificationDropdown notificationList={this.state.notificationList}/>
				</div>
			);
		}
	});

	this.attachComponent = function(element) {
		if (!element) {
			throw new TypeError("missing required argument: element");
		}
		if (typeof element === "string") {
			element = document.querySelector(element);
		}
		if (!element) {
			throw new Error("Element could not be found");
		}
		this.reactComponent = ReactDOM.render(<this.reactClass/>, element);
	};

}


module.exports = (function() {
 	var instance;
 
    function createInstance(config) {
        var object = new NotificationComponent(config);
        return object;
    }
 
    return {
        getInstance: function (config) {
            if (!instance) {
                instance = createInstance(config);
            }
            return instance;
        }
    }; 
})();
let React = require("react");
let ReactDOM = require("react-dom");
let NotificationDropdown = require("./NotificationDropdown");
let NotificationApi = require("./NotificationApi");

/**
 *  NotificationComponent.  
 *  	NotificationComponent will get larger as it is in charge of making API calls for all of the notification-apis.  
 *  	To get an instance of it just create require the module inside your javascript file and call "getInstance" with configuration
 * 		as a parameter.  This component needs to make several api calls from places that could change, so we need to pass configuration
 *		into it.  
 */
function NotificationComponent(config) {
	
	//  Keep track of the parent react class
	this.reactClass = React.createClass({
		getInitialState: function() {
			return {
				notificationList: []
			}
		},
		componentDidMount: function() {
			let notApi = new NotificationApi();
			let userNotifications = notApi.getNotifications("console");

			userNotifications.then((result) => {
				this.setState({notificationList: result});
			}, function(error) {
				console.log(error);
			});
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
		//  We need the return of the render so that we can call the "setState" functino for when the promise comes back
		ReactDOM.render(<this.reactClass/>, element);
	};

}

/**
 * Singleton of notification component.
 */ 
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
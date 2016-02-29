let React = require("react");
let ReactDOM = require("react-dom");
let NotificationDropdown = require("./NotificationDropdown");
let NotificationApi = require("./NotificationApi");
let CoachmarkApi = require("./CoachmarkApi");
require("./style/main.scss");


/**
 *  NotificationComponent.
 *  	NotificationComponent will get larger as it is in charge of making API calls for all of the notification-apis.
 *  	To get an instance of it just create require the module inside your javascript file and call "getInstance" with configuration
 * 		as a parameter.  This component needs to make several api calls from places that could change, so we need to pass configuration
 *		into it.
 */
function NotificationComponent(config) {
	CoachmarkApi.getInstance(config);
	let notApi = new NotificationApi();
	let userNotifications = notApi.getNotifications(config);

	//this is only here because it is possible for promise to come back before the consumer has placed the react component into a dom
	this.notificationList = [];

	userNotifications.then((result) => {
        if (this.reactComponent) {
            this.reactComponent.setState({
                notificationList: result
            });
        } else {
            this.notificationList = result;
        }
    },
    function(error) {
        console.log(error);
    });

	//  Keep track of the parent react class
	var _this = this;//i'm not happy i need to do this....but it would be really complicated since i don't want to actually pass context down to the child except for the notificationList property.
	this.reactClass = React.createClass({
		getInitialState: function() {
			return {
				notificationList: _this.notificationList
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
		//  We need the return of the render so that we can call the "setState" functino for when the promise comes back
		this.reactComponent = ReactDOM.render(<this.reactClass/>, element);
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

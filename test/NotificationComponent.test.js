let NotificationComponent = require("../src/NotificationComponent");
let expect = require("expect.js");

describe("Notificationcomponent", () => {

	it("should initialize as singleton", () => {
		let notificationComponent = NotificationComponent.getInstance();
		let notificationComponent2 = NotificationComponent.getInstance();
		expect(notificationComponent).to.be(notificationComponent2);
	});

	it("should attach the NotificationDropdown to the element", () => {
		
	});	

});
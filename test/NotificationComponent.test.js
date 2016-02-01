let NotificationComponent = require("../src/NotificationComponent");
let expect = require("expect.js");

describe("Notificationcomponent", () => {
	let notificationComponent = null;
	beforeEach(() => {
		notificationComponent = NotificationComponent.getInstance();
	})

	it("should initialize as singleton", () => {
		let notificationComponent2 = NotificationComponent.getInstance();
		expect(notificationComponent).to.be(notificationComponent2);
	});

	it("should attach the NotificationDropdown to the element", () => {
		let element = document.createElement("div");
		notificationComponent.attachComponent(element);

		expect(element.childNodes.length).to.be.above(0);
	});	

});
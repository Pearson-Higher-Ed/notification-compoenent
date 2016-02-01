let NotificationList = require("../src/NotificationList");
let ReactTestUtils = require("react-addons-test-utils");
let expect = require("expect.js");
let React = require("react");

describe("Notificationcomponent", () => {
	let list = [{
		id: "1",
		title: "Introducing Profile Options",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo urna at nisi dictum commodo. Curabitur placerat sapien id finibus facilisis. In non leo ultricies, aliquam massa vel, ornare orci. Curabitur sed diam aliquam, mollis velit sit amet, consectetur tellus. Vivamus accumsan, erat vel convallis sagittis, massa velit ornare est, rutrum luctus nulla felis quis lectus. Sed non accumsan nibh. Phasellus placerat odio euismod dui ultricies luctus. Curabitur quis elit efficitur, aliquam nisl feugiat, convallis erat. Sed dictum sem eu purus faucibus, nec convallis purus varius. Duis pretium commodo urna, vitae ullamcorper odio vestibulum non. In a diam pellentesque dui ornare pellentesque a eu ex. Morbi gravida diam id justo euismod, ac luctus nisl tempor. Integer elementum, dui a sollicitudin sollicitudin, quam ipsum blandit libero, nec bibendum nisl eros at velit. In hac habitasse platea dictumst. Vestibulum et ex id nisl iaculis volutpat eu eget eros. Quisque quis justo quis ipsum malesuada luctus. Mauris lobortis enim vitae sapien varius, at ultrices purus malesuada. Ut sed ante fringilla, vehicula felis ac, pellentesque ipsum. Aenean maximus augue massa, quis sodales nunc congue scelerisque. Phasellus euismod libero id lorem elementum dictum. Morbi gravida elit est. In facilisis, justo et sodales rhoncus, risus mauris ornare nisl, eu gravida est neque ut odio.",
		link: "console-stg.pearson.com:8080/account/manage/account",
		linkText:"Go to Profile Screen",
		icon: "fa fa-cogs fa-2x"
	}];
	let container = null;
	beforeEach(() => {
		container = ReactTestUtils.renderIntoDocument(<NotificationList list={list}/>);
	})

	it("should change state when a notification node is clicked", () => {
		let node = ReactTestUtils.scryRenderedDOMComponentsWithClass(container, "notification-node--details-click");
		ReactTestUtils.Simulate.click(node[0]);
		expect(container.state.isDetails).to.be(true);
	});

	
});
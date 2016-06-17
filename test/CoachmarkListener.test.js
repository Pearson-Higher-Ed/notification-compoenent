import CoachmarkListener from '../src/js/CoachmarkListener';

describe('CoachmarkListener.launchCoachmark', () => {
	let coachmarkListener = null;

	beforeEach(() => {
		let notification = {
			message: {
				cmIds:'1,2,3',
				masterpieceId: '123',
				userNotificationId: '456',
				userId: '789'
			}
		};

		coachmarkListener = new CoachmarkListener({});

		coachmarkListener.launchTour = () => {};
		coachmarkListener._setupBackListener = () => {};
		coachmarkListener._setupNextListener = () => {};
		coachmarkListener._getDisplayCoachmark = () => {};

		coachmarkListener.launchCoachmark(notification);

	});
});

describe('CoachmarkListener.continueTourIfRedirected', () => {

	let coachmarkListener;
	let isFromNewUrl = false;
	let state;
	let storePath = 'notifications.coachmark.stateObject';
	let cmStateStr;

	beforeEach(() => {
		state = {
			userNotificationId: 222,
			userId: 333,
			cmIds: ['555'],
			index: 0,
			isVisited: {},
		};
		cmStateStr = JSON.stringify(state);

		coachmarkListener = new CoachmarkListener({});

		coachmarkListener.launchTour = () => {};
		coachmarkListener._setupBackListener = () => {};
		coachmarkListener._setupNextListener = () => {};
		coachmarkListener._getDisplayCoachmark = () => {};
	});

	it('should return false if no object from local storage exists', () => {
		localStorage.clear();
		expect(coachmarkListener.continueTourIfRedirected()).toBe(false);
	});

	it('should return true if an object from local storage exists', () => {
		localStorage.setItem(storePath, cmStateStr);
		expect(coachmarkListener.continueTourIfRedirected()).toBe(true);
	});
});

describe('Back and Next Listeners', () => {
	let coachmarkListener, listenerState;
	let displayCmCalled;
	let cmEvent = {};

	beforeEach(() => {
		displayCmCalled = false;


		cmEvent.id = JSON.stringify({
			userNotificationId: 111,
			cmIds: [222,333,444],
			index: 1,
			isVisited: {}
		});

		coachmarkListener = new CoachmarkListener({});

		coachmarkListener._handleError = (error) => {console.log(error);};
		coachmarkListener._getDisplayCoachmark = (state) => { displayCmCalled = true; listenerState = state; };
		coachmarkListener._setupBackListener();
		coachmarkListener._setupNextListener();
	});

	it('should open the next CM when next is triggered', () => {
		triggerEvent('o-cm-next-clicked', cmEvent);

		expect(displayCmCalled).toBe(true);
		expect(listenerState.index).toBe(2);
	});

	it('should open the previous CM when back is triggered', () => {
		triggerEvent('o-cm-previous-clicked', cmEvent);

		expect(displayCmCalled).toBe(true);
		expect(listenerState.index).toBe(0);
	});
 });

describe('get display coachmark', () => {
	let coachmarkListener, isCountTicked;

	beforeEach((done) => {
		isCountTicked = false;

		CoachmarkListener.__Rewire__('Coachmark', (a,b,c) => {});
		coachmarkListener = new CoachmarkListener({});

		coachmarkListener._redirectIfNewUri = () => {return false;};
		coachmarkListener.notificationApi = {markAsRead: () => {}};
		coachmarkListener.coachmarkApi = {
			incrementViewCount: (cmId) => { isCountTicked = true; },
			getCoachmark: (cmId) => { return Promise.resolve({ options: {}, uri: 'uri', element: 'foo' });}
		};

		const state = {
			userNotificationId: 111,
			cmIds: [222,333,444],
			index: 1,
			isVisited: {}
		};

		coachmarkListener._getDisplayCoachmark(state);
		// Fixes problem with promise not finishing in time
		setTimeout(() => {done();}, 0);

	});

	afterEach(() => { CoachmarkListener.__ResetDependency__('Coachmark'); });

	it('should increment view count if the coachmark has not been visited yet', () => {
		expect(isCountTicked).toBe(true);
	});
});


/**
 * Helper for triggering events
 **/
function triggerEvent(eventType, eventData) {
	let event = document.createEvent('HTMLEvents');
	event.initEvent(eventType, true, true);
	event.eventName = eventType;
	event.data = eventData;
	document.dispatchEvent(event);
}

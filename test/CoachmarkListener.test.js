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
		coachmarkListener.cmListenerSetup = () => {};
		coachmarkListener.getDisplayCoachmark = () => {};
		coachmarkListener.launchCoachmark(notification);

	});
});

describe('CoachmarkListener.launchCoachmarkIfFromNewUrl', () => {

	let masterpieceId = 444;
	let coachmarkListener;
	let isFromNewUrl = false;
	let cmStateObj;
	let storePath = 'notifications.coachmark.stateObject';
	let cmStateStr;

	beforeEach(() => {
		cmStateObj = {
			userNotificationId: 222,
			userId: 333,
			masterpieceId: masterpieceId,
			cmIds: ['555'],
			index: 0,
			isVisited: {},
			areListenersSet: false
		};
		cmStateStr = JSON.stringify(cmStateObj);

		coachmarkListener = new CoachmarkListener({});
		coachmarkListener.cmListenerSetup = () => {};
		coachmarkListener.getDisplayCoachmark = () => {};
		coachmarkListener.cmState = {};
	});

	it('should return false if no cmState exists', () => {
		localStorage.clear();
		expect(coachmarkListener.launchCoachmarkIfFromNewUrl()).toBe(false);
	});

	it('should return true if an object from local storage exists', () => {
		localStorage.setItem(storePath, cmStateStr);
		expect(coachmarkListener.launchCoachmarkIfFromNewUrl()).toBe(true);
	});

	it('should get the cmState object from local storage', () => {
		localStorage.setItem(storePath, cmStateStr);
		coachmarkListener.launchCoachmarkIfFromNewUrl();
		expect(coachmarkListener.cmState[masterpieceId]).not.toBe(undefined);
	});
});

describe('Back and Next Listeners', () => {
	let coachmarkListener;
	let masterpieceId = 444;
	let closeCmCalled, displayCmCalled;

	beforeEach(() => {
		closeCmCalled = false;
		displayCmCalled = false;

		coachmarkListener = new CoachmarkListener({});

		coachmarkListener.cmState = {};
		coachmarkListener.cmState[masterpieceId] = {
			userNotificationId: 222,
			userId: 333,
			masterpieceId: masterpieceId,
			cmIds: [554, 555, 556],
			index: 1,
			isVisited: {},
			areListenersSet: false
		};

		coachmarkListener.closeCoachmark = (element) => { closeCmCalled = true; };
		coachmarkListener.getDisplayCoachmark = (masterpieceId) => { displayCmCalled = true; };
		coachmarkListener.setupBackListener(masterpieceId);
		coachmarkListener.setupNextListener(masterpieceId);
	});

	it('should open the next CM when next is triggered', () => {
		triggerEvent('o-cm-next-clicked', { id: masterpieceId, payload: '' });

		expect(displayCmCalled).toBe(true);
		expect(coachmarkListener.cmState[masterpieceId].index).toBe(2);
	});

	it('should open the previous CM when back is triggered', () => {
		triggerEvent('o-cm-previous-clicked', { id: masterpieceId, payload: '' });

		expect(displayCmCalled).toBe(true);
		expect(coachmarkListener.cmState[masterpieceId].index).toBe(0);
	});
});

describe('get display coachmark', () => {
	let masterpieceId = 444;
	let coachmarkListener, isCountTicked;

	beforeEach((done) => {
		isCountTicked = false;

		CoachmarkListener.__Rewire__('Coachmark', (a,b,c) => {});
		coachmarkListener = new CoachmarkListener({});

		coachmarkListener.redirectIfNewUri = () => {return false;};
		coachmarkListener.notificationApi = {markAsRead: () => {}};
		coachmarkListener.closeCoachmark = () => {};
		coachmarkListener.coachmarkApi = {
			incrementViewCount: (cmId) => { isCountTicked = true; },
			getCoachmark: (cmId) => { return Promise.resolve({ options: {}, uri: 'uri', element: 'foo' });}
		};
		coachmarkListener.cmState = {};
		coachmarkListener.cmState[masterpieceId] = {
			userNotificationId: 222,
			userId: 333,
			masterpieceId: masterpieceId,
			cmIds: [554, 555, 556],
			index: 1,
			isVisited: {},
			areListenersSet: false
		};
		coachmarkListener.getDisplayCoachmark(masterpieceId);
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

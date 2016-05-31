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

	it('should default student role to N/A if none is provided', () => {
		expect(coachmarkListener.cmState[123].targetUserRole).toBe('N/A');
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
			targetUserRole: 'stud',
			masterpieceId: masterpieceId,
			cmIds: ['555'],
			index: 0,
			isVisited: {},
			likeCmSeries: '',
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

describe('Back/Next Listener', () => {
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
			targetUserRole: 'stud',
			masterpieceId: masterpieceId,
			cmIds: [554, 555, 556],
			index: 1,
			isVisited: {},
			likeCmSeries: '',
			areListenersSet: false
		};

		coachmarkListener.closeCoachmark = (element) => { closeCmCalled = true; };
		coachmarkListener.getDisplayCoachmark = (masterpieceId) => { displayCmCalled = true; };
		coachmarkListener.setupBackNextListener(masterpieceId);
	});

	it('should close the old CM and opens the next one when next is triggered', () => {
		triggerEvent('o-cm-backNext-clicked', { type: 'nextButton', id: 555, payload: '' });

		expect(closeCmCalled).toBe(true);
		expect(displayCmCalled).toBe(true);
		expect(coachmarkListener.cmState[masterpieceId].index).toBe(2);
	});

	it('should close the old CM and open the previous one when back is triggered', () => {
		triggerEvent('o-cm-backNext-clicked', { type: 'backButton', id: 555, payload: '' });

		expect(closeCmCalled).toBe(true);
		expect(displayCmCalled).toBe(true);
		expect(coachmarkListener.cmState[masterpieceId].index).toBe(0);
	});
});

describe('like button listener', () => {
	let masterpieceId = 444;
	let coachmarkListener;

	beforeEach(() => {
		coachmarkListener = new CoachmarkListener({});
		coachmarkListener.cmState = {};
		coachmarkListener.cmState[masterpieceId] = {
			userNotificationId: 222,
			userId: 333,
			targetUserRole: 'stud',
			masterpieceId: masterpieceId,
			cmIds: [554, 555, 556],
			index: 1,
			isVisited: {},
			likeCmSeries: '',
			areListenersSet: false
		};
		coachmarkListener.setupLikeListener(masterpieceId);
	});

	it('should flag the cmState as liked when liked is clicked', () => {
		triggerEvent('o-cm-like-clicked', { type: 'like', id: 555, payload: '' });
		expect(coachmarkListener.cmState[masterpieceId].likeCmSeries).toBe('like');
	});
});

describe('submit button listener', () => {
	let masterpieceId = 444;
	let coachmarkListener, submitFeedbackHit, markAsReadHit;

	beforeEach(() => {
		submitFeedbackHit = false;
		markAsReadHit = false;

		coachmarkListener = new CoachmarkListener({});
		coachmarkListener.notificationApi = { markAsRead: () => {markAsReadHit = true;} };
		coachmarkListener.feedbackApi = { submitFeedback: () => {submitFeedbackHit = true;} };
		coachmarkListener.closeCoachmark = () => {};
		coachmarkListener.props = () => {};
		coachmarkListener.props.apiConfig = () => {};

		coachmarkListener.cmState = {};
		coachmarkListener.cmState[masterpieceId] = {
			userNotificationId: 222,
			userId: 333,
			targetUserRole: 'stud',
			masterpieceId: masterpieceId,
			cmIds: [554, 555, 556],
			index: 1,
			isVisited: {},
			likeCmSeries: 'like',
			areListenersSet: false
		};
		coachmarkListener.setupSubmitListener(masterpieceId);
	});

	it('should submit user feedback', () => {
		triggerEvent('o-cm-submit-clicked', { type: 'like', id: 555, payload: 'Some feedback' });

		expect(submitFeedbackHit).toBe(true);
		expect(markAsReadHit).toBe(true);

	});
});

describe('Cancel Listener', () => {
	let masterpieceId = 444;
	let coachmarkListener;

	beforeEach(() => {
		coachmarkListener = new CoachmarkListener({});

		coachmarkListener.cmState = {};
		coachmarkListener.cmState[masterpieceId] = {
			userNotificationId: 222,
			userId: 333,
			targetUserRole: 'stud',
			masterpieceId: masterpieceId,
			cmIds: [554, 555, 556],
			index: 1,
			isVisited: {},
			likeCmSeries: 'like',
			areListenersSet: false
		};

		coachmarkListener.setupCancelListener(masterpieceId);
	});

	it('should clear the like/dislike flag from the cmState object', () => {
		triggerEvent('o-cm-cancel-clicked', { type: 'like', id: 555, payload: 'Some feedback' });
		expect(coachmarkListener.cmState[masterpieceId].likeCmSeries).toBe('');
	});
});

describe('Listener Setup', () => {
	let masterpieceId = 444;
	let coachmarkListener = new CoachmarkListener({});
	coachmarkListener.cmState = {};
	let isBackNextCalled, isLikeCalled, isSubmitCalled, isCancelCalled;

	beforeEach(() => {
		isBackNextCalled = isLikeCalled = isSubmitCalled = isCancelCalled = false;
		coachmarkListener.setupBackNextListener = () => {isBackNextCalled = true;};
		coachmarkListener.setupLikeListener = () => {isLikeCalled = true;};
		coachmarkListener.setupSubmitListener = () => {isSubmitCalled = true;};
		coachmarkListener.setupCancelListener = () => {isCancelCalled = true;};
	});

	it('should call each listener setup if not already set up', () => {
		coachmarkListener.cmState[masterpieceId] = { areListenersSet: false };
		coachmarkListener.cmListenerSetup(masterpieceId);
		expect(isBackNextCalled).toBe(true);
		expect(isLikeCalled).toBe(true);
		expect(isSubmitCalled).toBe(true);
		expect(isCancelCalled).toBe(true);
	});

	it('should not call each listener setup if already set up', () => {
		coachmarkListener.cmState[masterpieceId] = { areListenersSet: true };
		coachmarkListener.cmListenerSetup(masterpieceId);
		expect(isBackNextCalled).toBe(false);
		expect(isLikeCalled).toBe(false);
		expect(isSubmitCalled).toBe(false);
		expect(isCancelCalled).toBe(false);
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
			targetUserRole: 'stud',
			masterpieceId: masterpieceId,
			cmIds: [554, 555, 556],
			index: 1,
			isVisited: {},
			likeCmSeries: 'like',
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

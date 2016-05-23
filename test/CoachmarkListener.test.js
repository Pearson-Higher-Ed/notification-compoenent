// jest.unmock('../src/js/CoachmarkListener');
// import CoachmarkListener from '../src/js/CoachmarkListener';
//
// describe('CoachmarkListener.launchCoachmark', () => {
// 	let coachmarkListener = null;
//
// 	beforeEach(() => {
// 		let notification = {
// 			cmIds:'1,2,3',
// 			masterpieceId: '123',
// 			userNotificationId: '456',
// 			userId: '789',
// 		};
//
// 		coachmarkListener = new CoachmarkListener();
//
// 		coachmarkListener.showList = jest.fn();
// 		coachmarkListener.props = jest.fn();
// 		coachmarkListener.props.notificationCloseDropdown = jest.fn();
// 		coachmarkListener.cmListenerSetup = jest.fn();
// 		coachmarkListener.getDisplayCoachmark = jest.fn();
//
// 		coachmarkListener.launchCoachmark(notification);
//
// 	});
//
// 	it('should call getDisplayCoachmark to launch a new coachmark', () => {
// 		expect(coachmarkListener.getDisplayCoachmark.mock.calls.length).toBe(1);
// 	});
//
// 	it('should default student role to N/A if none is provided', () => {
// 		expect(coachmarkListener.cmState[123].targetUserRole).toBe('N/A');
// 	});
//
// });
//
// describe('CoachmarkListener.launchCoachmarkIfFromNewUrl', () => {
//
// 	let masterpieceId = 444;
// 	let coachmarkListener;
// 	let isFromNewUrl = false;
// 	let cmStateObj;
// 	let storePath = 'notifications.coachmark.stateObject';
// 	let cmStateStr;
//
// 	beforeEach(() => {
// 		cmStateObj = {
// 			userNotificationId: 222,
// 			userId: 333,
// 			targetUserRole: 'stud',
// 			masterpieceId: masterpieceId,
// 			cmIds: ['555'],
// 			index: 0,
// 			isVisited: {},
// 			likeCmSeries: '',
// 			areListenersSet: false
// 		};
//
// 		cmStateStr = JSON.stringify(cmStateObj);
//
// 		coachmarkListener = new CoachmarkListener();
// 		coachmarkListener.cmListenerSetup = jest.fn();
// 		coachmarkListener.getDisplayCoachmark = jest.fn();
// 	});
//
// 	it('should return false if no cmState exists', () => {
// 		localStorage.clear();
// 		expect(coachmarkListener.launchCoachmarkIfFromNewUrl()).toBe(false);
// 	});
//
// 	it('should return true if an object from local storage exists', () => {
// 		localStorage.setItem(storePath, cmStateStr);
// 		expect(coachmarkListener.launchCoachmarkIfFromNewUrl()).toBe(true);
// 	});
//
// 	it('should get the cmState object from local storage', () => {
// 		localStorage.setItem(storePath, cmStateStr);
// 		coachmarkListener.launchCoachmarkIfFromNewUrl();
// 		expect(coachmarkListener.cmState[masterpieceId]).not.toBe(undefined);
// 	});
//
// 	it('should setup the listeners and display the coachmark if obj exists', () => {
// 		localStorage.setItem(storePath, cmStateStr);
// 		coachmarkListener.launchCoachmarkIfFromNewUrl();
// 		expect(coachmarkListener.cmListenerSetup.mock.calls.length).toBe(1);
// 		expect(coachmarkListener.getDisplayCoachmark.mock.calls.length).toBe(1);
// 	});
// });
//
// describe('Back/Next Listener', () => {
// 	let coachmarkListener;
// 	let masterpieceId = 444;
//
// 	beforeEach(() => {
// 		coachmarkListener = new CoachmarkListener();
// 		coachmarkListener.closeCoachmark = jest.fn();
// 		coachmarkListener.getDisplayCoachmark = jest.fn();
//
// 		coachmarkListener.cmState = {};
// 		coachmarkListener.cmState[masterpieceId] = {
// 			userNotificationId: 222,
// 			userId: 333,
// 			targetUserRole: 'stud',
// 			masterpieceId: masterpieceId,
// 			cmIds: [554, 555, 556],
// 			index: 1,
// 			isVisited: {},
// 			likeCmSeries: '',
// 			areListenersSet: false
// 		};
//
// 		coachmarkListener.setupBackNextListener(masterpieceId);
// 	});
//
// 	it('should close the old CM and opens the next one when next is triggered', () => {
// 		triggerEvent('o-cm-backNext-clicked', { type: 'nextButton', id: 555, payload: '' });
//
// 		expect(coachmarkListener.closeCoachmark.mock.calls.length).toBe(1);
// 		expect(coachmarkListener.getDisplayCoachmark.mock.calls.length).toBe(1);
// 		expect(coachmarkListener.cmState[masterpieceId].index).toBe(2);
// 	});
//
// 	it('should close the old CM and opens the previous one when back is triggered', () => {
// 		triggerEvent('o-cm-backNext-clicked', { type: 'backButton', id: 555, payload: '' });
//
// 		expect(coachmarkListener.closeCoachmark.mock.calls.length).toBe(1);
// 		expect(coachmarkListener.getDisplayCoachmark.mock.calls.length).toBe(1);
// 		expect(coachmarkListener.cmState[masterpieceId].index).toBe(0);
// 	});
//
// });
//
// describe('like button listener', () => {
// 	let masterpieceId = 444;
// 	let coachmarkListener;
//
// 	beforeEach(() => {
// 		coachmarkListener = new CoachmarkListener();
// 		coachmarkListener.cmState = {};
// 		coachmarkListener.cmState[masterpieceId] = {
// 			userNotificationId: 222,
// 			userId: 333,
// 			targetUserRole: 'stud',
// 			masterpieceId: masterpieceId,
// 			cmIds: [554, 555, 556],
// 			index: 1,
// 			isVisited: {},
// 			likeCmSeries: '',
// 			areListenersSet: false
// 		};
// 		coachmarkListener.setupLikeListener(masterpieceId);
// 	});
//
// 	it('should flag the cmState as liked when liked is clicked', () => {
// 		triggerEvent('o-cm-like-clicked', { type: 'like', id: 555, payload: '' });
// 		expect(coachmarkListener.cmState[masterpieceId].likeCmSeries).toBe('like');
// 	});
// });
//
// describe('submit button listener', () => {
// 	let masterpieceId = 444;
// 	let coachmarkListener;
//
// 	beforeEach(() => {
// 		coachmarkListener = new CoachmarkListener();
// 		coachmarkListener.notApi = jest.fn();
// 		coachmarkListener.notApi.markAsRead = jest.fn();
// 		coachmarkListener.closeCoachmark = jest.fn();
// 		coachmarkListener.props = jest.fn();
// 		coachmarkListener.props.apiConfig = jest.fn();
//
// 		coachmarkListener.cmState = {};
// 		coachmarkListener.cmState[masterpieceId] = {
// 			userNotificationId: 222,
// 			userId: 333,
// 			targetUserRole: 'stud',
// 			masterpieceId: masterpieceId,
// 			cmIds: [554, 555, 556],
// 			index: 1,
// 			isVisited: {},
// 			likeCmSeries: 'like',
// 			areListenersSet: false
// 		};
// 		coachmarkListener.setupSubmitListener(masterpieceId);
// 	});
//
// 	it('should submit user feedback', () => {
// 		triggerEvent('o-cm-submit-clicked', { type: 'like', id: 555, payload: 'Some feedback' });
//
// 		expect(coachmarkListener.fbApi.submitFeedback.mock.calls.length).toBe(1);
// 		expect(coachmarkListener.notApi.markAsRead.mock.calls.length).toBe(1);
//
// 	});
// });
//
// describe('Cancel Listener', () => {
// 	let masterpieceId = 444;
// 	let coachmarkListener;
//
// 	beforeEach(() => {
// 		coachmarkListener = new CoachmarkListener();
//
// 		coachmarkListener.cmState = {};
// 		coachmarkListener.cmState[masterpieceId] = {
// 			userNotificationId: 222,
// 			userId: 333,
// 			targetUserRole: 'stud',
// 			masterpieceId: masterpieceId,
// 			cmIds: [554, 555, 556],
// 			index: 1,
// 			isVisited: {},
// 			likeCmSeries: 'like',
// 			areListenersSet: false
// 		};
//
// 		coachmarkListener.setupCancelListener(masterpieceId);
// 	});
//
// 	it('should clear the like/dislike flag from the cmState object', () => {
// 		triggerEvent('o-cm-cancel-clicked', { type: 'like', id: 555, payload: 'Some feedback' });
// 		expect(coachmarkListener.cmState[masterpieceId].likeCmSeries).toBe('');
// 	});
// });
//
// describe('Listener Setup', () => {
// 	let masterpieceId = 444;
// 	let coachmarkListener = new CoachmarkListener();
// 	coachmarkListener.cmState = {};
//
// 	beforeEach(() => {
// 		coachmarkListener.setupBackNextListener = jest.fn();
// 		coachmarkListener.setupLikeListener = jest.fn();
// 		coachmarkListener.setupSubmitListener = jest.fn();
// 		coachmarkListener.setupCancelListener = jest.fn();
// 	});
//
// 	it('should call each listener setup if not already set up', () => {
// 		coachmarkListener.cmState[masterpieceId] = { areListenersSet: false };
// 		coachmarkListener.cmListenerSetup(masterpieceId);
// 		expect(coachmarkListener.setupBackNextListener.mock.calls.length).toBe(1);
// 	});
//
// 	it('should not call each listener setup if already set up', () => {
// 		coachmarkListener.cmState[masterpieceId] = { areListenersSet: true };
// 		coachmarkListener.cmListenerSetup(masterpieceId);
// 		expect(coachmarkListener.setupBackNextListener.mock.calls.length).toBe(0);
// 	});
// });
//
// describe('get display coachmark', () => {
// 	let masterpieceId = 444;
// 	let coachmarkListener = new CoachmarkListener();
//
// 	coachmarkListener.cmState = {};
// 	coachmarkListener.cmState[masterpieceId] = {
// 		userNotificationId: 222,
// 		userId: 333,
// 		targetUserRole: 'stud',
// 		masterpieceId: masterpieceId,
// 		cmIds: [554, 555, 556],
// 		index: 1,
// 		isVisited: {},
// 		likeCmSeries: 'like',
// 		areListenersSet: false
// 	};
//
// 	beforeEach(() => {
// 		coachmarkListener.notApi = jest.fn();
// 	});
//
// 	it('should increment view count if the coachmark has not been visited yet', () => {
// 		// TODO
// 	});
// });
//
//
// /**
//  * Helper
//  **/
// function triggerEvent(eventType, eventData) {
// 	let event = document.createEvent('HTMLEvents');
// 	event.initEvent(eventType, true, true);
// 	event.eventName = eventType;
// 	event.data = eventData;
//
// 	document.dispatchEvent(event);
// }

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("react-dom")) : factory(root["React"], root["ReactDOM"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _NotificationBell = __webpack_require__(5);

	var _NotificationBell2 = _interopRequireDefault(_NotificationBell);

	var _NotificationApi = __webpack_require__(6);

	var _NotificationApi2 = _interopRequireDefault(_NotificationApi);

	__webpack_require__(8);

	var _NotificationContainer = __webpack_require__(12);

	var _NotificationContainer2 = _interopRequireDefault(_NotificationContainer);

	var _main = __webpack_require__(24);

	var _main2 = _interopRequireDefault(_main);

	var _CoachmarkListener = __webpack_require__(20);

	var _CoachmarkListener2 = _interopRequireDefault(_CoachmarkListener);

	var _rtd = __webpack_require__(32);

	var _rtd2 = _interopRequireDefault(_rtd);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 *  NotificationComponent.
	 *    NotificationComponent will get larger as it is in charge of making API calls for all of the notification-apis.
	 *    To get an instance of it just create require the module inside your javascript file and call 'getInstance' with configuration
	 *    as a parameter.  This component needs to make several api calls from places that could change, so we need to pass configuration
	 *    into it.
	 */

	var NotificationComponent = function () {
		function NotificationComponent(config, element) {
			var _this2 = this;

			_classCallCheck(this, NotificationComponent);

			this.notApi = new _NotificationApi2.default(config);
			var userNotifications = this.notApi.getNotifications();

			var rtd = (0, _rtd2.default)('https://rtd.stg-prsn.com');
			rtd.setToken(config.nfPiToken);
			rtd.on('ready', function (data) {
				rtd.subscribe('aegisTestProduct.ffffffff560c1a1ee4b04ebf43118c60', ['all']);
			});

			rtd.on('message', function (type, message) {
				var currentTime = new Date();
				var hours = currentTime.getHours();
				var minutes = currentTime.getMinutes();
				var seconds = currentTime.getSeconds();

				if (minutes < 10) {
					minutes = "0" + minutes;
				}
				if (seconds < 10) {
					seconds = "0" + seconds;
				}
				console.log(minutes + seconds + " here");
			});
			// Connect up the drawer component here.
			var dom = document.createElement('div');
			dom.setAttribute('data-o-component', 'o-drawer');
			dom.classList.add('o-drawer-right', 'o-drawer-animated');
			this.listDrawer = new _main2.default(dom);
			document.body.appendChild(dom);

			this.notificationList = [];
			this.archivedNotificationList = [];
			userNotifications.then(function (result) {
				// create the react classes for reference later
				_this2._createBellReactClass();
				_this2._createListReactClass(config);
				_this2.notificationList = result.list;
				_this2.archivedNotificationList = result.archivedList;
				_this2.newNotifications = result.newNotifications;
				_this2.unreadCount = result.unreadCount;
				// convert to Date objects
				if (_this2.notificationList.length > 0) {
					_this2.notificationList.forEach(function (item) {
						item.createdAt = new Date(item.createdAt);
						item.updatedAt = new Date(item.updatedAt);
					});
					// sort by created field, newest first
					_this2.notificationList.sort(function (x, y) {
						return y.createdAt - x.createdAt;
					});
				}
				// Keep reference to the components to set state later and render the react components now that we have the data
				_this2.containerComponent = _reactDom2.default.render(_react2.default.createElement(_this2.containerClass, null), dom);
				_this2.bellComponent = _reactDom2.default.render(_react2.default.createElement(_this2.bellClass, null), element);

				new _CoachmarkListener2.default(config).launchCoachmarkIfFromNewUrl();
			}).catch(function (error) {
				console.log(error);
			});
		}

		_createClass(NotificationComponent, [{
			key: '_createBellReactClass',
			value: function _createBellReactClass() {
				//  Keep track of the parent react class
				var _this = this; //i'm not happy i need to do this....but it would be really complicated since i don't want to actually pass context down to the child except for the notificationList property.

				this.bellClass = _react2.default.createClass({
					displayName: 'bellClass',

					render: function render() {
						return _react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(_NotificationBell2.default, { newNotifications: _this.newNotifications, unreadCount: _this.unreadCount, toggleList: _this.toggleList.bind(_this) })
						);
					}
				});
			}
		}, {
			key: '_createListReactClass',
			value: function _createListReactClass(config) {

				var _this = this;
				this.containerClass = _react2.default.createClass({
					displayName: 'containerClass',

					render: function render() {
						return _react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(_NotificationContainer2.default, { list: _this.notificationList, archivedList: _this.archivedNotificationList, closeDrawer: _this.closeDrawer.bind(_this), config: config })
						);
					}
				});
			}
		}, {
			key: 'toggleList',
			value: function toggleList() {
				var _this3 = this;

				this.listDrawer.toggle();
				if (this.newNotifications) {
					// need to call the route that will change the status of all the notifications.
					var viewedList = this.notificationList.filter(function (notification) {
						if (notification.status === 'CREATED') {
							return notification;
						}
					});

					viewedList.forEach(function (notification) {
						_this3.notApi.markAsViewed(notification.id).then(function (result) {
							// we don't care to do anything here...
						}, function (err) {
							// we really don't care about this...
						});
					});

					this.newNotifications = false;
					this.bellComponent.forceUpdate();
				}
			}
		}, {
			key: 'closeDrawer',
			value: function closeDrawer() {
				this.listDrawer.close();
			}
		}]);

		return NotificationComponent;
	}();

	exports.default = NotificationComponent;


	document.body.addEventListener('o.InitNotificationComponent', function (e) {
		return new NotificationComponent(e.detail.config, e.detail.element);
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NotificationBell = function (_React$Component) {
		_inherits(NotificationBell, _React$Component);

		function NotificationBell(props) {
			_classCallCheck(this, NotificationBell);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NotificationBell).call(this, props));

			_this.count = _this.props.unreadCount;
			document.addEventListener('NotificationBell.ReadNotification', function () {
				_this.count--;
				_this.forceUpdate();
			});
			return _this;
		}

		_createClass(NotificationBell, [{
			key: 'render',
			value: function render() {
				var bellClassNames = 'notification-bell--count';
				console.log(this.props.newNotifications);
				if (this.props.newNotifications) {
					bellClassNames += ' notification-bell--new';
				}

				if (this.count === 0) {
					bellClassNames += ' hide';
				}

				return _react2.default.createElement(
					'div',
					{ className: 'notification-bell' },
					_react2.default.createElement(
						'a',
						{ href: 'javascript:void(0)', className: 'notification-bell--activate', onClick: this.props.toggleList },
						_react2.default.createElement('i', { className: 'pe-icon--bell' }),
						_react2.default.createElement(
							'div',
							{ className: bellClassNames },
							this.count > 9 ? '9+' : this.count
						)
					)
				);
			}
		}]);

		return NotificationBell;
	}(_react2.default.Component);

	exports.default = NotificationBell;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function parseResponse(response) {
		'use strict';

		var userNotifications = response._embedded.usernotifications;

		var newNotifications = false;
		var unreadCount = 0;
		// we are doing this simply to make it so that we flatten the object.  This is because the way notification works is
		// it sends a payload message body which is a template which we made it a template of a json object.
		var userNotificationsList = userNotifications.filter(function (notification) {
			return notification.hasOwnProperty('notificationType') && notification.notificationType === 'inbrowser' && notification.status !== 'ARCHIVED';
		}).map(function (notification) {
			var result = JSON.parse(notification.payload.message);
			notification.message = result;
			if (notification.status === 'CREATED') {
				newNotifications = true;
			}
			if (notification.isRead === false) {
				unreadCount++;
			}
			return notification;
		});

		var archivedNotificationsList = userNotifications.filter(function (notification) {
			var result = JSON.parse(notification.payload.message);
			notification.message = result;
			return notification.hasOwnProperty('notificationType') && notification.notificationType === 'inbrowser' && notification.status === 'ARCHIVED';
		});

		return {
			list: fixDefaultValues(userNotificationsList),
			newNotifications: newNotifications,
			archivedList: fixDefaultValues(archivedNotificationsList),
			unreadCount: unreadCount
		};
	}

	/*
	 * If a property wasn't passed in to the API when the notification was created,
	 * the Velocity template will default the property value to '$eventModel.[property name]',
	 * but we instead need this to default to an empty string.
	 */
	function fixDefaultValues(notificationList) {
		var badStr = '$eventModel.';
		for (var i = 0; i < notificationList.length; i++) {
			var msgObj = notificationList[i].message;
			for (var prop in msgObj) {
				if (msgObj.hasOwnProperty(prop) && msgObj[prop].toString().substring(0, badStr.length) === badStr) {
					msgObj[prop] = '';
				}
			}
		}
		return notificationList;
	}

	var NotificationApi = function () {
		function NotificationApi(config) {
			_classCallCheck(this, NotificationApi);

			this.url = config.nfApiUrl;
			this.xAuth = config.nfPiToken;
			this.contentType = config.nfContentTypeHeader;
			this.recipientId = config.nfRecipientId;
		}

		_createClass(NotificationApi, [{
			key: 'getNotifications',
			value: function getNotifications() {
				var _this = this;

				var response = new Promise(function (resolve, reject) {
					var request = new Request(_this.url + '?filter=recipientId::' + _this.recipientId + '|notificationType::inbrowser', {
						method: 'GET',
						mode: 'cors',
						headers: {
							'X-Authorization': _this.xAuth,
							'Content-Type': _this.contentType
						}
					});
					fetch(request).then(function (response) {
						return response.json();
					}).then(function (json) {
						resolve(parseResponse(json));
					}).catch(function (error) {
						console.log('onError: ', error);
						reject(error);
					});
				});
				return response;
			}
		}, {
			key: 'markAsRead',
			value: function markAsRead(userNotificationId) {
				var payload = {
					isRead: true
				};
				return this.updateUserNotification(userNotificationId, payload);
			}
		}, {
			key: 'markAsViewed',
			value: function markAsViewed(userNotificationId) {
				var payload = {
					status: 'VIEWED'
				};
				return this.updateUserNotification(userNotificationId, payload);
			}
		}, {
			key: 'markAsArchivedAndRead',
			value: function markAsArchivedAndRead(userNotificationId) {
				var payload = {
					status: 'ARCHIVED',
					isRead: true
				};
				return this.updateUserNotification(userNotificationId, payload);
			}
		}, {
			key: 'updateUserNotification',
			value: function updateUserNotification(userNotificationId, payload) {
				var _this2 = this;

				var response = new Promise(function (resolve, reject) {
					var request = new Request(_this2.url + '/' + userNotificationId, {
						method: 'PUT',
						mode: 'cors',
						headers: {
							'X-Authorization': _this2.xAuth,
							'Content-Type': _this2.contentType
						},
						body: JSON.stringify(payload)
					});
					fetch(request).then(function (response) {
						resolve(response);
					}).catch(function (error) {
						console.log('onError: ', error);
						reject(error);
					});
				});
				return response;
			}
		}]);

		return NotificationApi;
	}();

	exports.default = NotificationApi;
	;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	(function (self) {
	  'use strict';

	  if (self.fetch) {
	    return;
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name);
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name');
	    }
	    return name.toLowerCase();
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value);
	    }
	    return value;
	  }

	  function Headers(headers) {
	    this.map = {};

	    if (headers instanceof Headers) {
	      headers.forEach(function (value, name) {
	        this.append(name, value);
	      }, this);
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function (name) {
	        this.append(name, headers[name]);
	      }, this);
	    }
	  }

	  Headers.prototype.append = function (name, value) {
	    name = normalizeName(name);
	    value = normalizeValue(value);
	    var list = this.map[name];
	    if (!list) {
	      list = [];
	      this.map[name] = list;
	    }
	    list.push(value);
	  };

	  Headers.prototype['delete'] = function (name) {
	    delete this.map[normalizeName(name)];
	  };

	  Headers.prototype.get = function (name) {
	    var values = this.map[normalizeName(name)];
	    return values ? values[0] : null;
	  };

	  Headers.prototype.getAll = function (name) {
	    return this.map[normalizeName(name)] || [];
	  };

	  Headers.prototype.has = function (name) {
	    return this.map.hasOwnProperty(normalizeName(name));
	  };

	  Headers.prototype.set = function (name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)];
	  };

	  Headers.prototype.forEach = function (callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function (name) {
	      this.map[name].forEach(function (value) {
	        callback.call(thisArg, value, name, this);
	      }, this);
	    }, this);
	  };

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'));
	    }
	    body.bodyUsed = true;
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function (resolve, reject) {
	      reader.onload = function () {
	        resolve(reader.result);
	      };
	      reader.onerror = function () {
	        reject(reader.error);
	      };
	    });
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    reader.readAsArrayBuffer(blob);
	    return fileReaderReady(reader);
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader();
	    reader.readAsText(blob);
	    return fileReaderReady(reader);
	  }

	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && function () {
	      try {
	        new Blob();
	        return true;
	      } catch (e) {
	        return false;
	      }
	    }(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  };

	  function Body() {
	    this.bodyUsed = false;

	    this._initBody = function (body) {
	      this._bodyInit = body;
	      if (typeof body === 'string') {
	        this._bodyText = body;
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body;
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body;
	      } else if (!body) {
	        this._bodyText = '';
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	          throw new Error('unsupported BodyInit type');
	        }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8');
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type);
	        }
	      }
	    };

	    if (support.blob) {
	      this.blob = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob);
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob');
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]));
	        }
	      };

	      this.arrayBuffer = function () {
	        return this.blob().then(readBlobAsArrayBuffer);
	      };

	      this.text = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob);
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text');
	        } else {
	          return Promise.resolve(this._bodyText);
	        }
	      };
	    } else {
	      this.text = function () {
	        var rejected = consumed(this);
	        return rejected ? rejected : Promise.resolve(this._bodyText);
	      };
	    }

	    if (support.formData) {
	      this.formData = function () {
	        return this.text().then(decode);
	      };
	    }

	    this.json = function () {
	      return this.text().then(JSON.parse);
	    };

	    return this;
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase();
	    return methods.indexOf(upcased) > -1 ? upcased : method;
	  }

	  function Request(input, options) {
	    options = options || {};
	    var body = options.body;
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read');
	      }
	      this.url = input.url;
	      this.credentials = input.credentials;
	      if (!options.headers) {
	        this.headers = new Headers(input.headers);
	      }
	      this.method = input.method;
	      this.mode = input.mode;
	      if (!body) {
	        body = input._bodyInit;
	        input.bodyUsed = true;
	      }
	    } else {
	      this.url = input;
	    }

	    this.credentials = options.credentials || this.credentials || 'omit';
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers);
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET');
	    this.mode = options.mode || this.mode || null;
	    this.referrer = null;

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests');
	    }
	    this._initBody(body);
	  }

	  Request.prototype.clone = function () {
	    return new Request(this);
	  };

	  function decode(body) {
	    var form = new FormData();
	    body.trim().split('&').forEach(function (bytes) {
	      if (bytes) {
	        var split = bytes.split('=');
	        var name = split.shift().replace(/\+/g, ' ');
	        var value = split.join('=').replace(/\+/g, ' ');
	        form.append(decodeURIComponent(name), decodeURIComponent(value));
	      }
	    });
	    return form;
	  }

	  function headers(xhr) {
	    var head = new Headers();
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n');
	    pairs.forEach(function (header) {
	      var split = header.trim().split(':');
	      var key = split.shift().trim();
	      var value = split.join(':').trim();
	      head.append(key, value);
	    });
	    return head;
	  }

	  Body.call(Request.prototype);

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {};
	    }

	    this.type = 'default';
	    this.status = options.status;
	    this.ok = this.status >= 200 && this.status < 300;
	    this.statusText = options.statusText;
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
	    this.url = options.url || '';
	    this._initBody(bodyInit);
	  }

	  Body.call(Response.prototype);

	  Response.prototype.clone = function () {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    });
	  };

	  Response.error = function () {
	    var response = new Response(null, { status: 0, statusText: '' });
	    response.type = 'error';
	    return response;
	  };

	  var redirectStatuses = [301, 302, 303, 307, 308];

	  Response.redirect = function (url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code');
	    }

	    return new Response(null, { status: status, headers: { location: url } });
	  };

	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;

	  self.fetch = function (input, init) {
	    return new Promise(function (resolve, reject) {
	      var request;
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input;
	      } else {
	        request = new Request(input, init);
	      }

	      var xhr = new XMLHttpRequest();

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL;
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL');
	        }

	        return;
	      }

	      xhr.onload = function () {
	        var status = xhr.status === 1223 ? 204 : xhr.status;
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'));
	          return;
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        };
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options));
	      };

	      xhr.onerror = function () {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.ontimeout = function () {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.open(request.method, request.url, true);

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true;
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob';
	      }

	      request.headers.forEach(function (value, name) {
	        xhr.setRequestHeader(name, value);
	      });

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	    });
	  };
	  self.fetch.polyfill = true;
	})(typeof self !== 'undefined' ? self : undefined);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, ".hide {\n  display: none; }\n\n.notification-bell {\n  font-size: 16px; }\n  .notification-bell .notification-bell--activate {\n    text-decoration: none;\n    color: #cccccc; }\n    .notification-bell .notification-bell--activate .notification-bell--count {\n      background-color: #ffffff;\n      color: #231F20;\n      font-size: 11px;\n      font-family: HelveticaNeue;\n      font-weight: bold;\n      min-width: 13px;\n      height: 14px;\n      padding-left: 5px;\n      position: relative;\n      bottom: 24px;\n      left: 8px; }\n    .notification-bell .notification-bell--activate .notification-bell--new {\n      background-color: #d2021b;\n      color: #ffffff; }\n\n.notification-title {\n  border-bottom: 1px solid #b3b3b3;\n  overflow: auto; }\n  .notification-title .notification-title--heading {\n    float: left;\n    border-bottom: none;\n    font-size: 16px;\n    margin: 20px 45px 20px 20px;\n    font-weight: bold; }\n  .notification-title a {\n    text-decoration: none; }\n  .notification-title .notification-title--back {\n    color: #0d65a6;\n    text-decoration: none; }\n    .notification-title .notification-title--back .notification-title--back_align {\n      position: relative;\n      top: -2px; }\n  .notification-title .close-dropdown {\n    float: right;\n    margin: 25px 13px 20px 20px; }\n\n.notification-archive--back {\n  position: absolute;\n  color: #231f20;\n  top: 20px;\n  right: 20px; }\n  .notification-archive--back button {\n    background-color: white;\n    border-color: white;\n    border-width: 0px; }\n\n.notification-list {\n  background-color: #f2f2f2; }\n\n.notification-blank-page {\n  background-color: #f2f2f2;\n  min-height: 40em;\n  position: relative; }\n  .notification-blank-page h2 {\n    text-align: center;\n    margin: 0;\n    position: absolute;\n    top: 40%;\n    left: 50%;\n    margin-right: -50%;\n    transform: translate(-50%, -50%);\n    color: #b5b7b8; }\n  .notification-blank-page h3 {\n    text-align: center;\n    margin: 0;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    margin-right: -50%;\n    transform: translate(-50%, -50%);\n    color: #b5b7b8; }\n    .notification-blank-page h3 a {\n      color: #b5b7b8; }\n\n.pointer:hover {\n  cursor: pointer; }\n\n.notification-node {\n  height: 134px;\n  border-bottom: solid 1px #b3b3b3;\n  padding: 20px;\n  background-color: #ffffff; }\n  .notification-node .notification-node--no-decoration {\n    text-decoration: none; }\n  .notification-node .notification-node--details {\n    cursor: pointer;\n    float: left;\n    width: 244px; }\n    .notification-node .notification-node--details .notification-node--summary {\n      float: left;\n      height: 74px;\n      overflow: hidden; }\n      .notification-node .notification-node--details .notification-node--summary h1 {\n        font-size: 16px;\n        border-bottom: none;\n        color: #0d65a6;\n        line-height: normal;\n        font-weight: bold; }\n      .notification-node .notification-node--details .notification-node--summary .notification-node--summary-description {\n        color: #565656; }\n  .notification-node .notification-node--dismiss {\n    float: right;\n    position: relative;\n    top: 30px;\n    color: #231f20;\n    z-index: 1;\n    width: 27px;\n    height: 27px;\n    padding: 0px;\n    margin: 0px;\n    border: 0px; }\n  .notification-node .notification-node--meta {\n    font-size: 12px;\n    clear: left;\n    color: #565656; }\n    .notification-node .notification-node--meta .notification-node--meta-course {\n      float: left; }\n\n.notification-node--isread {\n  background-color: #f2f2f2; }\n\n.notification-details {\n  background-color: #ffffff;\n  padding: 20px; }\n  .notification-details .notification-details__meta .noticiation-details__meta--source {\n    color: #565656;\n    font-size: 12px; }\n  .notification-details .notification-details__meta .notification-details__meta--time {\n    color: #565656;\n    font-size: 12px; }\n  .notification-details .notification-details--title {\n    margin-bottom: 40px; }\n  .notification-details .notification-details--body {\n    margin-bottom: 20px; }\n  .notification-details .notification-details--button {\n    width: 100%;\n    margin-bottom: 20px; }\n  .notification-details .notification-details--archive {\n    text-decoration: none; }\n  .notification-details .notification-details--align {\n    text-align: center; }\n", ""]);

	// exports


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _NotificationList = __webpack_require__(13);

	var _NotificationList2 = _interopRequireDefault(_NotificationList);

	var _NotificationDetails = __webpack_require__(19);

	var _NotificationDetails2 = _interopRequireDefault(_NotificationDetails);

	var _NotificationHeading = __webpack_require__(23);

	var _NotificationHeading2 = _interopRequireDefault(_NotificationHeading);

	var _NotificationApi = __webpack_require__(6);

	var _NotificationApi2 = _interopRequireDefault(_NotificationApi);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NotificationContainer = function (_React$Component) {
		_inherits(NotificationContainer, _React$Component);

		function NotificationContainer(props) {
			_classCallCheck(this, NotificationContainer);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NotificationContainer).call(this, props));

			_this.notificationApi = new _NotificationApi2.default(_this.props.config);
			_this.state = {
				isArchive: false,
				displayDetails: false,
				notificationDetails: {
					message: {}
				},
				archivedList: props.archivedList || [],
				list: props.list || [],
				notificationList: props.list || []
			};
			return _this;
		}

		_createClass(NotificationContainer, [{
			key: 'showDetails',
			value: function showDetails(notification) {
				var state = {
					displayDetails: true,
					notificationDetails: notification
				};
				if (!this.state.isArchive && !notification.isRead) {
					this.notificationApi.markAsRead(notification.id);
					notification.isRead = true;
					state.notificationList = this.updatedNotificationList(notification);
					document.dispatchEvent(new CustomEvent('NotificationBell.ReadNotification'));
				}
				this.refs.heading && this.refs.heading.focus();
				this.setState(state);
			}
		}, {
			key: 'showList',
			value: function showList() {
				this.setState({
					displayDetails: false
				});
			}
		}, {
			key: 'appendArchiveList',
			value: function appendArchiveList(archivedNotification) {
				if (!this.state.displayDetails) {
					document.dispatchEvent(new CustomEvent('NotificationBell.ReadNotification'));
				}
				var newList = this.state.list.filter(function (notification) {
					if (notification.id !== archivedNotification.id) {
						return notification;
					}
				});
				var newArchiveList = this.state.archivedList;
				this.notificationApi.markAsArchivedAndRead(archivedNotification.id);
				archivedNotification.status = 'ARCHIVED';
				archivedNotification.isRead = true;
				newArchiveList.push(archivedNotification);
				this.setState({
					archivedList: newArchiveList,
					list: newList,
					notificationList: newList,
					displayDetails: false
				});
			}
		}, {
			key: 'goToArchiveList',
			value: function goToArchiveList() {
				this.setState({
					list: this.state.archivedList,
					isArchive: true
				});
			}
		}, {
			key: 'updatedNotificationList',
			value: function updatedNotificationList() {
				this.setState({
					list: this.state.notificationList,
					isArchive: false
				});
			}
		}, {
			key: 'updateNotification',
			value: function updateNotification(notification) {
				var newList = this.state.list;
				for (var i = 0; i < newList.length; i++) {
					if (newList[i].id === notification.id) {
						newList[i] = notification;
						break;
					}
				}
				return newList;
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'div',
						{ className: 'notification-title' },
						_react2.default.createElement(
							'div',
							{ tabIndex: -1, ref: 'heading' },
							_react2.default.createElement(_NotificationHeading2.default, { back: this.showList.bind(this), isList: !this.state.isArchive && !this.state.displayDetails,
								isDetails: this.state.displayDetails, isArchive: this.state.isArchive })
						)
					),
					_react2.default.createElement(
						'div',
						{ className: this.state.displayDetails ? 'hide' : '' },
						_react2.default.createElement(_NotificationList2.default, { list: this.state.list, closeDrawer: this.props.closeDrawer, apiConfig: this.props.config, showDetails: this.showDetails.bind(this),
							appendArchiveList: this.appendArchiveList.bind(this), isArchiveTray: this.state.isArchive, goToArchiveList: this.goToArchiveList.bind(this) })
					),
					_react2.default.createElement(
						'div',
						{ className: this.state.displayDetails ? '' : 'hide' },
						_react2.default.createElement(
							'div',
							{ className: 'notification-list' },
							_react2.default.createElement(_NotificationDetails2.default, { notification: this.state.notificationDetails, closeDrawer: this.props.closeDrawer, apiConfig: this.props.config, appendArchiveList: this.appendArchiveList.bind(this) })
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'notification-title', onClick: this.goToArchiveList.bind(this) },
						_react2.default.createElement(
							'h1',
							{ className: this.state.isArchive || this.state.displayDetails ? 'hide' : 'notification-title--heading' },
							_react2.default.createElement(
								'a',
								{ href: 'javascript:void(0);' },
								' Notification Archive '
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'notification-archive--back' },
						_react2.default.createElement(
							'button',
							{ onClick: this.state.isArchive && !this.state.displayDetails ? this.updatedNotificationList.bind(this) : this.props.closeDrawer },
							' ',
							_react2.default.createElement('i', { className: this.state.isArchive && !this.state.displayDetails ? 'pe-icon--chevron-down pointer' : 'pe-icon--times close-dropdown pointer' }),
							' '
						)
					)
				);
			}
		}]);

		return NotificationContainer;
	}(_react2.default.Component);

	exports.default = NotificationContainer;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _NotificationNode = __webpack_require__(14);

	var _NotificationNode2 = _interopRequireDefault(_NotificationNode);

	var _DateParser = __webpack_require__(15);

	var _DateParser2 = _interopRequireDefault(_DateParser);

	var _NotificationBlankState = __webpack_require__(16);

	var _NotificationBlankState2 = _interopRequireDefault(_NotificationBlankState);

	var _NotificationApi = __webpack_require__(6);

	var _NotificationApi2 = _interopRequireDefault(_NotificationApi);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import Coachmark from 'o-coach-mark';

	var NotificationList = function (_React$Component) {
		_inherits(NotificationList, _React$Component);

		function NotificationList(props) {
			_classCallCheck(this, NotificationList);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NotificationList).call(this, props));

			_this.notApi = new _NotificationApi2.default(_this.props.apiConfig);
			return _this;
		}

		_createClass(NotificationList, [{
			key: 'showDetails',
			value: function showDetails(notification) {
				this.props.showDetails(notification);
			}
		}, {
			key: 'onArchived',
			value: function onArchived(notification) {
				this.props.appendArchiveList(notification);
			}
		}, {
			key: 'goToArchiveList',
			value: function goToArchiveList() {
				this.props.goToArchiveList();
			}
			/**
	   * Render
	   **/

		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var notificationNodeObjects = {};
				if (this.props.list.length > 0) {
					notificationNodeObjects = this.props.list.map(function (notification) {
						var time = _DateParser2.default.getFormatDateString(new Date(notification.createdAt));
						return _react2.default.createElement(_NotificationNode2.default, { key: notification.id, detailsClick: _this2.showDetails.bind(_this2, notification),
							title: notification.message.title.substring(0, 50) + '...', summary: notification.message.body.substring(0, 30) + '...',
							archivedNotification: _this2.onArchived.bind(_this2, notification), trashIconDisable: _this2.props.isArchiveTray, time: time,
							isRead: notification.isRead, source: notification.message.source });
					});
				}
				if (!this.props.list.length > 0) {
					notificationNodeObjects = _react2.default.createElement(_NotificationBlankState2.default, { isArchivedTray: this.props.isArchiveTray, goToArchiveList: this.goToArchiveList.bind(this) });
				}

				return _react2.default.createElement(
					'div',
					{ className: 'notification-list' },
					notificationNodeObjects
				);
			}
		}]);

		return NotificationList;
	}(_react2.default.Component);

	exports.default = NotificationList;
	;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NotificationNode = function (_React$Component) {
		_inherits(NotificationNode, _React$Component);

		function NotificationNode(props) {
			_classCallCheck(this, NotificationNode);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(NotificationNode).call(this, props));
		}

		_createClass(NotificationNode, [{
			key: 'setArchivedNotification',
			value: function setArchivedNotification() {
				this.props.archivedNotification();
			}

			// when we hook up the course meta data.  We need to limit the course to not let it wrap.

		}, {
			key: 'render',
			value: function render() {
				var background = 'notification-node';
				if (this.props.isRead) {
					background += ' notification-node--isread';
				}
				return _react2.default.createElement(
					'div',
					{ className: background },
					_react2.default.createElement(
						'a',
						{ href: 'javascript:void(0)', className: 'notification-node--no-decoration', onClick: this.props.detailsClick },
						_react2.default.createElement(
							'div',
							{ className: 'notification-node--details' },
							_react2.default.createElement(
								'div',
								{ className: 'notification-node--summary' },
								_react2.default.createElement(
									'h1',
									null,
									' ',
									this.props.title,
									' '
								),
								_react2.default.createElement(
									'div',
									{ className: 'notification-node--summary-description' },
									this.props.summary
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'notification-node--meta' },
								_react2.default.createElement(
									'div',
									{ className: 'notification-node--meta-course' },
									this.props.time,
									this.props.source ? ' · ' : '',
									this.props.source
								)
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'notification-node--dismiss' },
						_react2.default.createElement(
							'button',
							{ className: this.props.trashIconDisable ? 'hide' : '', onClick: this.setArchivedNotification.bind(this) },
							_react2.default.createElement('i', { className: 'pe-icon--archive' })
						)
					)
				);
			}
		}]);

		return NotificationNode;
	}(_react2.default.Component);

	exports.default = NotificationNode;
	;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	var dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	module.exports = {

	    getFormatDateString: function getFormatDateString(updatedAt) {

	        var difference = (new Date() - updatedAt) / 1000 / 60; // in minutes
	        if (difference >= 60) {
	            difference = difference / 60;
	            if (difference >= 24) {
	                return dayOfWeek[updatedAt.getDay()] + ', ' + month[updatedAt.getMonth()] + ' ' + updatedAt.getDate() + ', ' + updatedAt.getFullYear();
	            }
	            return parseInt(difference) + ' hr';
	        }

	        return parseInt(difference) + ' min';
	    }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _CoachmarkApi = __webpack_require__(17);

	var _CoachmarkApi2 = _interopRequireDefault(_CoachmarkApi);

	var _FeedbackApi = __webpack_require__(18);

	var _FeedbackApi2 = _interopRequireDefault(_FeedbackApi);

	var _NotificationApi = __webpack_require__(6);

	var _NotificationApi2 = _interopRequireDefault(_NotificationApi);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NotificationBlankState = function (_React$Component) {
	    _inherits(NotificationBlankState, _React$Component);

	    function NotificationBlankState(props) {
	        _classCallCheck(this, NotificationBlankState);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NotificationBlankState).call(this, props));
	    }

	    _createClass(NotificationBlankState, [{
	        key: 'archiveList',
	        value: function archiveList() {
	            this.props.goToArchiveList();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            if (!this.props.isArchivedTray) {
	                return _react2.default.createElement(
	                    'div',
	                    { className: 'notification-blank-page' },
	                    _react2.default.createElement(
	                        'h2',
	                        null,
	                        'Nothing Yet!'
	                    ),
	                    _react2.default.createElement(
	                        'h3',
	                        null,
	                        'We’ll let you know when',
	                        _react2.default.createElement('br', null),
	                        'something comes up. Till then,',
	                        _react2.default.createElement('br', null),
	                        'find previous notifications in your',
	                        _react2.default.createElement('br', null),
	                        _react2.default.createElement(
	                            'a',
	                            { href: 'javascript:void(0);', onClick: this.archiveList.bind(this) },
	                            ' Archive. '
	                        )
	                    )
	                );
	            }

	            return _react2.default.createElement(
	                'div',
	                { className: 'notification-blank-page' },
	                _react2.default.createElement(
	                    'h2',
	                    null,
	                    'Nothing Here!'
	                ),
	                _react2.default.createElement(
	                    'h3',
	                    null,
	                    'This is where you will see your',
	                    _react2.default.createElement('br', null),
	                    'archived notifications.'
	                )
	            );
	        }
	    }]);

	    return NotificationBlankState;
	}(_react2.default.Component);

	exports.default = NotificationBlankState;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CoachmarkApi = function () {
		function CoachmarkApi(config) {
			_classCallCheck(this, CoachmarkApi);

			this.url = config.cmApiUrl;
			this.xAuth = config.cmPiToken;
			this.contentType = config.cmContentTypeHeader;
		}

		/**
	  * Gets a coachmark by id
	  **/


		_createClass(CoachmarkApi, [{
			key: 'getCoachmark',
			value: function getCoachmark(cmId) {
				var _this = this;

				var response = new Promise(function (resolve, reject) {
					var request = new Request(_this.url + '/coachmark/' + cmId, {
						method: 'GET',
						mode: 'cors',
						headers: {
							'X-Authorization': _this.xAuth,
							'Content-Type': _this.contentType
						}
					});
					fetch(request).then(function (response) {
						return response.json();
					}).then(function (coachmark) {
						if (!coachmark.options.id) {
							coachmark.options.id = cmId;
						}
						resolve(coachmark);
					}).catch(function (error) {
						console.log('onError: ', error);
						reject(error);
					});
				});
				return response;
			}

			/**
	   * Tracks how many times a coachmark has been viewed
	   **/

		}, {
			key: 'incrementViewCount',
			value: function incrementViewCount(cmId) {
				var _this2 = this;

				var response = new Promise(function (resolve, reject) {
					var request = new Request(_this2.url + '/coachmark/' + cmId + '/increment', {
						method: 'PUT',
						mode: 'cors',
						headers: new Headers({
							'X-Authorization': _this2.xAuth,
							'Content-Type': _this2.contentType
						})
					});
					fetch(request).then(function (response) {
						resolve(response);
					}).catch(function (error) {
						console.log('onError: ', error);
						reject(error);
					});
				});
				return response;
			}
		}]);

		return CoachmarkApi;
	}();

	exports.default = CoachmarkApi;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FeedbackApi = function () {
		function FeedbackApi(config) {
			_classCallCheck(this, FeedbackApi);

			this.url = config.fbApiUrl;
			this.xAuth = config.fbPiToken;
			this.acceptHeader = config.fbAcceptHeader;
			this.contentType = config.fbContentTypeHeader;
		}

		_createClass(FeedbackApi, [{
			key: 'submitFeedback',
			value: function submitFeedback(masterpieceId, userId, targetUserRole, comment, likeDislike) {
				var _this = this;

				var response = new Promise(function (resolve, reject) {
					var payload = {
						masterpieceId: masterpieceId,
						userId: userId,
						groupAuthType: targetUserRole,
						comment: comment,
						like: likeDislike === 'like' ? 'L' : 'D'
					};
					var request = new Request(_this.url + '/feedback', {
						method: 'POST',
						mode: 'cors',
						body: JSON.stringify(payload),
						headers: {
							'X-Authorization': _this.xAuth,
							'Content-Type': _this.contentType
						}
					});
					fetch(request).then(function (response) {
						resolve(response);
					}).catch(function (error) {
						console.log('onError: ', error);
						reject(error);
					});
				});
				return response;
			}
		}]);

		return FeedbackApi;
	}();

	exports.default = FeedbackApi;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _CoachmarkListener = __webpack_require__(20);

	var _CoachmarkListener2 = _interopRequireDefault(_CoachmarkListener);

	var _DateParser = __webpack_require__(15);

	var _DateParser2 = _interopRequireDefault(_DateParser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NotificationDetails = function (_React$Component) {
		_inherits(NotificationDetails, _React$Component);

		function NotificationDetails(props) {
			_classCallCheck(this, NotificationDetails);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(NotificationDetails).call(this, props));
		}

		_createClass(NotificationDetails, [{
			key: 'launchCoachmark',
			value: function launchCoachmark() {
				new _CoachmarkListener2.default(this.props.apiConfig).launchCoachmark(this.props.notification);
				this.props.closeDrawer();
			}
		}, {
			key: 'archiveItem',
			value: function archiveItem() {
				this.props.appendArchiveList(this.props.notification);
			}
		}, {
			key: 'render',
			value: function render() {
				var tourButton = '';
				if (this.props.notification.message.cmIds) {
					var tourButtonText = this.props.notification.message.tourButtonText;
					tourButtonText = tourButtonText ? tourButtonText : 'Take the tour';
					tourButton = _react2.default.createElement(
						'button',
						{ onClick: this.launchCoachmark.bind(this), className: 'notification-details--button' },
						tourButtonText
					);
				}

				var archiveCss = 'notification-details--archive';
				if (this.props.notification.status === 'ARCHIVED') {
					archiveCss += ' hide';
				}

				return _react2.default.createElement(
					'div',
					{ className: 'notification-details' },
					_react2.default.createElement(
						'div',
						{ className: 'notification-details__meta' },
						_react2.default.createElement(
							'div',
							{ className: 'noticiation-details__meta--source' },
							this.props.notification.message.source
						),
						_react2.default.createElement(
							'div',
							{ className: 'notification-details__meta--time' },
							_DateParser2.default.getFormatDateString(new Date(this.props.notification.createdAt))
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'notification-details--title' },
						_react2.default.createElement(
							'h1',
							null,
							this.props.notification.message.title
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'notification-details--body' },
						this.props.notification.message.body
					),
					tourButton,
					_react2.default.createElement(
						'div',
						{ className: 'notification-details--align' },
						_react2.default.createElement(
							'a',
							{ href: 'javascript:void(0);', onClick: this.archiveItem.bind(this), className: archiveCss },
							_react2.default.createElement('i', { className: 'pe-icon--archive' }),
							' Archive this Notification '
						)
					)
				);
			}
		}]);

		return NotificationDetails;
	}(_react2.default.Component);

	exports.default = NotificationDetails;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _coachMark = __webpack_require__(21);

	var _coachMark2 = _interopRequireDefault(_coachMark);

	var _CoachmarkApi = __webpack_require__(17);

	var _CoachmarkApi2 = _interopRequireDefault(_CoachmarkApi);

	var _FeedbackApi = __webpack_require__(18);

	var _FeedbackApi2 = _interopRequireDefault(_FeedbackApi);

	var _NotificationApi = __webpack_require__(6);

	var _NotificationApi2 = _interopRequireDefault(_NotificationApi);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CoachmarkListener = function () {
	    function CoachmarkListener(config) {
	        _classCallCheck(this, CoachmarkListener);

	        this.coachmarkApi = new _CoachmarkApi2.default(config);
	        this.feedbackApi = new _FeedbackApi2.default(config);
	        this.notificationApi = new _NotificationApi2.default(config);
	    }

	    /**
	     * Entry point from user interaction with the UI,
	     * launches the first CM in the set contained in the triggering notification
	     **/


	    _createClass(CoachmarkListener, [{
	        key: 'launchCoachmark',
	        value: function launchCoachmark(notification) {
	            var notificationDetails = notification.message;
	            var cmIds = notificationDetails.cmIds;
	            cmIds = cmIds ? cmIds.split(',') : null;

	            if (!cmIds) {
	                return;
	            }

	            var masterpieceId = notificationDetails.masterpieceId;
	            if (!masterpieceId) {
	                return;
	            }

	            cmIds = cmIds.map(function (param) {
	                return parseInt(param);
	            });
	            masterpieceId = parseInt(notificationDetails.masterpieceId);
	            this.cmState = {};
	            this.cmState[masterpieceId] = {
	                userNotificationId: notification.id,
	                userId: notification.recipientId,
	                targetUserRole: notificationDetails.targetUserRole ? notificationDetails.targetUserRole : 'N/A',
	                masterpieceId: masterpieceId,
	                cmIds: cmIds,
	                index: 0,
	                isVisited: {},
	                likeCmSeries: '',
	                areListenersSet: false
	            };

	            this.cmListenerSetup(masterpieceId);
	            this.getDisplayCoachmark(masterpieceId);
	        }

	        /**
	         * Sets up listeners for this series of coachmarks
	         **/

	    }, {
	        key: 'cmListenerSetup',
	        value: function cmListenerSetup(masterpieceId) {
	            if (this.cmState[masterpieceId].areListenersSet) {
	                return;
	            }
	            this.setupBackNextListener(masterpieceId);
	            this.setupLikeListener(masterpieceId);
	            this.setupSubmitListener(masterpieceId);
	            this.setupCancelListener(masterpieceId);

	            this.cmState[masterpieceId].areListenersSet = true;
	        }

	        /**
	         * Gets data from the API and displays a coachmark on the correct page
	         **/

	    }, {
	        key: 'getDisplayCoachmark',
	        value: function getDisplayCoachmark(masterpieceId) {
	            var cmId = parseInt(this.cmState[masterpieceId].cmIds[this.cmState[masterpieceId].index]);

	            this.coachmarkApi.getCoachmark(cmId).then(function (result) {
	                if (this.redirectIfNewUri(result.uri, masterpieceId)) {
	                    return;
	                }

	                var cm = new _coachMark2.default(document.getElementById(result.element), result.options, function () {
	                    this.notificationApi.markAsRead(this.cmState[masterpieceId].userNotificationId);
	                    this.closeCoachmark(cm.element.nextSibling);
	                }.bind(this));

	                if (!this.cmState[masterpieceId].isVisited[cmId]) {
	                    this.coachmarkApi.incrementViewCount(cmId);
	                    this.cmState[masterpieceId].isVisited[cmId] = true;
	                }
	            }.bind(this), function (error) {
	                console.log('Error: ', error);
	            });
	        }

	        /**
	         * Entry point if details in local storage. Runs on each page load.
	         * If we placed details in local storage in order to keep state for a redirect to a new url,
	         * this function will read those values and launch a coachmark right were we left off.
	         * Otherwise, we return false and do nothing.
	         **/

	    }, {
	        key: 'launchCoachmarkIfFromNewUrl',
	        value: function launchCoachmarkIfFromNewUrl() {
	            var fromLocal = localStorage.getItem('notifications.coachmark.stateObject');
	            localStorage.removeItem('notifications.coachmark.stateObject');
	            if (!fromLocal) {
	                return false;
	            }
	            try {
	                fromLocal = JSON.parse(fromLocal);
	            } catch (e) {
	                console.log('Exception parsing JSON from local storage: ', e);
	            }

	            if (!fromLocal.masterpieceId) {
	                return false; // We aren't here because of a redirect
	            }
	            fromLocal.masterpieceId = parseInt(fromLocal.masterpieceId);
	            fromLocal.cmIds = fromLocal.cmIds.map(function (param) {
	                return parseInt(param);
	            });
	            fromLocal.index = parseInt(fromLocal.index);
	            this.cmState = {};
	            this.cmState[fromLocal.masterpieceId] = fromLocal;
	            this.cmListenerSetup(fromLocal.masterpieceId);
	            this.getDisplayCoachmark(fromLocal.masterpieceId);
	            return true;
	        }

	        /**
	         * Sets up the back/next listener
	         **/

	    }, {
	        key: 'setupBackNextListener',
	        value: function setupBackNextListener(masterpieceId) {
	            var cmIds = this.cmState[masterpieceId].cmIds;
	            document.addEventListener('o-cm-backNext-clicked', function (event) {
	                var eventIndex = cmIds.indexOf(event.data.id);
	                if (eventIndex !== this.cmState[masterpieceId].index) {
	                    return; // event wasn't meant for this instance of this listener
	                }
	                this.closeCoachmark(event.target.nextSibling); // close the current CM
	                if (eventIndex + 1 <= cmIds.length && event.data.type === 'nextButton') {
	                    eventIndex++;
	                }
	                if (eventIndex > 0 && event.data.type === 'backButton') {
	                    eventIndex--;
	                }
	                this.cmState[masterpieceId].index = eventIndex;
	                this.getDisplayCoachmark(masterpieceId);
	            }.bind(this));
	        }

	        /**
	         * Sets up the like button listener
	         **/

	    }, {
	        key: 'setupLikeListener',
	        value: function setupLikeListener(masterpieceId) {
	            var cmIds = this.cmState[masterpieceId].cmIds;
	            document.addEventListener('o-cm-like-clicked', function (event) {
	                if (cmIds.indexOf(event.data.id) !== this.cmState[masterpieceId].index) {
	                    return; // event wasn't meant for this instance of this listener
	                }
	                this.cmState[masterpieceId].likeCmSeries = event.data.type;
	            }.bind(this));
	        }

	        /**
	         * Sets up the submit button listener
	         **/

	    }, {
	        key: 'setupSubmitListener',
	        value: function setupSubmitListener(masterpieceId) {
	            var cmIds = this.cmState[masterpieceId].cmIds;
	            document.addEventListener('o-cm-submit-clicked', function (event) {
	                if (cmIds.indexOf(event.data.id) !== this.cmState[masterpieceId].index) {
	                    return; // event wasn't meant for this instance of this listener
	                }
	                this.feedbackApi.submitFeedback(masterpieceId, this.cmState[masterpieceId].userId, this.cmState[masterpieceId].targetUserRole, event.data.payload, this.cmState[masterpieceId].likeCmSeries);
	                this.notificationApi.markAsRead(this.cmState[masterpieceId].userNotificationId);
	                this.closeCoachmark(event.target.nextSibling);
	            }.bind(this));
	        }

	        /**
	         * Sets up the cancel (return to like/dislike button) listener
	         **/

	    }, {
	        key: 'setupCancelListener',
	        value: function setupCancelListener(masterpieceId) {
	            var cmIds = this.cmState[masterpieceId].cmIds;
	            document.addEventListener('o-cm-cancel-clicked', function (event) {
	                if (cmIds.indexOf(event.data.id) !== this.cmState[masterpieceId].index) {
	                    return; // event wasn't meant for this instance of this listener
	                }
	                this.cmState[masterpieceId].likeCmSeries = '';
	            }.bind(this));
	        }

	        /**
	         * if the current uri and the uri passed in do not match,
	         * store state in local storage and redirect to the new uri
	         **/

	    }, {
	        key: 'redirectIfNewUri',
	        value: function redirectIfNewUri(uri, masterpieceId) {
	            if (!uri) {
	                return false;
	            }
	            // String.startsWith pollyfill for Safari
	            if (!String.prototype.startsWith) {
	                String.prototype.startsWith = function (searchString, position) {
	                    position = position || 0;
	                    return this.substr(position, searchString.length) === searchString;
	                };
	            }
	            // if relative, change to absolute using current domain
	            var currentUri = window.location.href;
	            if (!uri.toLowerCase().startsWith('http')) {
	                var arr = currentUri.split('/');
	                var domain = arr[0] + '//' + arr[2];
	                uri = domain + '/' + uri;
	            }
	            // Redirect only if the target url and current url don't match
	            if (uri === currentUri) {
	                return false;
	            }
	            // Set local storage
	            this.cmState[masterpieceId].areListenersSet = false;
	            localStorage.setItem('notifications.coachmark.stateObject', JSON.stringify(this.cmState[masterpieceId]));

	            window.location.href = uri;
	            return true;
	        }

	        /**
	         * Removes a coachmark associated with the target node from the DOM
	         **/

	    }, {
	        key: 'closeCoachmark',
	        value: function closeCoachmark(coachmarkNode) {
	            // Verify the node. This is important because we don't want to delete the wrong node.
	            if (coachmarkNode === coachmarkNode.getElementsByClassName('o-coach-mark__container')[0].parentNode) {
	                coachmarkNode.parentNode.removeChild(coachmarkNode);
	            }
	        }
	    }]);

	    return CoachmarkListener;
	}();

	exports.default = CoachmarkListener;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	!function (e, t) {
	  if ("object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module))) module.exports = t();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {
	    var o = t();for (var r in o) {
	      ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports : e)[r] = o[r];
	    }
	  }
	}(undefined, function () {
	  return function (e) {
	    function t(r) {
	      if (o[r]) return o[r].exports;var n = o[r] = { exports: {}, id: r, loaded: !1 };return e[r].call(n.exports, n, n.exports, t), n.loaded = !0, n.exports;
	    }var o = {};return t.m = e, t.c = o, t.p = "", t(0);
	  }([function (e, t, o) {
	    e.exports = o(3);
	  }, function (e, t) {
	    "use strict";
	    e.exports = function () {
	      var e = [];return e.toString = function () {
	        for (var e = [], t = 0; t < this.length; t++) {
	          var o = this[t];o[2] ? e.push("@media " + o[2] + "{" + o[1] + "}") : e.push(o[1]);
	        }return e.join("");
	      }, e.i = function (t, o) {
	        "string" == typeof t && (t = [[null, t, ""]]);for (var r = {}, n = 0; n < this.length; n++) {
	          var a = this[n][0];"number" == typeof a && (r[a] = !0);
	        }for (n = 0; n < t.length; n++) {
	          var i = t[n];"number" == typeof i[0] && r[i[0]] || (o && !i[2] ? i[2] = o : o && (i[2] = "(" + i[2] + ") and (" + o + ")"), e.push(i));
	        }
	      }, e;
	    };
	  }, function (e, t, o) {
	    function r(e, t) {
	      for (var o = 0; o < e.length; o++) {
	        var r = e[o],
	            n = u[r.id];if (n) {
	          n.refs++;for (var a = 0; a < n.parts.length; a++) {
	            n.parts[a](r.parts[a]);
	          }for (; a < r.parts.length; a++) {
	            n.parts.push(l(r.parts[a], t));
	          }
	        } else {
	          for (var i = [], a = 0; a < r.parts.length; a++) {
	            i.push(l(r.parts[a], t));
	          }u[r.id] = { id: r.id, refs: 1, parts: i };
	        }
	      }
	    }function n(e) {
	      for (var t = [], o = {}, r = 0; r < e.length; r++) {
	        var n = e[r],
	            a = n[0],
	            i = n[1],
	            c = n[2],
	            s = n[3],
	            l = { css: i, media: c, sourceMap: s };o[a] ? o[a].parts.push(l) : t.push(o[a] = { id: a, parts: [l] });
	      }return t;
	    }function a(e, t) {
	      var o = b(),
	          r = g[g.length - 1];if ("top" === e.insertAt) r ? r.nextSibling ? o.insertBefore(t, r.nextSibling) : o.appendChild(t) : o.insertBefore(t, o.firstChild), g.push(t);else {
	        if ("bottom" !== e.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");o.appendChild(t);
	      }
	    }function i(e) {
	      e.parentNode.removeChild(e);var t = g.indexOf(e);t >= 0 && g.splice(t, 1);
	    }function c(e) {
	      var t = document.createElement("style");return t.type = "text/css", a(e, t), t;
	    }function s(e) {
	      var t = document.createElement("link");return t.rel = "stylesheet", a(e, t), t;
	    }function l(e, t) {
	      var o, r, n;if (t.singleton) {
	        var a = x++;o = v || (v = c(t)), r = d.bind(null, o, a, !1), n = d.bind(null, o, a, !0);
	      } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (o = s(t), r = f.bind(null, o), n = function n() {
	        i(o), o.href && URL.revokeObjectURL(o.href);
	      }) : (o = c(t), r = p.bind(null, o), n = function n() {
	        i(o);
	      });return r(e), function (t) {
	        if (t) {
	          if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;r(e = t);
	        } else n();
	      };
	    }function d(e, t, o, r) {
	      var n = o ? "" : r.css;if (e.styleSheet) e.styleSheet.cssText = k(t, n);else {
	        var a = document.createTextNode(n),
	            i = e.childNodes;i[t] && e.removeChild(i[t]), i.length ? e.insertBefore(a, i[t]) : e.appendChild(a);
	      }
	    }function p(e, t) {
	      var o = t.css,
	          r = t.media;if (r && e.setAttribute("media", r), e.styleSheet) e.styleSheet.cssText = o;else {
	        for (; e.firstChild;) {
	          e.removeChild(e.firstChild);
	        }e.appendChild(document.createTextNode(o));
	      }
	    }function f(e, t) {
	      var o = t.css,
	          r = t.sourceMap;r && (o += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */");var n = new Blob([o], { type: "text/css" }),
	          a = e.href;e.href = URL.createObjectURL(n), a && URL.revokeObjectURL(a);
	    }var u = {},
	        h = function h(e) {
	      var t;return function () {
	        return "undefined" == typeof t && (t = e.apply(this, arguments)), t;
	      };
	    },
	        m = h(function () {
	      return (/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())
	      );
	    }),
	        b = h(function () {
	      return document.head || document.getElementsByTagName("head")[0];
	    }),
	        v = null,
	        x = 0,
	        g = [];e.exports = function (e, t) {
	      t = t || {}, "undefined" == typeof t.singleton && (t.singleton = m()), "undefined" == typeof t.insertAt && (t.insertAt = "bottom");var o = n(e);return r(o, t), function (e) {
	        for (var a = [], i = 0; i < o.length; i++) {
	          var c = o[i],
	              s = u[c.id];s.refs--, a.push(s);
	        }if (e) {
	          var l = n(e);r(l, t);
	        }for (var i = 0; i < a.length; i++) {
	          var s = a[i];if (0 === s.refs) {
	            for (var d = 0; d < s.parts.length; d++) {
	              s.parts[d]();
	            }delete u[s.id];
	          }
	        }
	      };
	    };var k = function () {
	      var e = [];return function (t, o) {
	        return e[t] = o, e.filter(Boolean).join("\n");
	      };
	    }();
	  }, function (e, t, o) {
	    "use strict";
	    function r(e) {
	      return e && e.__esModule ? e["default"] : e;
	    }Object.defineProperty(t, "__esModule", { value: !0 }), o(8);var n = o(6);t["default"] = r(n), e.exports = t["default"];
	  }, function (e, t, o) {
	    "use strict";
	    function r(e) {
	      return e && e.__esModule ? e["default"] : e;
	    }Object.defineProperty(t, "__esModule", { value: !0 });var n = o(5);t["default"] = r(n), e.exports = t["default"];
	  }, function (e, t) {
	    "use strict";
	    function o(e, t) {
	      for (var o = 0; o < l.length; o++) {
	        if (l[o].className === e) return void 0 !== t && (l[o] = t), l[o];
	      }return !1;
	    }function r(e, t) {
	      if (void 0 === e && void 0 === t) for (var a = 0; a < l.length; a++) {
	        r(l[a].className, l[a].cssClass);
	      } else {
	        if (void 0 === t) {
	          var i = o(e);i && (t = i.cssClass);
	        }for (var c = document.querySelectorAll("." + t), s = 0; s < c.length; s++) {
	          n(c[s], e);
	        }
	      }
	    }function n(e, t) {
	      if (void 0 !== t) {
	        var r = e.getAttribute("data-upgraded");if (null === r || -1 === r.indexOf(t)) {
	          null === r ? r = "" : r += ",", e.setAttribute("data-upgraded", r + t);var a = o(t);if (a) {
	            var i = a.classConstructor,
	                c = new i(e);d.push(c), p.set(e, c), a.callbacks.forEach(function (t) {
	              t(e);
	            });
	          } else {
	            var c = new window[t](e);d.push(c), p.set(e, c);
	          }
	        }
	      } else for (var s = 0; s < l.length; s++) {
	        var f = e.getAttribute("class").split(" ");f.indexOf(l[s].cssClass) >= 0 && n(e, l[s].className);
	      }
	    }function a(e, t) {
	      return t && p.has(e) ? p.get(e) : null;
	    }function i(e) {
	      var t = { classConstructor: e.constructor, className: e.classAsString, cssClass: e.cssClass, callbacks: [] },
	          n = o(e.classAsString, t);n || l.push(t), r(e.classAsString, e.cssClass);
	    }function c(e, t) {
	      var r = o(e);r && r.callbacks.push(t);
	    }function s() {
	      for (var e = 0; e < l.length; e++) {
	        r(l[e].className);
	      }
	    }Object.defineProperty(t, "__esModule", { value: !0 });var l = [],
	        d = [],
	        p = new WeakMap();t["default"] = { upgradeDom: r, upgradeElement: n, upgradeAllRegistered: s, getInstance: a, registerUpgradedCallback: c, register: i }, e.exports = t["default"];
	  }, function (e, t, o) {
	    "use strict";
	    function r(e) {
	      return e && e.__esModule ? e : { "default": e };
	    }function n(e, t) {
	      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
	    }Object.defineProperty(t, "__esModule", { value: !0 });var a = o(4),
	        i = r(a),
	        c = function s(e, t, o) {
	      function r(o, r, n) {
	        var a = void 0;document.createEvent ? (a = document.createEvent("HTMLEvents"), a.initEvent(r, !0, !0)) : (a = document.createEventObject(), a.eventType = r), a.eventName = r, a.data = { type: o, id: t.id, payload: n }, document.createEvent ? e.dispatchEvent(a) : e.fireEvent("on" + a.eventType, a);
	      }function a() {
	        var t = e.getBoundingClientRect(),
	            o = m.offsetHeight + 10,
	            r = d.offsetWidth,
	            n = (t.right + t.left) / 2 + t.left + "px",
	            a = (t.bottom - t.top) / 2 + t.top + "px";switch (d.style.visibility = "hidden", c) {case "bottom":
	            d.style.top = t.bottom + "px", d.style.left = n;break;case "top":
	            d.style.top = t.top - o + "px", d.style.left = n;break;case "right":
	            d.style.top = a, d.style.left = t.right + window.pageXOffset + "px";break;case "left":
	            d.style.top = a, d.style.left = t.left + window.pageXOffset - r + "px";}d.style.visibility = "visible";
	      }var i = this;if (n(this, s), this.element = e, this.opts = t, this.callback = o, !t) throw new Error("missing required parameter: you must include an options object");if (!t.text) throw new Error("missing required option: you must specify text for the coach mark");if (!t.id) throw new Error("missing required option: you must specify a unique id for the coach mark");if (!e) throw new Error("missing required option: element");var c = function () {
	        var t = document.body,
	            o = document.documentElement,
	            r = Math.max(t.scrollHeight, t.offsetHeight, o.clientHeight, o.scrollHeight, o.offsetHeight),
	            n = e.getBoundingClientRect(),
	            a = n.top < 50,
	            i = n.left < 50,
	            c = window.innerWidth - n.right < 50,
	            s = n.bottom + 50 > r;return a ? "bottom" : s ? "top" : i && c ? "bottom" : c ? "left" : i ? "right" : "bottom";
	      }(),
	          l = document.createElement("div");l.style.display = "inline-block";var d = document.createElement("div"),
	          p = document.createElement("button"),
	          f = document.createElement("span"),
	          u = document.createElement("span"),
	          h = document.createElement("div"),
	          m = document.createElement("div"),
	          b = document.createElement("p"),
	          v = "textContent" in h ? "textContent" : "innerText";if (h.className = "o-coach-mark__title", t.title && (h[v] = t.title), p.className = "o-coach-mark__close-icon", f[v] = "✕", f.setAttribute("aria-hidden", "true"), p.appendChild(f), u.className = "o-coach-mark__sr-hidden", u[v] = t.srText || "close this coach mark", p.appendChild(u), d.className = "o-coach-mark__container", d.style.visibility = "hidden", d.style.display = "block", d.style.position = "absolute", m.style.margin = "0", m.className = "o-coach-mark__content", m.className += " o-coach-mark--" + c, m.appendChild(p), m.appendChild(h), b[v] = t.text, m.appendChild(b), t.hasBack || t.hasNext) {
	        var x = document.createElement("div"),
	            g = document.createElement("button"),
	            k = document.createElement("span"),
	            y = document.createElement("button"),
	            C = document.createElement("span"),
	            _ = document.createElement("span");g.setAttribute("type", "button"), g.className = "o-coach-mark__button-space", k[v] = "Back", g.appendChild(k), y.setAttribute("type", "button"), y.className = "o-coach-mark__next-button", C[v] = "Next", y.appendChild(C), _.className = "o-coach-mark__total-coachmarks", t.currentCM && t.totalCM && (_[v] = t.currentCM + "/" + t.totalCM), x.appendChild(g), x.appendChild(y), x.appendChild(_), m.appendChild(x), function (e, t, o) {
	          function n(e, t) {
	            e.onclick = function (e) {
	              r(t, "o-cm-backNext-clicked"), e.preventDefault();
	            };
	          }return o.hasNext && o.hasBack ? (n(e, "backButton"), void n(t, "nextButton")) : o.hasNext && !o.hasBack ? (e.disabled = !0, void n(t, "nextButton")) : !o.hasNext && o.hasBack ? (n(e, "backButton"), void (t.disabled = !0)) : void 0;
	        }(g, y, t);
	      }m.style.position = "relative", d.appendChild(m), t.like && !function () {
	        var e = void 0,
	            t = void 0;i.appendAnchor = function (o, n, a, i) {
	          var c = document.createElement("a");c.onclick = function (o) {
	            r(i, "o-cm-like-clicked"), e.style.display = "none", t.style.display = "block", o.preventDefault();
	          }, c.innerHTML = a, c.className = "o-coach-mark--link-text", c.setAttribute("href", "#");var s = document.createElement("i");s.className = "o-coach-mark--icons fa fa-thumbs-o-" + n, s.setAttribute("aria-hidden", "true"), c.insertBefore(s, c.childNodes[0]), o.appendChild(c);
	        };var o = document.createElement("hr"),
	            n = document.createElement("textarea"),
	            a = document.createElement("div"),
	            c = document.createElement("button"),
	            s = document.createElement("p"),
	            l = document.createElement("p"),
	            d = document.createElement("a");o.className = "o-coach-mark--hr", m.appendChild(o), e = document.createElement("div"), e.className = "o-coach-mark__like-div", s.innerHTML = "What do you think of this change?", e.appendChild(s), m.appendChild(e), i.appendAnchor(e, "down", "Not Great", "dislike"), i.appendAnchor(e, "up", "I Like It", "like"), t = document.createElement("div"), t.className = "o-coach-mark__feedback", l.innerHTML = "Thanks! Care to tell us more?", t.appendChild(l), c.innerHTML = "submit", c.onclick = function () {
	          r("submit", "o-cm-submit-clicked", n.value);
	        }, d.innerHTML = "cancel", d.setAttribute("href", "#"), d.onclick = function () {
	          r("cancel", "o-cm-cancel-clicked"), e.style.display = "block", t.style.display = "none";
	        }, t.appendChild(n), a.appendChild(c), a.appendChild(d), t.appendChild(a), m.appendChild(t);
	      }(), l.appendChild(d), e.parentNode.insertBefore(l, e.nextSibling), d.style.visibility = "visible", a(), window.addEventListener("resize", a), p.addEventListener("click", function (e) {
	        d.style.visibility = "hidden", o(t.id, e);
	      });
	    };t["default"] = c, i["default"].register({ constructor: c, classAsString: "CoachMark", cssClass: "o-coach-mark" }), e.exports = t["default"];
	  }, function (e, t, o) {
	    t = e.exports = o(1)(), t.push([e.id, ".o-coach-mark__container{min-width:250px;max-width:15%;max-height:10%;z-index:910;font-size:18px}.o-coach-mark__close-icon{float:right;color:#000;margin:0;padding:5px;background-color:transparent;border:0;cursor:pointer}.o-coach-mark__title{padding-bottom:7px}.o-coach-mark__button-space{margin-right:15px}.o-coach-mark__total-coachmarks{padding-left:80px}.o-coach-mark__content{box-shadow:2px 2px 2px 1px rgba(0,0,0,.2);border:1px solid #ffdf00;padding:15px;z-index:920;margin:10px;background-color:#fffbd7}.o-coach-mark__content p{margin:5px 0;font-size:smaller}.o-coach-mark--bottom:before{border-bottom:10px solid #ffdf00;top:0;z-index:930}.o-coach-mark--bottom:after,.o-coach-mark--bottom:before{border-left:10px solid transparent;border-right:10px solid transparent;margin-left:15px;margin-top:-10px;left:0}.o-coach-mark--bottom:after{border-bottom:10px solid #fffbd7;top:1px;z-index:940}.o-coach-mark--top:before{border-top:10px solid #ffdf00;bottom:-10px;z-index:930}.o-coach-mark--top:after,.o-coach-mark--top:before{border-left:10px solid transparent;border-right:10px solid transparent;margin-left:15px;left:0}.o-coach-mark--top:after{border-top:10px solid #fffbd7;bottom:-9px;z-index:940}.o-coach-mark--left:before{border-left:10px solid #ffdf00;margin-right:-10px;right:0;z-index:930}.o-coach-mark--left:after,.o-coach-mark--left:before{border-top:10px solid transparent;border-bottom:10px solid transparent;margin-top:15px;top:0}.o-coach-mark--left:after{display:hidden;border-left:10px solid #fffbd7;right:-9px;z-index:940}.o-coach-mark--right:before{border-right:10px solid #ffdf00;left:0;z-index:930}.o-coach-mark--right:after,.o-coach-mark--right:before{border-top:10px solid transparent;border-bottom:10px solid transparent;margin-left:-10px;margin-top:15px;top:0}.o-coach-mark--right:after{border-right:10px solid #fffbd7;left:1px;z-index:940}.o-coach-mark--bottom:after,.o-coach-mark--bottom:before,.o-coach-mark--left:after,.o-coach-mark--left:before,.o-coach-mark--right:after,.o-coach-mark--right:before,.o-coach-mark--top:after,.o-coach-mark--top:before{content:'';position:absolute;width:0;height:0}.o-coach-mark--link-text{color:#0d65a6;padding:5px;font-size:smaller}.o-coach-mark--hr{border-color:#eee9c1;border-style:ridge}.o-coach-mark--icons{padding:4px}.o-coach-mark__feedback{display:none}.o-coach-mark__feedback textarea{width:95%;height:50px}.o-coach-mark__feedback div a{font-size:12px;padding:0 10px}.o-coach-mark__sr-hidden{position:absolute!important;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px);padding:0!important;border:0!important;height:1px!important;width:1px!important;overflow:hidden}", ""]);
	  }, function (e, t, o) {
	    var r = o(7);"string" == typeof r && (r = [[e.id, r, ""]]);o(2)(r, {});r.locals && (e.exports = r.locals);
	  }]);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)(module)))

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _CoachmarkApi = __webpack_require__(17);

	var _CoachmarkApi2 = _interopRequireDefault(_CoachmarkApi);

	var _FeedbackApi = __webpack_require__(18);

	var _FeedbackApi2 = _interopRequireDefault(_FeedbackApi);

	var _NotificationApi = __webpack_require__(6);

	var _NotificationApi2 = _interopRequireDefault(_NotificationApi);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NotificationHeading = function (_React$Component) {
	    _inherits(NotificationHeading, _React$Component);

	    function NotificationHeading(props) {
	        _classCallCheck(this, NotificationHeading);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NotificationHeading).call(this, props));
	    }

	    _createClass(NotificationHeading, [{
	        key: 'render',
	        value: function render() {
	            if (this.props.isList) {
	                return _react2.default.createElement(
	                    'div',
	                    null,
	                    _react2.default.createElement(
	                        'h1',
	                        { className: 'notification-title--heading' },
	                        'Notifications'
	                    )
	                );
	            }

	            if (this.props.isDetails) {
	                return _react2.default.createElement(
	                    'div',
	                    null,
	                    _react2.default.createElement(
	                        'h1',
	                        { className: 'notification-title--heading', onClick: this.props.back },
	                        _react2.default.createElement(
	                            'a',
	                            { href: 'javascript:void(0);', className: 'notification-title--back' },
	                            _react2.default.createElement('i', { className: 'pe-icon--chevron-left' }),
	                            ' ',
	                            _react2.default.createElement(
	                                'span',
	                                { className: 'notification-title--back_align' },
	                                this.props.isArchive ? 'Back to Notifications Archive' : 'Back to Notifications'
	                            )
	                        )
	                    )
	                );
	            }
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'h1',
	                    { className: 'notification-title--heading' },
	                    'Notifications Archive'
	                )
	            );
	        }
	    }]);

	    return NotificationHeading;
	}(_react2.default.Component);

	exports.default = NotificationHeading;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/*global require, module*/
	'use strict';

	// bundled styling

	__webpack_require__(25);

	var Drawer = __webpack_require__(27);

	var constructAll = function constructAll() {
		Drawer.init();
		document.removeEventListener('o.InitAllDrawerElements', constructAll);
	};

	document.addEventListener('o.InitAllDrawerElements', constructAll);

	module.exports = Drawer;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(26);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./../../sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../../css-loader/index.js!./../../sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, ".o-drawer {\n  position: fixed;\n  background-color: #ffffff;\n  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.23);\n  overflow-x: hidden;\n  overflow-y: auto;\n  height: 100%;\n  width: 332px;\n  z-index: 995; }\n  .o-drawer.o-drawer-animated {\n    transition: all 0.4s ease; }\n  .o-drawer.o-drawer-left, .o-drawer.o-drawer-right {\n    top: 0px; }\n  .o-drawer.o-drawer-right {\n    right: -332px; }\n    .o-drawer.o-drawer-right.o-drawer-open {\n      right: 0px; }\n  .o-drawer.o-drawer-left {\n    left: -332px; }\n    .o-drawer.o-drawer-left.o-drawer-open {\n      left: 0px; }\n\n@media only screen and (max-width: 415px) {\n  .o-drawer {\n    width: 100%;\n    z-index: 995; }\n    .o-drawer.o-drawer-right {\n      right: -100%; }\n    .o-drawer.o-drawer-left {\n      left: -100%; } }\n", ""]);

	// exports


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint -W079 */

	'use strict';

	var DomDelegate = __webpack_require__(28);
	var WeakMap = __webpack_require__(30);

	var dispatchEvent = function dispatchEvent(element, name, data) {
		if (document.createEvent && element.dispatchEvent) {
			var event = document.createEvent('Event');
			event.initEvent(name, true, true);

			if (data) {
				event.detail = data;
			}

			element.dispatchEvent(event);
		}
	};

	function Drawer(el) {
		if (!(this instanceof Drawer)) {
			throw new TypeError('Constructor Drawer requires \'new\'');
		}
		if (!el) {
			throw new TypeError('missing required argument: element');
		}
		if (typeof el === 'string') {
			el = document.querySelector(el);
		}

		var triggerSelector = '[data-toggle="o-drawer"][href="#' + el.id + '"],' + '[data-toggle="o-drawer"][data-target="#' + el.id + '"]';

		this.target = el;
		this.currentTarget = false;
		this.trigger = document.querySelectorAll(triggerSelector);
		Drawer.cache.set(el, this);

		this.target.classList.add('o-drawer');

		var hasAlignmentClass = this.target.classList.contains('o-drawer-left') || this.target.classList.contains('o-drawer-right');

		if (!hasAlignmentClass) {
			this.target.classList.add('o-drawer-left');
		}
		this.target.setAttribute('aria-expanded', false);

		if (!Drawer.delegate) {
			var delegate = new DomDelegate(document.body);
			delegate.on('click', '[data-toggle="o-drawer"], [data-close="o-drawer"], [data-open="o-drawer"]', function handleClick(e) {
				e.preventDefault();

				var trigger = getTrigger(e.target);
				var target = getTargetFromTrigger(trigger);

				for (var i = 0, l = target.length; i < l; i++) {
					var t = target[i];
					var drawer = Drawer.cache.get(t);

					if (!drawer && t.getAttribute('data-o-component') === 'o-collapse') {
						drawer = new Drawer(t);
					}

					if (drawer) {
						var action = openCloseToggle(trigger);
						drawer[action]();
					}
				}
			});
			Drawer.delegate = delegate;
		}
		var _this = this;
		document.addEventListener('o.Drawer.RightDrawer', function () {
			if (_this.target.classList.contains('o-drawer-right') && !_this.currentTarget) {
				_this.close();
			}
			_this.currentTarget = false;
		});

		document.addEventListener('o.Drawer.LeftDrawer', function () {
			if (_this.target.classList.contains('o-drawer-left') && !_this.currentTarget) {
				_this.close();
			}
			_this.currentTarget = false;
		});

		return this;
	}

	Drawer.cache = new WeakMap();

	/**
	 * Initializes all drawer elements on the page or within
	 * the element passed in.
	 * @param	{HTMLElement|string} element DOM element or selector.
	 * @return {DropdownMenu[]} List of Drawer instances that
	 * have been initialized.
	 */
	Drawer.init = function (element) {
		var drawerEls = selectAll(element);
		var drawers = [];

		for (var i = 0, l = drawerEls.length; i < l; i++) {
			drawers.push(new Drawer(drawerEls[i]));
		}

		return drawers;
	};

	/**
	 * Destroy all Drawer Components on the page
	 */
	Drawer.destroy = function () {
		if (Drawer.bodyDelegate) {
			Drawer.bodyDelegate.destroy();
		}
	};

	/**
	 * Opens the Drawer
	 * @return {Drawer} self, for chainability
	 */

	Drawer.prototype.open = function () {
		this.currentTarget = true;
		if (this.target.classList.contains('o-drawer-right')) {
			dispatchEvent(this.target, 'o.Drawer.RightDrawer');
		}
		if (this.target.classList.contains('o-drawer-left')) {
			dispatchEvent(this.target, 'o.Drawer.LeftDrawer');
		}
		this.target.style.display = 'block';
		var t = this.target;
		setTimeout(function () {
			t.classList.add('o-drawer-open');
			t.setAttribute('aria-expanded', true);
		}, 50);

		dispatchEvent(this.target, 'oDrawer.open');
		return this;
	};

	/**
	* Closes the Drawer
	* @return {Drawer} self, for chainability
	*/

	Drawer.prototype.close = function () {
		this.target.classList.remove('o-drawer-open');
		this.target.setAttribute('aria-expanded', true);
		dispatchEvent(this.target, 'oDrawer.close');
		if (this.target.classList.contains('o-drawer-animated')) {
			var t = this.target;
			setTimeout(function () {
				t.style.display = 'none';
			}, 400);
		} else {
			this.target.style.display = 'none';
		}
		return this;
	};

	/**
	* Toggles the Drawer
	* @return {Drawer} self, for chainability
	*/

	Drawer.prototype.toggle = function () {
		var visible = this.target.classList.contains('o-drawer-open');
		if (visible) {
			this.close();
		} else {
			this.open();
		}
		return this;
	};

	function selectAll(element) {
		if (!element) {
			element = document.body;
		} else if (!(element instanceof HTMLElement)) {
			element = document.querySelectorAll(element)[0];
		}

		return element.querySelectorAll('[data-o-component="o-drawer"]');
	}

	function openCloseToggle(el) {
		if (el) {
			if (el.getAttribute('data-toggle') === 'o-drawer') {
				return 'toggle';
			} else if (el.getAttribute('data-close') === 'o-drawer') {
				return 'close';
			} else if (el.getAttribute('data-open') === 'o-drawer') {
				return 'open';
			}
		}
		return false;
	}

	function getTrigger(element) {
		while (element && element.getAttribute('data-toggle') !== 'o-drawer' && element.getAttribute('data-close') !== 'o-drawer' && element.getAttribute('data-open') !== 'o-drawer') {
			element = element.parentElement;
		}

		return element;
	}

	function getTargetFromTrigger(element) {
		var target = element.getAttribute('data-target') || element.getAttribute('href');
		return document.querySelectorAll(target);
	}

	module.exports = Drawer;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/*jshint browser:true, node:true*/

	'use strict';

	/**
	 * @preserve Create and manage a DOM event delegator.
	 *
	 * @version 0.3.0
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	var Delegate = __webpack_require__(29);

	module.exports = function (root) {
	  return new Delegate(root);
	};

	module.exports.Delegate = Delegate;

/***/ },
/* 29 */
/***/ function(module, exports) {

	/*jshint browser:true, node:true*/

	'use strict';

	module.exports = Delegate;

	/**
	 * DOM event delegator
	 *
	 * The delegator will listen
	 * for events that bubble up
	 * to the root node.
	 *
	 * @constructor
	 * @param {Node|string} [root] The root node or a selector string matching the root node
	 */
	function Delegate(root) {

	  /**
	   * Maintain a map of listener
	   * lists, keyed by event name.
	   *
	   * @type Object
	   */
	  this.listenerMap = [{}, {}];
	  if (root) {
	    this.root(root);
	  }

	  /** @type function() */
	  this.handle = Delegate.prototype.handle.bind(this);
	}

	/**
	 * Start listening for events
	 * on the provided DOM element
	 *
	 * @param  {Node|string} [root] The root node or a selector string matching the root node
	 * @returns {Delegate} This method is chainable
	 */
	Delegate.prototype.root = function (root) {
	  var listenerMap = this.listenerMap;
	  var eventType;

	  // Remove master event listeners
	  if (this.rootElement) {
	    for (eventType in listenerMap[1]) {
	      if (listenerMap[1].hasOwnProperty(eventType)) {
	        this.rootElement.removeEventListener(eventType, this.handle, true);
	      }
	    }
	    for (eventType in listenerMap[0]) {
	      if (listenerMap[0].hasOwnProperty(eventType)) {
	        this.rootElement.removeEventListener(eventType, this.handle, false);
	      }
	    }
	  }

	  // If no root or root is not
	  // a dom node, then remove internal
	  // root reference and exit here
	  if (!root || !root.addEventListener) {
	    if (this.rootElement) {
	      delete this.rootElement;
	    }
	    return this;
	  }

	  /**
	   * The root node at which
	   * listeners are attached.
	   *
	   * @type Node
	   */
	  this.rootElement = root;

	  // Set up master event listeners
	  for (eventType in listenerMap[1]) {
	    if (listenerMap[1].hasOwnProperty(eventType)) {
	      this.rootElement.addEventListener(eventType, this.handle, true);
	    }
	  }
	  for (eventType in listenerMap[0]) {
	    if (listenerMap[0].hasOwnProperty(eventType)) {
	      this.rootElement.addEventListener(eventType, this.handle, false);
	    }
	  }

	  return this;
	};

	/**
	 * @param {string} eventType
	 * @returns boolean
	 */
	Delegate.prototype.captureForType = function (eventType) {
	  return ['blur', 'error', 'focus', 'load', 'resize', 'scroll'].indexOf(eventType) !== -1;
	};

	/**
	 * Attach a handler to one
	 * event for all elements
	 * that match the selector,
	 * now or in the future
	 *
	 * The handler function receives
	 * three arguments: the DOM event
	 * object, the node that matched
	 * the selector while the event
	 * was bubbling and a reference
	 * to itself. Within the handler,
	 * 'this' is equal to the second
	 * argument.
	 *
	 * The node that actually received
	 * the event can be accessed via
	 * 'event.target'.
	 *
	 * @param {string} eventType Listen for these events
	 * @param {string|undefined} selector Only handle events on elements matching this selector, if undefined match root element
	 * @param {function()} handler Handler function - event data passed here will be in event.data
	 * @param {Object} [eventData] Data to pass in event.data
	 * @returns {Delegate} This method is chainable
	 */
	Delegate.prototype.on = function (eventType, selector, handler, useCapture) {
	  var root, listenerMap, matcher, matcherParam;

	  if (!eventType) {
	    throw new TypeError('Invalid event type: ' + eventType);
	  }

	  // handler can be passed as
	  // the second or third argument
	  if (typeof selector === 'function') {
	    useCapture = handler;
	    handler = selector;
	    selector = null;
	  }

	  // Fallback to sensible defaults
	  // if useCapture not set
	  if (useCapture === undefined) {
	    useCapture = this.captureForType(eventType);
	  }

	  if (typeof handler !== 'function') {
	    throw new TypeError('Handler must be a type of Function');
	  }

	  root = this.rootElement;
	  listenerMap = this.listenerMap[useCapture ? 1 : 0];

	  // Add master handler for type if not created yet
	  if (!listenerMap[eventType]) {
	    if (root) {
	      root.addEventListener(eventType, this.handle, useCapture);
	    }
	    listenerMap[eventType] = [];
	  }

	  if (!selector) {
	    matcherParam = null;

	    // COMPLEX - matchesRoot needs to have access to
	    // this.rootElement, so bind the function to this.
	    matcher = matchesRoot.bind(this);

	    // Compile a matcher for the given selector
	  } else if (/^[a-z]+$/i.test(selector)) {
	      matcherParam = selector;
	      matcher = matchesTag;
	    } else if (/^#[a-z0-9\-_]+$/i.test(selector)) {
	      matcherParam = selector.slice(1);
	      matcher = matchesId;
	    } else {
	      matcherParam = selector;
	      matcher = matches;
	    }

	  // Add to the list of listeners
	  listenerMap[eventType].push({
	    selector: selector,
	    handler: handler,
	    matcher: matcher,
	    matcherParam: matcherParam
	  });

	  return this;
	};

	/**
	 * Remove an event handler
	 * for elements that match
	 * the selector, forever
	 *
	 * @param {string} [eventType] Remove handlers for events matching this type, considering the other parameters
	 * @param {string} [selector] If this parameter is omitted, only handlers which match the other two will be removed
	 * @param {function()} [handler] If this parameter is omitted, only handlers which match the previous two will be removed
	 * @returns {Delegate} This method is chainable
	 */
	Delegate.prototype.off = function (eventType, selector, handler, useCapture) {
	  var i, listener, listenerMap, listenerList, singleEventType;

	  // Handler can be passed as
	  // the second or third argument
	  if (typeof selector === 'function') {
	    useCapture = handler;
	    handler = selector;
	    selector = null;
	  }

	  // If useCapture not set, remove
	  // all event listeners
	  if (useCapture === undefined) {
	    this.off(eventType, selector, handler, true);
	    this.off(eventType, selector, handler, false);
	    return this;
	  }

	  listenerMap = this.listenerMap[useCapture ? 1 : 0];
	  if (!eventType) {
	    for (singleEventType in listenerMap) {
	      if (listenerMap.hasOwnProperty(singleEventType)) {
	        this.off(singleEventType, selector, handler);
	      }
	    }

	    return this;
	  }

	  listenerList = listenerMap[eventType];
	  if (!listenerList || !listenerList.length) {
	    return this;
	  }

	  // Remove only parameter matches
	  // if specified
	  for (i = listenerList.length - 1; i >= 0; i--) {
	    listener = listenerList[i];

	    if ((!selector || selector === listener.selector) && (!handler || handler === listener.handler)) {
	      listenerList.splice(i, 1);
	    }
	  }

	  // All listeners removed
	  if (!listenerList.length) {
	    delete listenerMap[eventType];

	    // Remove the main handler
	    if (this.rootElement) {
	      this.rootElement.removeEventListener(eventType, this.handle, useCapture);
	    }
	  }

	  return this;
	};

	/**
	 * Handle an arbitrary event.
	 *
	 * @param {Event} event
	 */
	Delegate.prototype.handle = function (event) {
	  var i,
	      l,
	      type = event.type,
	      root,
	      phase,
	      listener,
	      returned,
	      listenerList = [],
	      target,
	      /** @const */EVENTIGNORE = 'ftLabsDelegateIgnore';

	  if (event[EVENTIGNORE] === true) {
	    return;
	  }

	  target = event.target;

	  // Hardcode value of Node.TEXT_NODE
	  // as not defined in IE8
	  if (target.nodeType === 3) {
	    target = target.parentNode;
	  }

	  root = this.rootElement;

	  phase = event.eventPhase || (event.target !== event.currentTarget ? 3 : 2);

	  switch (phase) {
	    case 1:
	      //Event.CAPTURING_PHASE:
	      listenerList = this.listenerMap[1][type];
	      break;
	    case 2:
	      //Event.AT_TARGET:
	      if (this.listenerMap[0] && this.listenerMap[0][type]) listenerList = listenerList.concat(this.listenerMap[0][type]);
	      if (this.listenerMap[1] && this.listenerMap[1][type]) listenerList = listenerList.concat(this.listenerMap[1][type]);
	      break;
	    case 3:
	      //Event.BUBBLING_PHASE:
	      listenerList = this.listenerMap[0][type];
	      break;
	  }

	  // Need to continuously check
	  // that the specific list is
	  // still populated in case one
	  // of the callbacks actually
	  // causes the list to be destroyed.
	  l = listenerList.length;
	  while (target && l) {
	    for (i = 0; i < l; i++) {
	      listener = listenerList[i];

	      // Bail from this loop if
	      // the length changed and
	      // no more listeners are
	      // defined between i and l.
	      if (!listener) {
	        break;
	      }

	      // Check for match and fire
	      // the event if there's one
	      //
	      // TODO:MCG:20120117: Need a way
	      // to check if event#stopImmediatePropagation
	      // was called. If so, break both loops.
	      if (listener.matcher.call(target, listener.matcherParam, target)) {
	        returned = this.fire(event, target, listener);
	      }

	      // Stop propagation to subsequent
	      // callbacks if the callback returned
	      // false
	      if (returned === false) {
	        event[EVENTIGNORE] = true;
	        event.preventDefault();
	        return;
	      }
	    }

	    // TODO:MCG:20120117: Need a way to
	    // check if event#stopPropagation
	    // was called. If so, break looping
	    // through the DOM. Stop if the
	    // delegation root has been reached
	    if (target === root) {
	      break;
	    }

	    l = listenerList.length;
	    target = target.parentElement;
	  }
	};

	/**
	 * Fire a listener on a target.
	 *
	 * @param {Event} event
	 * @param {Node} target
	 * @param {Object} listener
	 * @returns {boolean}
	 */
	Delegate.prototype.fire = function (event, target, listener) {
	  return listener.handler.call(target, event, target);
	};

	/**
	 * Check whether an element
	 * matches a generic selector.
	 *
	 * @type function()
	 * @param {string} selector A CSS selector
	 */
	var matches = function (el) {
	  if (!el) return;
	  var p = el.prototype;
	  return p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector;
	}(Element);

	/**
	 * Check whether an element
	 * matches a tag selector.
	 *
	 * Tags are NOT case-sensitive,
	 * except in XML (and XML-based
	 * languages such as XHTML).
	 *
	 * @param {string} tagName The tag name to test against
	 * @param {Element} element The element to test with
	 * @returns boolean
	 */
	function matchesTag(tagName, element) {
	  return tagName.toLowerCase() === element.tagName.toLowerCase();
	}

	/**
	 * Check whether an element
	 * matches the root.
	 *
	 * @param {?String} selector In this case this is always passed through as null and not used
	 * @param {Element} element The element to test with
	 * @returns boolean
	 */
	function matchesRoot(selector, element) {
	  /*jshint validthis:true*/
	  if (this.rootElement === window) return element === document;
	  return this.rootElement === element;
	}

	/**
	 * Check whether the ID of
	 * the element in 'this'
	 * matches the given ID.
	 *
	 * IDs are case-sensitive.
	 *
	 * @param {string} id The ID to test against
	 * @param {Element} element The element to test with
	 * @returns boolean
	 */
	function matchesId(id, element) {
	  return id === element.id;
	}

	/**
	 * Short hand for off()
	 * and root(), ie both
	 * with no parameters
	 *
	 * @return void
	 */
	Delegate.prototype.destroy = function () {
	  this.off();
	  this.root();
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/*global require, module*/
	'use strict';

	module.exports = __webpack_require__(31);

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	// @version 0.7.9

	(function (root) {
		var defineProperty = Object.defineProperty;
		var counter = Date.now() % 1e9;

		var WeakMap = function WeakMap() {
			this.name = "__st" + (Math.random() * 1e9 >>> 0) + (counter++ + "__");
		};

		WeakMap.prototype = {
			set: function set(key, value) {
				var entry = key[this.name];
				if (entry && entry[0] === key) entry[1] = value;else defineProperty(key, this.name, {
					value: [key, value],
					writable: true
				});
				return this;
			},
			get: function get(key) {
				var entry;
				return (entry = key[this.name]) && entry[0] === key ? entry[1] : undefined;
			},
			"delete": function _delete(key) {
				var entry = key[this.name];
				if (!entry || entry[0] !== key) return false;
				entry[0] = entry[1] = undefined;
				return true;
			},
			has: function has(key) {
				var entry = key[this.name];
				if (!entry) return false;
				return entry[0] === key;
			}
		};

		module.exports = (root || {}).WeakMap || WeakMap;
	})(undefined || window);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var _sockjsClient = __webpack_require__(33);

	var _sockjsClient2 = _interopRequireDefault(_sockjsClient);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (socketUrl) {
	  var console = global.console || { log: function log() {} };

	  // provides structured way for Rtd to use socket.io w/o knowing internals
	  var socketIoProvider = function () {
	    var _socketNamespace2,
	        _listeners = {},
	        _channels = {};
	    // Bridges socket io events to the Rtd instance
	    var _bridgeEvents = function _bridgeEvents(socketNamespace, rtd, provider) {
	      var socket = socketNamespace,
	          start = new Date().valueOf(),
	          reconnectTimer = null,
	          failedAuthentication = false,
	          reconnectCount = 0,
	          rtdBehavior = rtd.config.behaviorMap;

	      //define functions
	      socket.on = function (key, cb) {
	        this["on" + key] = this["on" + key] || [];
	        this["on" + key].push(cb);
	      };
	      socket.emit = function (key, val) {
	        var cbs = this["on" + key];
	        if (cbs) {
	          cbs.forEach(function (cb) {
	            cb(val);
	          });
	        }
	      };

	      socket.onopen = function () {
	        if (reconnectTimer) {
	          clearTimeout(reconnectTimer);
	          reconnectTimer = null;
	        }

	        var transport = socket && socket.transport && socket.transport.name;
	        socket.sendParsed('statsd', { type: 'counter', name: 'rtd.connected' });
	        rtdBehavior.providerConnected(transport, start);
	        _socketNamespace2.sendParsed('authenticate', rtd.config.token);
	      };

	      socket.onmessage = function (rawMessage) {
	        try {
	          var payload = JSON.parse(rawMessage.data),
	              name = payload.name,
	              args = payload.args;

	          if (name == 'presence') {
	            var pipeCount = rtd.config.token.split("|").length - 1;

	            if (pipeCount == 2) {
	              tokenIds = rtd.config.token.split("|");
	              apigeeToken = tokenIds[0];

	              if (tokenIds[1] != undefined) piId = tokenIds[1];

	              if (tokenIds[2] != undefined) smsId = tokenIds[2];
	            }

	            if (piId == args[0].piIdSender && smsId == args[0].smsIdSender || args[0].logout == "Y") {
	              socket.emit.apply(socket, [name].concat(args));
	            }
	          } else {
	            socket.emit.apply(socket, [name].concat(args));
	          }
	        } catch (ex) {
	          console.log('RTD -> Error parsing message', ex, rawMessage);
	        }
	      };

	      socket.sendParsed = function (name /* args */) {
	        var args = Array.prototype.slice.call(arguments, 1),
	            rawMessage = JSON.stringify({ name: name, args: args });

	        socket.send(rawMessage);
	      };

	      // define callback for message types
	      socketNamespace.on('ready', function (data) {
	        var transport = socket && socket.transport && socket.transport.name,
	            duration = new Date().valueOf() - start;

	        socket.sendParsed('statsd', [{ type: 'timer', name: 'rtd.ready.' + transport, duration: duration }, { type: 'counter', name: 'rtd.transport.' + transport }]);
	        rtdBehavior.providerReady(data);
	      });

	      socketNamespace.on('refreshSuccess', function (data) {
	        var transport = socket && socket.transport && socket.transport.name,
	            duration = new Date().valueOf() - start;

	        socket.sendParsed('statsd', [{ type: 'timer', name: 'rtd.refreshSuccess.' + transport, duration: duration }, { type: 'counter', name: 'rtd.transport.' + transport }]);
	        rtdBehavior.providerRefreshSuccess();
	      });

	      socketNamespace.on('unsupported', function (type, channel) {
	        console.log('unsupported', type, channel);
	        if (type === 'subscribe') {
	          rtdBehavior.providerUnsupported(channel);
	        }
	      });

	      socketNamespace.on('unauthorized', function (type, channel) {
	        console.log('unauthorized', type, channel);
	        if (type === 'subscribe') {
	          rtdBehavior.providerUnauthorized(channel);
	        } else if (type === 'authenticate') {
	          rtdBehavior.providerUnauthorized(channel);
	          failedAuthentication = true;
	          _socketNamespace2.close();
	        }
	      });

	      socketNamespace.onclose = function (e) {
	        // reset start time marker
	        //console.log("socketNamespace.onclose: in rtd.js");
	        start = new Date().valueOf();
	        rtdBehavior.providerDisconnected(start);
	        socketNamespace.emit("error", e);
	      };

	      socketNamespace.on('error', function (error) {
	        //{code: 1006,reason: "WebSocket connection broken",type: "close",wasClean: false}
	        if (error.code === 1006 || error.code === 1002) reconnect();
	      });

	      var reconnect = function reconnect(count) {
	        if (!reconnectTimer && !failedAuthentication) {
	          reconnectCount++;
	          var reconnectDelay = 1000 * reconnectCount;
	          reconnectTimer = setTimeout(function () {
	            reconnectTimer = null;
	            // _socketNamespace.open();
	            provider.connect(rtd);
	          }, reconnectDelay);
	        }
	      };
	    };
	    return {

	      connect: function connect(rtd) {
	        // no token? No dice.
	        if (!rtd.config.token) {
	          return;
	        }
	        if (_socketNamespace2 && _socketNamespace2.close) {
	          _socketNamespace2.close();
	        }
	        _socketNamespace2 = new _sockjsClient2.default(rtd.getUri() + "/transport");
	        _bridgeEvents(_socketNamespace2, rtd, this);
	      },

	      updateAuth: function updateAuth(token) {
	        // TODO!
	        _socketNamespace2.emit("refreshToken", token);
	      },

	      subscribe: function subscribe(channel, eventType, callback) {

	        if (_socketNamespace2) {
	          if (!_channels[channel]) {
	            _channels[channel] = true;
	            _socketNamespace2.sendParsed('subscribe', channel);
	          }
	          if (!_listeners[eventType]) {
	            _listeners[eventType] = function (data) {
	              callback(data);
	            };
	            _socketNamespace2.on(eventType, _listeners[eventType]);
	          }
	        }
	      },

	      resubscribe: function resubscribe() {
	        var channels = Object.keys(_channels);
	        for (var i = 0; i < channels.length; i++) {
	          var channel = channels[i];
	          _socketNamespace2.sendParsed('subscribe', channel);
	        }
	      },

	      emit: function emit(eventType /* args */) {
	        if (_socketNamespace2) {
	          var args = Array.prototype.slice.call(arguments, 0);
	          _socketNamespace2.sendParsed.apply(_socketNamespace2, args);
	        }
	      },

	      status: function status() {
	        if (_socketNamespace2) {
	          if (_socketNamespace2.readyState === 'open') {
	            return "connected";
	          }
	          if (_socketNamespace2.readyState === 'opening') {
	            return "connecting";
	          }
	        }
	        return "disconnected";
	      },
	      _socketNamespace: function _socketNamespace() {
	        return _socketNamespace2;
	      },
	      close: function close() {
	        if (_socketNamespace2) {
	          _socketNamespace2.close();
	          return true;
	        } else {
	          return false;
	        }
	      }
	    };
	  }();

	  // rtd ctor function and prototype methods....
	  var Rtd = function Rtd(provider) {
	    var self = this;
	    self.provider = provider;
	    self._readyData = null;
	    self._events = {};
	    self._subscriptions = {};
	    self.config = {
	      options: {
	        'transports': ['polling', 'websocket'],
	        'timestampRequests': true
	        // 'connect timeout' : 2500,
	        // 'max reconnection attempts' : 1000
	      },
	      debug: true,
	      behaviorMap: {
	        'providerConnected': function providerConnected(transport, start) {
	          self.trigger("connect", 'CONNECTED as ' + transport + ' in ' + (new Date().valueOf() - start) + 'ms');
	        },
	        'providerDisconnected': function providerDisconnected(start) {
	          rtd.trigger("disconnect", start);
	        },
	        'providerMessage': function providerMessage(evnt, data) {
	          self.trigger("message", evnt, data);
	        },
	        'providerReady': function providerReady(data) {
	          provider.resubscribe();
	          self.trigger("ready", data);
	          self._readyData = data;
	        },
	        'providerRefreshSuccess': function providerRefreshSuccess() {
	          self.trigger("refreshSuccess");
	        },
	        'providerUnauthorized': function providerUnauthorized(channel) {
	          delete self._subscriptions[channel];
	          self.trigger("unauthorized", 'unauthorized channel subscription');
	        },
	        'providerUnsupported': function providerUnsupported(channel) {
	          delete self._subscriptions[channel];
	          self.trigger("unsupported", 'unsupported subscription to ' + channel);
	        }
	      },
	      server: socketUrl
	    };
	  };

	  Rtd.prototype.on = function (eventName, callback) {
	    var self = this;
	    if (!self._events[eventName]) {
	      self._events[eventName] = [callback];
	    } else {
	      self._events[eventName].push(callback);
	    }
	    // treat ready like a promise
	    if (eventName === 'ready' && self._readyData) {
	      setTimeout(function () {
	        callback(self._readyData);
	      }, 1);
	    }
	  };

	  Rtd.prototype.off = function (eventName, callback) {
	    if (this._events[eventName]) {
	      if (!callback) {
	        delete this._events[eventName];
	      } else {
	        var l = this._events[eventName].length;
	        while (l) {
	          if (this._events[eventName][l - 1] === callback) {
	            this._events[eventName].splice(l - 1, 1);
	          }
	          l -= 1;
	        }
	      }
	    }
	  };

	  Rtd.prototype.trigger = function () {
	    var args = Array.prototype.slice.call(arguments, 0);
	    var list,
	        l = 0;
	    if (list = this._events[args[0]]) {
	      for (; l < list.length; l++) {
	        list[l].apply(this, args.slice(1));
	      }
	    }
	    list = undefined;
	    l = 0;
	    if (list = this._events["*"]) {
	      for (; l < list.length; l++) {
	        list[l].apply(this, args);
	      }
	    }
	  };

	  Rtd.prototype.setToken = function (token) {
	    if (!this.config.token) {
	      this.config.token = token;
	      if (this.transportStatus() !== 'connected') {
	        this.provider.connect(this);
	      } else {
	        this.provider.updateAuth(token);
	      }
	    }
	  };

	  Rtd.prototype.subscribe = function (channel, eventType) {
	    var self = this,
	        i = 0,
	        events = Object.prototype.toString.call(eventType) === "[object String]" ? [eventType] : eventType;

	    self._subscriptions[channel] = self._subscriptions[channel] || [];
	    self._subscriptions[channel] = self._subscriptions[channel].concat(events);

	    for (i; i < events.length; i++) {
	      (function (evnt) {
	        self.provider.subscribe(channel, evnt, function (data) {
	          self.trigger("message", evnt, data);
	        });
	      })(events[i]);
	    }
	  };

	  Rtd.prototype.emit = function (channel, eventType) {
	    var self = this,
	        args = Array.prototype.slice.call(arguments, 0);

	    self.provider.emit.apply(self.provider, args);
	  };

	  Rtd.prototype.unsubscribe = function (channel) {
	    delete this._subscriptions[channel];
	    this.provider.unsubscribe(channel);
	  };

	  Rtd.prototype.transportStatus = function () {
	    return this.provider.status();
	  };

	  Rtd.prototype.getUri = function () {
	    return this.config.server;
	  };

	  Rtd.prototype.close = function () {
	    return this.provider.close();
	  };

	  // generic logging function
	  // if(rtd.config.debug) {
	  //   rtd.on("*", function(eventName, data) {
	  //     try {
	  //       console.log("RTD -> Event: " + eventName + " | " + JSON.stringify(arguments));
	  //     }
	  //     catch(e) {
	  //       console.log("RTD -> Event: " + eventName);
	  //     }
	  //   });
	  // }

	  return new Rtd(socketIoProvider);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var transportList = __webpack_require__(34);

	module.exports = __webpack_require__(81)(transportList);

	// TODO can't get rid of this until all servers do
	if ('_sockjs_onload' in global) {
	  setTimeout(global._sockjs_onload, 1);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = [
	// streaming transports
	__webpack_require__(35), __webpack_require__(52), __webpack_require__(62), __webpack_require__(64), __webpack_require__(67)(__webpack_require__(64))

	// polling transports
	, __webpack_require__(74), __webpack_require__(67)(__webpack_require__(74)), __webpack_require__(76), __webpack_require__(77), __webpack_require__(67)(__webpack_require__(76)), __webpack_require__(78)];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(37),
	    urlUtils = __webpack_require__(40),
	    inherits = __webpack_require__(48),
	    EventEmitter = __webpack_require__(49).EventEmitter,
	    WebsocketDriver = __webpack_require__(51);

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:websocket');
	}

	function WebSocketTransport(transUrl, ignore, options) {
	  if (!WebSocketTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }

	  EventEmitter.call(this);
	  debug('constructor', transUrl);

	  var self = this;
	  var url = urlUtils.addPath(transUrl, '/websocket');
	  if (url.slice(0, 5) === 'https') {
	    url = 'wss' + url.slice(5);
	  } else {
	    url = 'ws' + url.slice(4);
	  }
	  this.url = url;

	  this.ws = new WebsocketDriver(this.url, [], options);
	  this.ws.onmessage = function (e) {
	    debug('message event', e.data);
	    self.emit('message', e.data);
	  };
	  // Firefox has an interesting bug. If a websocket connection is
	  // created after onunload, it stays alive even when user
	  // navigates away from the page. In such situation let's lie -
	  // let's not open the ws connection at all. See:
	  // https://github.com/sockjs/sockjs-client/issues/28
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
	  this.unloadRef = utils.unloadAdd(function () {
	    debug('unload');
	    self.ws.close();
	  });
	  this.ws.onclose = function (e) {
	    debug('close event', e.code, e.reason);
	    self.emit('close', e.code, e.reason);
	    self._cleanup();
	  };
	  this.ws.onerror = function (e) {
	    debug('error event', e);
	    self.emit('close', 1006, 'WebSocket connection broken');
	    self._cleanup();
	  };
	}

	inherits(WebSocketTransport, EventEmitter);

	WebSocketTransport.prototype.send = function (data) {
	  var msg = '[' + data + ']';
	  debug('send', msg);
	  this.ws.send(msg);
	};

	WebSocketTransport.prototype.close = function () {
	  debug('close');
	  if (this.ws) {
	    this.ws.close();
	  }
	  this._cleanup();
	};

	WebSocketTransport.prototype._cleanup = function () {
	  debug('_cleanup');
	  var ws = this.ws;
	  if (ws) {
	    ws.onmessage = ws.onclose = ws.onerror = null;
	  }
	  utils.unloadDel(this.unloadRef);
	  this.unloadRef = this.ws = null;
	  this.removeAllListeners();
	};

	WebSocketTransport.enabled = function () {
	  debug('enabled');
	  return !!WebsocketDriver;
	};
	WebSocketTransport.transportName = 'websocket';

	// In theory, ws should require 1 round trip. But in chrome, this is
	// not very stable over SSL. Most likely a ws connection requires a
	// separate SSL connection, in which case 2 round trips are an
	// absolute minumum.
	WebSocketTransport.roundTrips = 2;

	module.exports = WebSocketTransport;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)))

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var random = __webpack_require__(38);

	var onUnload = {},
	    afterUnload = false
	// detect google chrome packaged apps because they don't allow the 'unload' event
	,
	    isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime;

	module.exports = {
	  attachEvent: function attachEvent(event, listener) {
	    if (typeof global.addEventListener !== 'undefined') {
	      global.addEventListener(event, listener, false);
	    } else if (global.document && global.attachEvent) {
	      // IE quirks.
	      // According to: http://stevesouders.com/misc/test-postmessage.php
	      // the message gets delivered only to 'document', not 'window'.
	      global.document.attachEvent('on' + event, listener);
	      // I get 'window' for ie8.
	      global.attachEvent('on' + event, listener);
	    }
	  },

	  detachEvent: function detachEvent(event, listener) {
	    if (typeof global.addEventListener !== 'undefined') {
	      global.removeEventListener(event, listener, false);
	    } else if (global.document && global.detachEvent) {
	      global.document.detachEvent('on' + event, listener);
	      global.detachEvent('on' + event, listener);
	    }
	  },

	  unloadAdd: function unloadAdd(listener) {
	    if (isChromePackagedApp) {
	      return null;
	    }

	    var ref = random.string(8);
	    onUnload[ref] = listener;
	    if (afterUnload) {
	      setTimeout(this.triggerUnloadCallbacks, 0);
	    }
	    return ref;
	  },

	  unloadDel: function unloadDel(ref) {
	    if (ref in onUnload) {
	      delete onUnload[ref];
	    }
	  },

	  triggerUnloadCallbacks: function triggerUnloadCallbacks() {
	    for (var ref in onUnload) {
	      onUnload[ref]();
	      delete onUnload[ref];
	    }
	  }
	};

	var unloadTriggered = function unloadTriggered() {
	  if (afterUnload) {
	    return;
	  }
	  afterUnload = true;
	  module.exports.triggerUnloadCallbacks();
	};

	// 'unload' alone is not reliable in opera within an iframe, but we
	// can't use `beforeunload` as IE fires it on javascript: links.
	if (!isChromePackagedApp) {
	  module.exports.attachEvent('unload', unloadTriggered);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* global crypto:true */

	var crypto = __webpack_require__(39);

	// This string has length 32, a power of 2, so the modulus doesn't introduce a
	// bias.
	var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
	module.exports = {
	  string: function string(length) {
	    var max = _randomStringChars.length;
	    var bytes = crypto.randomBytes(length);
	    var ret = [];
	    for (var i = 0; i < length; i++) {
	      ret.push(_randomStringChars.substr(bytes[i] % max, 1));
	    }
	    return ret.join('');
	  },

	  number: function number(max) {
	    return Math.floor(Math.random() * max);
	  },

	  numberString: function numberString(max) {
	    var t = ('' + (max - 1)).length;
	    var p = new Array(t + 1).join('0');
	    return (p + this.number(max)).slice(-t);
	  }
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	if (global.crypto && global.crypto.getRandomValues) {
	  module.exports.randomBytes = function (length) {
	    var bytes = new Uint8Array(length);
	    global.crypto.getRandomValues(bytes);
	    return bytes;
	  };
	} else {
	  module.exports.randomBytes = function (length) {
	    var bytes = new Array(length);
	    for (var i = 0; i < length; i++) {
	      bytes[i] = Math.floor(Math.random() * 256);
	    }
	    return bytes;
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var URL = __webpack_require__(41);

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:utils:url');
	}

	module.exports = {
	  getOrigin: function getOrigin(url) {
	    if (!url) {
	      return null;
	    }

	    var p = new URL(url);
	    if (p.protocol === 'file:') {
	      return null;
	    }

	    var port = p.port;
	    if (!port) {
	      port = p.protocol === 'https:' ? '443' : '80';
	    }

	    return p.protocol + '//' + p.hostname + ':' + port;
	  },

	  isOriginEqual: function isOriginEqual(a, b) {
	    var res = this.getOrigin(a) === this.getOrigin(b);
	    debug('same', a, b, res);
	    return res;
	  },

	  isSchemeEqual: function isSchemeEqual(a, b) {
	    return a.split(':')[0] === b.split(':')[0];
	  },

	  addPath: function addPath(url, path) {
	    var qs = url.split('?');
	    return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
	  },

	  addQuery: function addQuery(url, q) {
	    return url + (url.indexOf('?') === -1 ? '?' + q : '&' + q);
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)))

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var required = __webpack_require__(42),
	    lolcation = __webpack_require__(43),
	    qs = __webpack_require__(44),
	    relativere = /^\/(?!\/)/,
	    protocolre = /^([a-z0-9.+-]+:)?(\/\/)?(.*)$/i; // actual protocol is first match

	/**
	 * These are the parse instructions for the URL parsers, it informs the parser
	 * about:
	 *
	 * 0. The char it Needs to parse, if it's a string it should be done using
	 *    indexOf, RegExp using exec and NaN means set as current value.
	 * 1. The property we should set when parsing this value.
	 * 2. Indication if it's backwards or forward parsing, when set as number it's
	 *    the value of extra chars that should be split off.
	 * 3. Inherit from location if non existing in the parser.
	 * 4. `toLowerCase` the resulting value.
	 */
	var instructions = [['#', 'hash'], // Extract from the back.
	['?', 'query'], // Extract from the back.
	['/', 'pathname'], // Extract from the back.
	['@', 'auth', 1], // Extract from the front.
	[NaN, 'host', undefined, 1, 1], // Set left over value.
	[/\:(\d+)$/, 'port'], // RegExp the back.
	[NaN, 'hostname', undefined, 1, 1] // Set left over.
	];

	/**
	* @typedef ProtocolExtract
	* @type Object
	* @property {String} protocol Protocol matched in the URL, in lowercase
	* @property {Boolean} slashes Indicates whether the protocol is followed by double slash ("//")
	* @property {String} rest     Rest of the URL that is not part of the protocol
	*/

	/**
	 * Extract protocol information from a URL with/without double slash ("//")
	 *
	 * @param  {String} address   URL we want to extract from.
	 * @return {ProtocolExtract}  Extracted information
	 * @private
	 */
	function extractProtocol(address) {
	  var match = protocolre.exec(address);
	  return {
	    protocol: match[1] ? match[1].toLowerCase() : '',
	    slashes: !!match[2],
	    rest: match[3] ? match[3] : ''
	  };
	}

	/**
	 * The actual URL instance. Instead of returning an object we've opted-in to
	 * create an actual constructor as it's much more memory efficient and
	 * faster and it pleases my CDO.
	 *
	 * @constructor
	 * @param {String} address URL we want to parse.
	 * @param {Object|String} location Location defaults for relative paths.
	 * @param {Boolean|Function} parser Parser for the query string.
	 * @api public
	 */
	function URL(address, location, parser) {
	  if (!(this instanceof URL)) {
	    return new URL(address, location, parser);
	  }

	  var relative = relativere.test(address),
	      parse,
	      instruction,
	      index,
	      key,
	      type = typeof location === 'undefined' ? 'undefined' : _typeof(location),
	      url = this,
	      i = 0;

	  //
	  // The following if statements allows this module two have compatibility with
	  // 2 different API:
	  //
	  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
	  //    where the boolean indicates that the query string should also be parsed.
	  //
	  // 2. The `URL` interface of the browser which accepts a URL, object as
	  //    arguments. The supplied object will be used as default values / fall-back
	  //    for relative paths.
	  //
	  if ('object' !== type && 'string' !== type) {
	    parser = location;
	    location = null;
	  }

	  if (parser && 'function' !== typeof parser) {
	    parser = qs.parse;
	  }

	  location = lolcation(location);

	  // extract protocol information before running the instructions
	  var extracted = extractProtocol(address);
	  url.protocol = extracted.protocol || location.protocol || '';
	  url.slashes = extracted.slashes || location.slashes;
	  address = extracted.rest;

	  for (; i < instructions.length; i++) {
	    instruction = instructions[i];
	    parse = instruction[0];
	    key = instruction[1];

	    if (parse !== parse) {
	      url[key] = address;
	    } else if ('string' === typeof parse) {
	      if (~(index = address.indexOf(parse))) {
	        if ('number' === typeof instruction[2]) {
	          url[key] = address.slice(0, index);
	          address = address.slice(index + instruction[2]);
	        } else {
	          url[key] = address.slice(index);
	          address = address.slice(0, index);
	        }
	      }
	    } else if (index = parse.exec(address)) {
	      url[key] = index[1];
	      address = address.slice(0, address.length - index[0].length);
	    }

	    url[key] = url[key] || (instruction[3] || 'port' === key && relative ? location[key] || '' : '');

	    //
	    // Hostname, host and protocol should be lowercased so they can be used to
	    // create a proper `origin`.
	    //
	    if (instruction[4]) {
	      url[key] = url[key].toLowerCase();
	    }
	  }

	  //
	  // Also parse the supplied query string in to an object. If we're supplied
	  // with a custom parser as function use that instead of the default build-in
	  // parser.
	  //
	  if (parser) url.query = parser(url.query);

	  //
	  // We should not add port numbers if they are already the default port number
	  // for a given protocol. As the host also contains the port number we're going
	  // override it with the hostname which contains no port number.
	  //
	  if (!required(url.port, url.protocol)) {
	    url.host = url.hostname;
	    url.port = '';
	  }

	  //
	  // Parse down the `auth` for the username and password.
	  //
	  url.username = url.password = '';
	  if (url.auth) {
	    instruction = url.auth.split(':');
	    url.username = instruction[0] || '';
	    url.password = instruction[1] || '';
	  }

	  //
	  // The href is just the compiled result.
	  //
	  url.href = url.toString();
	}

	/**
	 * This is convenience method for changing properties in the URL instance to
	 * insure that they all propagate correctly.
	 *
	 * @param {String} prop          Property we need to adjust.
	 * @param {Mixed} value          The newly assigned value.
	 * @param {Boolean|Function} fn  When setting the query, it will be the function used to parse
	 *                               the query.
	 *                               When setting the protocol, double slash will be removed from
	 *                               the final url if it is true.
	 * @returns {URL}
	 * @api public
	 */
	URL.prototype.set = function set(part, value, fn) {
	  var url = this;

	  if ('query' === part) {
	    if ('string' === typeof value && value.length) {
	      value = (fn || qs.parse)(value);
	    }

	    url[part] = value;
	  } else if ('port' === part) {
	    url[part] = value;

	    if (!required(value, url.protocol)) {
	      url.host = url.hostname;
	      url[part] = '';
	    } else if (value) {
	      url.host = url.hostname + ':' + value;
	    }
	  } else if ('hostname' === part) {
	    url[part] = value;

	    if (url.port) value += ':' + url.port;
	    url.host = value;
	  } else if ('host' === part) {
	    url[part] = value;

	    if (/\:\d+/.test(value)) {
	      value = value.split(':');
	      url.hostname = value[0];
	      url.port = value[1];
	    }
	  } else if ('protocol' === part) {
	    url.protocol = value;
	    url.slashes = !fn;
	  } else {
	    url[part] = value;
	  }

	  url.href = url.toString();
	  return url;
	};

	/**
	 * Transform the properties back in to a valid and full URL string.
	 *
	 * @param {Function} stringify Optional query stringify function.
	 * @returns {String}
	 * @api public
	 */
	URL.prototype.toString = function toString(stringify) {
	  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

	  var query,
	      url = this,
	      protocol = url.protocol;

	  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

	  var result = protocol + (url.slashes ? '//' : '');

	  if (url.username) {
	    result += url.username;
	    if (url.password) result += ':' + url.password;
	    result += '@';
	  }

	  result += url.hostname;
	  if (url.port) result += ':' + url.port;

	  result += url.pathname;

	  query = 'object' === _typeof(url.query) ? stringify(url.query) : url.query;
	  if (query) result += '?' !== query.charAt(0) ? '?' + query : query;

	  if (url.hash) result += url.hash;

	  return result;
	};

	//
	// Expose the URL parser and some additional properties that might be useful for
	// others.
	//
	URL.qs = qs;
	URL.location = lolcation;
	module.exports = URL;

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Check if we're required to add a port number.
	 *
	 * @see https://url.spec.whatwg.org/#default-port
	 * @param {Number|String} port Port number we need to check
	 * @param {String} protocol Protocol we need to check against.
	 * @returns {Boolean} Is it a default port for the given protocol
	 * @api private
	 */

	module.exports = function required(port, protocol) {
	  protocol = protocol.split(':')[0];
	  port = +port;

	  if (!port) return false;

	  switch (protocol) {
	    case 'http':
	    case 'ws':
	      return port !== 80;

	    case 'https':
	    case 'wss':
	      return port !== 443;

	    case 'ftp':
	      return port !== 21;

	    case 'gopher':
	      return port !== 70;

	    case 'file':
	      return false;
	  }

	  return port !== 0;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

	/**
	 * These properties should not be copied or inherited from. This is only needed
	 * for all non blob URL's as a blob URL does not include a hash, only the
	 * origin.
	 *
	 * @type {Object}
	 * @private
	 */
	var ignore = { hash: 1, query: 1 },
	    URL;

	/**
	 * The location object differs when your code is loaded through a normal page,
	 * Worker or through a worker using a blob. And with the blobble begins the
	 * trouble as the location object will contain the URL of the blob, not the
	 * location of the page where our code is loaded in. The actual origin is
	 * encoded in the `pathname` so we can thankfully generate a good "default"
	 * location from it so we can generate proper relative URL's again.
	 *
	 * @param {Object|String} loc Optional default location object.
	 * @returns {Object} lolcation object.
	 * @api public
	 */
	module.exports = function lolcation(loc) {
	  loc = loc || global.location || {};
	  URL = URL || __webpack_require__(41);

	  var finaldestination = {},
	      type = typeof loc === 'undefined' ? 'undefined' : _typeof(loc),
	      key;

	  if ('blob:' === loc.protocol) {
	    finaldestination = new URL(unescape(loc.pathname), {});
	  } else if ('string' === type) {
	    finaldestination = new URL(loc, {});
	    for (key in ignore) {
	      delete finaldestination[key];
	    }
	  } else if ('object' === type) {
	    for (key in loc) {
	      if (key in ignore) continue;
	      finaldestination[key] = loc[key];
	    }

	    if (finaldestination.slashes === undefined) {
	      finaldestination.slashes = slashes.test(loc.href);
	    }
	  }

	  return finaldestination;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';

	var has = Object.prototype.hasOwnProperty;

	/**
	 * Simple query string parser.
	 *
	 * @param {String} query The query string that needs to be parsed.
	 * @returns {Object}
	 * @api public
	 */
	function querystring(query) {
	  var parser = /([^=?&]+)=([^&]*)/g,
	      result = {},
	      part;

	  //
	  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
	  // the lastIndex property so we can continue executing this loop until we've
	  // parsed all results.
	  //
	  for (; part = parser.exec(query); result[decodeURIComponent(part[1])] = decodeURIComponent(part[2])) {}

	  return result;
	}

	/**
	 * Transform a query string to an object.
	 *
	 * @param {Object} obj Object that should be transformed.
	 * @param {String} prefix Optional prefix.
	 * @returns {String}
	 * @api public
	 */
	function querystringify(obj, prefix) {
	  prefix = prefix || '';

	  var pairs = [];

	  //
	  // Optionally prefix with a '?' if needed
	  //
	  if ('string' !== typeof prefix) prefix = '?';

	  for (var key in obj) {
	    if (has.call(obj, key)) {
	      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
	    }
	  }

	  return pairs.length ? prefix + pairs.join('&') : '';
	}

	//
	// Expose the module.
	//
	exports.stringify = querystringify;
	exports.parse = querystring;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(46);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return 'WebkitAppearance' in document.documentElement.style ||
	  // is firebug? http://stackoverflow.com/a/398120/376773
	  window.console && (console.firebug || console.exception && console.table) ||
	  // is firefox >= v31?
	  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function (v) {
	  return JSON.stringify(v);
	};

	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

	  if (!useColors) return args;

	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function (match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	  return args;
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch (e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch (e) {}
	  return r;
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage() {
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(47);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {}
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = Array.prototype.slice.call(arguments);

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}

/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function (val, options) {
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long ? long(val) : short(val);
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function long(ms) {
	  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}

/***/ },
/* 48 */
/***/ function(module, exports) {

	'use strict';

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function TempCtor() {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var inherits = __webpack_require__(48),
	    EventTarget = __webpack_require__(50);

	function EventEmitter() {
	  EventTarget.call(this);
	}

	inherits(EventEmitter, EventTarget);

	EventEmitter.prototype.removeAllListeners = function (type) {
	  if (type) {
	    delete this._listeners[type];
	  } else {
	    this._listeners = {};
	  }
	};

	EventEmitter.prototype.once = function (type, listener) {
	  var self = this,
	      fired = false;

	  function g() {
	    self.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  this.on(type, g);
	};

	EventEmitter.prototype.emit = function () {
	  var type = arguments[0];
	  var listeners = this._listeners[type];
	  if (!listeners) {
	    return;
	  }
	  // equivalent of Array.prototype.slice.call(arguments, 1);
	  var l = arguments.length;
	  var args = new Array(l - 1);
	  for (var ai = 1; ai < l; ai++) {
	    args[ai - 1] = arguments[ai];
	  }
	  for (var i = 0; i < listeners.length; i++) {
	    listeners[i].apply(this, args);
	  }
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener = EventTarget.prototype.addEventListener;
	EventEmitter.prototype.removeListener = EventTarget.prototype.removeEventListener;

	module.exports.EventEmitter = EventEmitter;

/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';

	/* Simplified implementation of DOM2 EventTarget.
	 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
	 */

	function EventTarget() {
	  this._listeners = {};
	}

	EventTarget.prototype.addEventListener = function (eventType, listener) {
	  if (!(eventType in this._listeners)) {
	    this._listeners[eventType] = [];
	  }
	  var arr = this._listeners[eventType];
	  // #4
	  if (arr.indexOf(listener) === -1) {
	    // Make a copy so as not to interfere with a current dispatchEvent.
	    arr = arr.concat([listener]);
	  }
	  this._listeners[eventType] = arr;
	};

	EventTarget.prototype.removeEventListener = function (eventType, listener) {
	  var arr = this._listeners[eventType];
	  if (!arr) {
	    return;
	  }
	  var idx = arr.indexOf(listener);
	  if (idx !== -1) {
	    if (arr.length > 1) {
	      // Make a copy so as not to interfere with a current dispatchEvent.
	      this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
	    } else {
	      delete this._listeners[eventType];
	    }
	    return;
	  }
	};

	EventTarget.prototype.dispatchEvent = function () {
	  var event = arguments[0];
	  var t = event.type;
	  // equivalent of Array.prototype.slice.call(arguments, 0);
	  var args = arguments.length === 1 ? [event] : Array.apply(null, arguments);
	  // TODO: This doesn't match the real behavior; per spec, onfoo get
	  // their place in line from the /first/ time they're set from
	  // non-null. Although WebKit bumps it to the end every time it's
	  // set.
	  if (this['on' + t]) {
	    this['on' + t].apply(this, args);
	  }
	  if (t in this._listeners) {
	    // Grab a reference to the listeners list. removeEventListener may alter the list.
	    var listeners = this._listeners[t];
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i].apply(this, args);
	    }
	  }
	};

	module.exports = EventTarget;

/***/ },
/* 51 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var Driver = global.WebSocket || global.MozWebSocket;
	if (Driver) {
		module.exports = function WebSocketBrowserDriver(url) {
			return new Driver(url);
		};
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var inherits = __webpack_require__(48),
	    AjaxBasedTransport = __webpack_require__(53),
	    XhrReceiver = __webpack_require__(57),
	    XHRCorsObject = __webpack_require__(58),
	    XHRLocalObject = __webpack_require__(60),
	    browser = __webpack_require__(61);

	function XhrStreamingTransport(transUrl) {
	  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
	}

	inherits(XhrStreamingTransport, AjaxBasedTransport);

	XhrStreamingTransport.enabled = function (info) {
	  if (info.nullOrigin) {
	    return false;
	  }
	  // Opera doesn't support xhr-streaming #60
	  // But it might be able to #92
	  if (browser.isOpera()) {
	    return false;
	  }

	  return XHRCorsObject.enabled;
	};

	XhrStreamingTransport.transportName = 'xhr-streaming';
	XhrStreamingTransport.roundTrips = 2; // preflight, ajax

	// Safari gets confused when a streaming ajax request is started
	// before onload. This causes the load indicator to spin indefinetely.
	// Only require body when used in a browser
	XhrStreamingTransport.needBody = !!global.document;

	module.exports = XhrStreamingTransport;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var inherits = __webpack_require__(48),
	    urlUtils = __webpack_require__(40),
	    SenderReceiver = __webpack_require__(54);

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:ajax-based');
	}

	function createAjaxSender(AjaxObject) {
	  return function (url, payload, callback) {
	    debug('create ajax sender', url, payload);
	    var opt = {};
	    if (typeof payload === 'string') {
	      opt.headers = { 'Content-type': 'text/plain' };
	    }
	    var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
	    var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
	    xo.once('finish', function (status) {
	      debug('finish', status);
	      xo = null;

	      if (status !== 200 && status !== 204) {
	        return callback(new Error('http status ' + status));
	      }
	      callback();
	    });
	    return function () {
	      debug('abort');
	      xo.close();
	      xo = null;

	      var err = new Error('Aborted');
	      err.code = 1000;
	      callback(err);
	    };
	  };
	}

	function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
	  SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
	}

	inherits(AjaxBasedTransport, SenderReceiver);

	module.exports = AjaxBasedTransport;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var inherits = __webpack_require__(48),
	    urlUtils = __webpack_require__(40),
	    BufferedSender = __webpack_require__(55),
	    Polling = __webpack_require__(56);

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:sender-receiver');
	}

	function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
	  var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
	  debug(pollUrl);
	  var self = this;
	  BufferedSender.call(this, transUrl, senderFunc);

	  this.poll = new Polling(Receiver, pollUrl, AjaxObject);
	  this.poll.on('message', function (msg) {
	    debug('poll message', msg);
	    self.emit('message', msg);
	  });
	  this.poll.once('close', function (code, reason) {
	    debug('poll close', code, reason);
	    self.poll = null;
	    self.emit('close', code, reason);
	    self.close();
	  });
	}

	inherits(SenderReceiver, BufferedSender);

	SenderReceiver.prototype.close = function () {
	  debug('close');
	  this.removeAllListeners();
	  if (this.poll) {
	    this.poll.abort();
	    this.poll = null;
	  }
	  this.stop();
	};

	module.exports = SenderReceiver;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)))

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var inherits = __webpack_require__(48),
	    EventEmitter = __webpack_require__(49).EventEmitter;

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:buffered-sender');
	}

	function BufferedSender(url, sender) {
	  debug(url);
	  EventEmitter.call(this);
	  this.sendBuffer = [];
	  this.sender = sender;
	  this.url = url;
	}

	inherits(BufferedSender, EventEmitter);

	BufferedSender.prototype.send = function (message) {
	  debug('send', message);
	  this.sendBuffer.push(message);
	  if (!this.sendStop) {
	    this.sendSchedule();
	  }
	};

	// For polling transports in a situation when in the message callback,
	// new message is being send. If the sending connection was started
	// before receiving one, it is possible to saturate the network and
	// timeout due to the lack of receiving socket. To avoid that we delay
	// sending messages by some small time, in order to let receiving
	// connection be started beforehand. This is only a halfmeasure and
	// does not fix the big problem, but it does make the tests go more
	// stable on slow networks.
	BufferedSender.prototype.sendScheduleWait = function () {
	  debug('sendScheduleWait');
	  var self = this;
	  var tref;
	  this.sendStop = function () {
	    debug('sendStop');
	    self.sendStop = null;
	    clearTimeout(tref);
	  };
	  tref = setTimeout(function () {
	    debug('timeout');
	    self.sendStop = null;
	    self.sendSchedule();
	  }, 25);
	};

	BufferedSender.prototype.sendSchedule = function () {
	  debug('sendSchedule', this.sendBuffer.length);
	  var self = this;
	  if (this.sendBuffer.length > 0) {
	    var payload = '[' + this.sendBuffer.join(',') + ']';
	    this.sendStop = this.sender(this.url, payload, function (err) {
	      self.sendStop = null;
	      if (err) {
	        debug('error', err);
	        self.emit('close', err.code || 1006, 'Sending error: ' + err);
	        self._cleanup();
	      } else {
	        self.sendScheduleWait();
	      }
	    });
	    this.sendBuffer = [];
	  }
	};

	BufferedSender.prototype._cleanup = function () {
	  debug('_cleanup');
	  this.removeAllListeners();
	};

	BufferedSender.prototype.stop = function () {
	  debug('stop');
	  this._cleanup();
	  if (this.sendStop) {
	    this.sendStop();
	    this.sendStop = null;
	  }
	};

	module.exports = BufferedSender;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)))

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var inherits = __webpack_require__(48),
	    EventEmitter = __webpack_require__(49).EventEmitter;

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:polling');
	}

	function Polling(Receiver, receiveUrl, AjaxObject) {
	  debug(receiveUrl);
	  EventEmitter.call(this);
	  this.Receiver = Receiver;
	  this.receiveUrl = receiveUrl;
	  this.AjaxObject = AjaxObject;
	  this._scheduleReceiver();
	}

	inherits(Polling, EventEmitter);

	Polling.prototype._scheduleReceiver = function () {
	  debug('_scheduleReceiver');
	  var self = this;
	  var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);

	  poll.on('message', function (msg) {
	    debug('message', msg);
	    self.emit('message', msg);
	  });

	  poll.once('close', function (code, reason) {
	    debug('close', code, reason, self.pollIsClosing);
	    self.poll = poll = null;

	    if (!self.pollIsClosing) {
	      if (reason === 'network') {
	        self._scheduleReceiver();
	      } else {
	        self.emit('close', code || 1006, reason);
	        self.removeAllListeners();
	      }
	    }
	  });
	};

	Polling.prototype.abort = function () {
	  debug('abort');
	  this.removeAllListeners();
	  this.pollIsClosing = true;
	  if (this.poll) {
	    this.poll.abort();
	  }
	};

	module.exports = Polling;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)))

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var inherits = __webpack_require__(48),
	    EventEmitter = __webpack_require__(49).EventEmitter;

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:receiver:xhr');
	}

	function XhrReceiver(url, AjaxObject) {
	  debug(url);
	  EventEmitter.call(this);
	  var self = this;

	  this.bufferPosition = 0;

	  this.xo = new AjaxObject('POST', url, null);
	  this.xo.on('chunk', this._chunkHandler.bind(this));
	  this.xo.once('finish', function (status, text) {
	    debug('finish', status, text);
	    self._chunkHandler(status, text);
	    self.xo = null;
	    var reason = status === 200 ? 'network' : 'permanent';
	    debug('close', reason);
	    self.emit('close', null, reason);
	    self._cleanup();
	  });
	}

	inherits(XhrReceiver, EventEmitter);

	XhrReceiver.prototype._chunkHandler = function (status, text) {
	  debug('_chunkHandler', status);
	  if (status !== 200 || !text) {
	    return;
	  }

	  for (var idx = -1;; this.bufferPosition += idx + 1) {
	    var buf = text.slice(this.bufferPosition);
	    idx = buf.indexOf('\n');
	    if (idx === -1) {
	      break;
	    }
	    var msg = buf.slice(0, idx);
	    if (msg) {
	      debug('message', msg);
	      this.emit('message', msg);
	    }
	  }
	};

	XhrReceiver.prototype._cleanup = function () {
	  debug('_cleanup');
	  this.removeAllListeners();
	};

	XhrReceiver.prototype.abort = function () {
	  debug('abort');
	  if (this.xo) {
	    this.xo.close();
	    debug('close');
	    this.emit('close', null, 'user');
	    this.xo = null;
	  }
	  this._cleanup();
	};

	module.exports = XhrReceiver;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)))

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var inherits = __webpack_require__(48),
	    XhrDriver = __webpack_require__(59);

	function XHRCorsObject(method, url, payload, opts) {
	  XhrDriver.call(this, method, url, payload, opts);
	}

	inherits(XHRCorsObject, XhrDriver);

	XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;

	module.exports = XHRCorsObject;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {'use strict';

	var EventEmitter = __webpack_require__(49).EventEmitter,
	    inherits = __webpack_require__(48),
	    utils = __webpack_require__(37),
	    urlUtils = __webpack_require__(40),
	    XHR = global.XMLHttpRequest;

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:browser:xhr');
	}

	function AbstractXHRObject(method, url, payload, opts) {
	  debug(method, url);
	  var self = this;
	  EventEmitter.call(this);

	  setTimeout(function () {
	    self._start(method, url, payload, opts);
	  }, 0);
	}

	inherits(AbstractXHRObject, EventEmitter);

	AbstractXHRObject.prototype._start = function (method, url, payload, opts) {
	  var self = this;

	  try {
	    this.xhr = new XHR();
	  } catch (x) {
	    // intentionally empty
	  }

	  if (!this.xhr) {
	    debug('no xhr');
	    this.emit('finish', 0, 'no xhr support');
	    this._cleanup();
	    return;
	  }

	  // several browsers cache POSTs
	  url = urlUtils.addQuery(url, 't=' + +new Date());

	  // Explorer tends to keep connection open, even after the
	  // tab gets closed: http://bugs.jquery.com/ticket/5280
	  this.unloadRef = utils.unloadAdd(function () {
	    debug('unload cleanup');
	    self._cleanup(true);
	  });
	  try {
	    this.xhr.open(method, url, true);
	    if (this.timeout && 'timeout' in this.xhr) {
	      this.xhr.timeout = this.timeout;
	      this.xhr.ontimeout = function () {
	        debug('xhr timeout');
	        self.emit('finish', 0, '');
	        self._cleanup(false);
	      };
	    }
	  } catch (e) {
	    debug('exception', e);
	    // IE raises an exception on wrong port.
	    this.emit('finish', 0, '');
	    this._cleanup(false);
	    return;
	  }

	  if ((!opts || !opts.noCredentials) && AbstractXHRObject.supportsCORS) {
	    debug('withCredentials');
	    // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
	    // "This never affects same-site requests."

	    this.xhr.withCredentials = 'true';
	  }
	  if (opts && opts.headers) {
	    for (var key in opts.headers) {
	      this.xhr.setRequestHeader(key, opts.headers[key]);
	    }
	  }

	  this.xhr.onreadystatechange = function () {
	    if (self.xhr) {
	      var x = self.xhr;
	      var text, status;
	      debug('readyState', x.readyState);
	      switch (x.readyState) {
	        case 3:
	          // IE doesn't like peeking into responseText or status
	          // on Microsoft.XMLHTTP and readystate=3
	          try {
	            status = x.status;
	            text = x.responseText;
	          } catch (e) {
	            // intentionally empty
	          }
	          debug('status', status);
	          // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
	          if (status === 1223) {
	            status = 204;
	          }

	          // IE does return readystate == 3 for 404 answers.
	          if (status === 200 && text && text.length > 0) {
	            debug('chunk');
	            self.emit('chunk', status, text);
	          }
	          break;
	        case 4:
	          status = x.status;
	          debug('status', status);
	          // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
	          if (status === 1223) {
	            status = 204;
	          }
	          // IE returns this for a bad port
	          // http://msdn.microsoft.com/en-us/library/windows/desktop/aa383770(v=vs.85).aspx
	          if (status === 12005 || status === 12029) {
	            status = 0;
	          }

	          debug('finish', status, x.responseText);
	          self.emit('finish', status, x.responseText);
	          self._cleanup(false);
	          break;
	      }
	    }
	  };

	  try {
	    self.xhr.send(payload);
	  } catch (e) {
	    self.emit('finish', 0, '');
	    self._cleanup(false);
	  }
	};

	AbstractXHRObject.prototype._cleanup = function (abort) {
	  debug('cleanup');
	  if (!this.xhr) {
	    return;
	  }
	  this.removeAllListeners();
	  utils.unloadDel(this.unloadRef);

	  // IE needs this field to be a function
	  this.xhr.onreadystatechange = function () {};
	  if (this.xhr.ontimeout) {
	    this.xhr.ontimeout = null;
	  }

	  if (abort) {
	    try {
	      this.xhr.abort();
	    } catch (x) {
	      // intentionally empty
	    }
	  }
	  this.unloadRef = this.xhr = null;
	};

	AbstractXHRObject.prototype.close = function () {
	  debug('close');
	  this._cleanup(true);
	};

	AbstractXHRObject.enabled = !!XHR;
	// override XMLHttpRequest for IE6/7
	// obfuscate to avoid firewalls
	var axo = ['Active'].concat('Object').join('X');
	if (!AbstractXHRObject.enabled && axo in global) {
	  debug('overriding xmlhttprequest');
	  XHR = function XHR() {
	    try {
	      return new global[axo]('Microsoft.XMLHTTP');
	    } catch (e) {
	      return null;
	    }
	  };
	  AbstractXHRObject.enabled = !!new XHR();
	}

	var cors = false;
	try {
	  cors = 'withCredentials' in new XHR();
	} catch (ignored) {
	  // intentionally empty
	}

	AbstractXHRObject.supportsCORS = cors;

	module.exports = AbstractXHRObject;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(36)))

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var inherits = __webpack_require__(48),
	    XhrDriver = __webpack_require__(59);

	function XHRLocalObject(method, url, payload /*, opts */) {
	  XhrDriver.call(this, method, url, payload, {
	    noCredentials: true
	  });
	}

	inherits(XHRLocalObject, XhrDriver);

	XHRLocalObject.enabled = XhrDriver.enabled;

	module.exports = XHRLocalObject;

/***/ },
/* 61 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	module.exports = {
	  isOpera: function isOpera() {
	    return global.navigator && /opera/i.test(global.navigator.userAgent);
	  },

	  isKonqueror: function isKonqueror() {
	    return global.navigator && /konqueror/i.test(global.navigator.userAgent);
	  }

	  // #187 wrap document.domain in try/catch because of WP8 from file:///
	  , hasDomain: function hasDomain() {
	    // non-browser client always has a domain
	    if (!global.document) {
	      return true;
	    }

	    try {
	      return !!global.document.domain;
	    } catch (e) {
	      return false;
	    }
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var inherits = __webpack_require__(48),
	    AjaxBasedTransport = __webpack_require__(53),
	    XhrReceiver = __webpack_require__(57),
	    XDRObject = __webpack_require__(63);

	// According to:
	//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
	//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/

	function XdrStreamingTransport(transUrl) {
	  if (!XDRObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
	}

	inherits(XdrStreamingTransport, AjaxBasedTransport);

	XdrStreamingTransport.enabled = function (info) {
	  if (info.cookie_needed || info.nullOrigin) {
	    return false;
	  }
	  return XDRObject.enabled && info.sameScheme;
	};

	XdrStreamingTransport.transportName = 'xdr-streaming';
	XdrStreamingTransport.roundTrips = 2; // preflight, ajax

	module.exports = XdrStreamingTransport;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';

	var EventEmitter = __webpack_require__(49).EventEmitter,
	    inherits = __webpack_require__(48),
	    eventUtils = __webpack_require__(37),
	    browser = __webpack_require__(61),
	    urlUtils = __webpack_require__(40);

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:sender:xdr');
	}

	// References:
	//   http://ajaxian.com/archives/100-line-ajax-wrapper
	//   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx

	function XDRObject(method, url, payload) {
	  debug(method, url);
	  var self = this;
	  EventEmitter.call(this);

	  setTimeout(function () {
	    self._start(method, url, payload);
	  }, 0);
	}

	inherits(XDRObject, EventEmitter);

	XDRObject.prototype._start = function (method, url, payload) {
	  debug('_start');
	  var self = this;
	  var xdr = new global.XDomainRequest();
	  // IE caches even POSTs
	  url = urlUtils.addQuery(url, 't=' + +new Date());

	  xdr.onerror = function () {
	    debug('onerror');
	    self._error();
	  };
	  xdr.ontimeout = function () {
	    debug('ontimeout');
	    self._error();
	  };
	  xdr.onprogress = function () {
	    debug('progress', xdr.responseText);
	    self.emit('chunk', 200, xdr.responseText);
	  };
	  xdr.onload = function () {
	    debug('load');
	    self.emit('finish', 200, xdr.responseText);
	    self._cleanup(false);
	  };
	  this.xdr = xdr;
	  this.unloadRef = eventUtils.unloadAdd(function () {
	    self._cleanup(true);
	  });
	  try {
	    // Fails with AccessDenied if port number is bogus
	    this.xdr.open(method, url);
	    if (this.timeout) {
	      this.xdr.timeout = this.timeout;
	    }
	    this.xdr.send(payload);
	  } catch (x) {
	    this._error();
	  }
	};

	XDRObject.prototype._error = function () {
	  this.emit('finish', 0, '');
	  this._cleanup(false);
	};

	XDRObject.prototype._cleanup = function (abort) {
	  debug('cleanup', abort);
	  if (!this.xdr) {
	    return;
	  }
	  this.removeAllListeners();
	  eventUtils.unloadDel(this.unloadRef);

	  this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
	  if (abort) {
	    try {
	      this.xdr.abort();
	    } catch (x) {
	      // intentionally empty
	    }
	  }
	  this.unloadRef = this.xdr = null;
	};

	XDRObject.prototype.close = function () {
	  debug('close');
	  this._cleanup(true);
	};

	// IE 8/9 if the request target uses the same scheme - #79
	XDRObject.enabled = !!(global.XDomainRequest && browser.hasDomain());

	module.exports = XDRObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36), (function() { return this; }())))

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var inherits = __webpack_require__(48),
	    AjaxBasedTransport = __webpack_require__(53),
	    EventSourceReceiver = __webpack_require__(65),
	    XHRCorsObject = __webpack_require__(58),
	    EventSourceDriver = __webpack_require__(66);

	function EventSourceTransport(transUrl) {
	  if (!EventSourceTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }

	  AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
	}

	inherits(EventSourceTransport, AjaxBasedTransport);

	EventSourceTransport.enabled = function () {
	  return !!EventSourceDriver;
	};

	EventSourceTransport.transportName = 'eventsource';
	EventSourceTransport.roundTrips = 2;

	module.exports = EventSourceTransport;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var inherits = __webpack_require__(48),
	    EventEmitter = __webpack_require__(49).EventEmitter,
	    EventSourceDriver = __webpack_require__(66);

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:receiver:eventsource');
	}

	function EventSourceReceiver(url) {
	  debug(url);
	  EventEmitter.call(this);

	  var self = this;
	  var es = this.es = new EventSourceDriver(url);
	  es.onmessage = function (e) {
	    debug('message', e.data);
	    self.emit('message', decodeURI(e.data));
	  };
	  es.onerror = function (e) {
	    debug('error', es.readyState, e);
	    // ES on reconnection has readyState = 0 or 1.
	    // on network error it's CLOSED = 2
	    var reason = es.readyState !== 2 ? 'network' : 'permanent';
	    self._cleanup();
	    self._close(reason);
	  };
	}

	inherits(EventSourceReceiver, EventEmitter);

	EventSourceReceiver.prototype.abort = function () {
	  debug('abort');
	  this._cleanup();
	  this._close('user');
	};

	EventSourceReceiver.prototype._cleanup = function () {
	  debug('cleanup');
	  var es = this.es;
	  if (es) {
	    es.onmessage = es.onerror = null;
	    es.close();
	    this.es = null;
	  }
	};

	EventSourceReceiver.prototype._close = function (reason) {
	  debug('close', reason);
	  var self = this;
	  // Safari and chrome < 15 crash if we close window before
	  // waiting for ES cleanup. See:
	  // https://code.google.com/p/chromium/issues/detail?id=89155
	  setTimeout(function () {
	    self.emit('close', null, reason);
	    self.removeAllListeners();
	  }, 200);
	};

	module.exports = EventSourceReceiver;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)))

/***/ },
/* 66 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	module.exports = global.EventSource;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var inherits = __webpack_require__(48),
	    IframeTransport = __webpack_require__(68),
	    objectUtils = __webpack_require__(73);

	module.exports = function (transport) {

	  function IframeWrapTransport(transUrl, baseUrl) {
	    IframeTransport.call(this, transport.transportName, transUrl, baseUrl);
	  }

	  inherits(IframeWrapTransport, IframeTransport);

	  IframeWrapTransport.enabled = function (url, info) {
	    if (!global.document) {
	      return false;
	    }

	    var iframeInfo = objectUtils.extend({}, info);
	    iframeInfo.sameOrigin = true;
	    return transport.enabled(iframeInfo) && IframeTransport.enabled();
	  };

	  IframeWrapTransport.transportName = 'iframe-' + transport.transportName;
	  IframeWrapTransport.needBody = true;
	  IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)

	  IframeWrapTransport.facadeTransport = transport;

	  return IframeWrapTransport;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	// Few cool transports do work only for same-origin. In order to make
	// them work cross-domain we shall use iframe, served from the
	// remote domain. New browsers have capabilities to communicate with
	// cross domain iframe using postMessage(). In IE it was implemented
	// from IE 8+, but of course, IE got some details wrong:
	//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
	//    http://stevesouders.com/misc/test-postmessage.php

	var inherits = __webpack_require__(48),
	    JSON3 = __webpack_require__(69),
	    EventEmitter = __webpack_require__(49).EventEmitter,
	    version = __webpack_require__(71),
	    urlUtils = __webpack_require__(40),
	    iframeUtils = __webpack_require__(72),
	    eventUtils = __webpack_require__(37),
	    random = __webpack_require__(38);

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:transport:iframe');
	}

	function IframeTransport(transport, transUrl, baseUrl) {
	  if (!IframeTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }
	  EventEmitter.call(this);

	  var self = this;
	  this.origin = urlUtils.getOrigin(baseUrl);
	  this.baseUrl = baseUrl;
	  this.transUrl = transUrl;
	  this.transport = transport;
	  this.windowId = random.string(8);

	  var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
	  debug(transport, transUrl, iframeUrl);

	  this.iframeObj = iframeUtils.createIframe(iframeUrl, function (r) {
	    debug('err callback');
	    self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
	    self.close();
	  });

	  this.onmessageCallback = this._message.bind(this);
	  eventUtils.attachEvent('message', this.onmessageCallback);
	}

	inherits(IframeTransport, EventEmitter);

	IframeTransport.prototype.close = function () {
	  debug('close');
	  this.removeAllListeners();
	  if (this.iframeObj) {
	    eventUtils.detachEvent('message', this.onmessageCallback);
	    try {
	      // When the iframe is not loaded, IE raises an exception
	      // on 'contentWindow'.
	      this.postMessage('c');
	    } catch (x) {
	      // intentionally empty
	    }
	    this.iframeObj.cleanup();
	    this.iframeObj = null;
	    this.onmessageCallback = this.iframeObj = null;
	  }
	};

	IframeTransport.prototype._message = function (e) {
	  debug('message', e.data);
	  if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
	    debug('not same origin', e.origin, this.origin);
	    return;
	  }

	  var iframeMessage;
	  try {
	    iframeMessage = JSON3.parse(e.data);
	  } catch (ignored) {
	    debug('bad json', e.data);
	    return;
	  }

	  if (iframeMessage.windowId !== this.windowId) {
	    debug('mismatched window id', iframeMessage.windowId, this.windowId);
	    return;
	  }

	  switch (iframeMessage.type) {
	    case 's':
	      this.iframeObj.loaded();
	      // window global dependency
	      this.postMessage('s', JSON3.stringify([version, this.transport, this.transUrl, this.baseUrl]));
	      break;
	    case 't':
	      this.emit('message', iframeMessage.data);
	      break;
	    case 'c':
	      var cdata;
	      try {
	        cdata = JSON3.parse(iframeMessage.data);
	      } catch (ignored) {
	        debug('bad json', iframeMessage.data);
	        return;
	      }
	      this.emit('close', cdata[0], cdata[1]);
	      this.close();
	      break;
	  }
	};

	IframeTransport.prototype.postMessage = function (type, data) {
	  debug('postMessage', type, data);
	  this.iframeObj.post(JSON3.stringify({
	    windowId: this.windowId,
	    type: type,
	    data: data || ''
	  }), this.origin);
	};

	IframeTransport.prototype.send = function (message) {
	  debug('send', message);
	  this.postMessage('m', message);
	};

	IframeTransport.enabled = function () {
	  return iframeUtils.iframeEnabled;
	};

	IframeTransport.transportName = 'iframe';
	IframeTransport.roundTrips = 2;

	module.exports = IframeTransport;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)))

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
	;(function () {
	  // Detect the `define` function exposed by asynchronous module loaders. The
	  // strict `define` check is necessary for compatibility with `r.js`.
	  var isLoader = "function" === "function" && __webpack_require__(70);

	  // A set of types used to distinguish objects from primitives.
	  var objectTypes = {
	    "function": true,
	    "object": true
	  };

	  // Detect the `exports` object exposed by CommonJS implementations.
	  var freeExports = objectTypes[ false ? "undefined" : _typeof(exports)] && exports && !exports.nodeType && exports;

	  // Use the `global` object exposed by Node (including Browserify via
	  // `insert-module-globals`), Narwhal, and Ringo as the default context,
	  // and the `window` object in browsers. Rhino exports a `global` function
	  // instead.
	  var root = objectTypes[typeof window === "undefined" ? "undefined" : _typeof(window)] && window || this,
	      freeGlobal = freeExports && objectTypes[ false ? "undefined" : _typeof(module)] && module && !module.nodeType && (typeof global === "undefined" ? "undefined" : _typeof(global)) == "object" && global;

	  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
	    root = freeGlobal;
	  }

	  // Public: Initializes JSON 3 using the given `context` object, attaching the
	  // `stringify` and `parse` functions to the specified `exports` object.
	  function runInContext(context, exports) {
	    context || (context = root["Object"]());
	    exports || (exports = root["Object"]());

	    // Native constructor aliases.
	    var Number = context["Number"] || root["Number"],
	        String = context["String"] || root["String"],
	        Object = context["Object"] || root["Object"],
	        Date = context["Date"] || root["Date"],
	        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
	        TypeError = context["TypeError"] || root["TypeError"],
	        Math = context["Math"] || root["Math"],
	        nativeJSON = context["JSON"] || root["JSON"];

	    // Delegate to the native `stringify` and `parse` implementations.
	    if ((typeof nativeJSON === "undefined" ? "undefined" : _typeof(nativeJSON)) == "object" && nativeJSON) {
	      exports.stringify = nativeJSON.stringify;
	      exports.parse = nativeJSON.parse;
	    }

	    // Convenience aliases.
	    var objectProto = Object.prototype,
	        getClass = objectProto.toString,
	        _isProperty,
	        _forEach,
	        undef;

	    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
	    var isExtended = new Date(-3509827334573292);
	    try {
	      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
	      // results for certain dates in Opera >= 10.53.
	      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
	      // Safari < 2.0.2 stores the internal millisecond time value correctly,
	      // but clips the values returned by the date methods to the range of
	      // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
	      isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
	    } catch (exception) {}

	    // Internal: Determines whether the native `JSON.stringify` and `parse`
	    // implementations are spec-compliant. Based on work by Ken Snyder.
	    function has(name) {
	      if (has[name] !== undef) {
	        // Return cached feature test result.
	        return has[name];
	      }
	      var isSupported;
	      if (name == "bug-string-char-index") {
	        // IE <= 7 doesn't support accessing string characters using square
	        // bracket notation. IE 8 only supports this for primitives.
	        isSupported = "a"[0] != "a";
	      } else if (name == "json") {
	        // Indicates whether both `JSON.stringify` and `JSON.parse` are
	        // supported.
	        isSupported = has("json-stringify") && has("json-parse");
	      } else {
	        var value,
	            serialized = "{\"a\":[1,true,false,null,\"\\u0000\\b\\n\\f\\r\\t\"]}";
	        // Test `JSON.stringify`.
	        if (name == "json-stringify") {
	          var stringify = exports.stringify,
	              stringifySupported = typeof stringify == "function" && isExtended;
	          if (stringifySupported) {
	            // A test function object with a custom `toJSON` method.
	            (value = function value() {
	              return 1;
	            }).toJSON = value;
	            try {
	              stringifySupported =
	              // Firefox 3.1b1 and b2 serialize string, number, and boolean
	              // primitives as object literals.
	              stringify(0) === "0" &&
	              // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
	              // literals.
	              stringify(new Number()) === "0" && stringify(new String()) == '""' &&
	              // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
	              // does not define a canonical JSON representation (this applies to
	              // objects with `toJSON` properties as well, *unless* they are nested
	              // within an object or array).
	              stringify(getClass) === undef &&
	              // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
	              // FF 3.1b3 pass this test.
	              stringify(undef) === undef &&
	              // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
	              // respectively, if the value is omitted entirely.
	              stringify() === undef &&
	              // FF 3.1b1, 2 throw an error if the given value is not a number,
	              // string, array, object, Boolean, or `null` literal. This applies to
	              // objects with custom `toJSON` methods as well, unless they are nested
	              // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
	              // methods entirely.
	              stringify(value) === "1" && stringify([value]) == "[1]" &&
	              // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
	              // `"[null]"`.
	              stringify([undef]) == "[null]" &&
	              // YUI 3.0.0b1 fails to serialize `null` literals.
	              stringify(null) == "null" &&
	              // FF 3.1b1, 2 halts serialization if an array contains a function:
	              // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
	              // elides non-JSON values from objects and arrays, unless they
	              // define custom `toJSON` methods.
	              stringify([undef, getClass, null]) == "[null,null,null]" &&
	              // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
	              // where character escape codes are expected (e.g., `\b` => `\u0008`).
	              stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
	              // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
	              stringify(null, value) === "1" && stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
	              // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
	              // serialize extended years.
	              stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
	              // The milliseconds are optional in ES 5, but required in 5.1.
	              stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
	              // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
	              // four-digit years instead of six-digit years. Credits: @Yaffle.
	              stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
	              // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
	              // values less than 1000. Credits: @Yaffle.
	              stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
	            } catch (exception) {
	              stringifySupported = false;
	            }
	          }
	          isSupported = stringifySupported;
	        }
	        // Test `JSON.parse`.
	        if (name == "json-parse") {
	          var parse = exports.parse;
	          if (typeof parse == "function") {
	            try {
	              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
	              // Conforming implementations should also coerce the initial argument to
	              // a string prior to parsing.
	              if (parse("0") === 0 && !parse(false)) {
	                // Simple parsing test.
	                value = parse(serialized);
	                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
	                if (parseSupported) {
	                  try {
	                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
	                    parseSupported = !parse('"\t"');
	                  } catch (exception) {}
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
	                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
	                      // certain octal literals.
	                      parseSupported = parse("01") !== 1;
	                    } catch (exception) {}
	                  }
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
	                      // points. These environments, along with FF 3.1b1 and 2,
	                      // also allow trailing commas in JSON objects and arrays.
	                      parseSupported = parse("1.") !== 1;
	                    } catch (exception) {}
	                  }
	                }
	              }
	            } catch (exception) {
	              parseSupported = false;
	            }
	          }
	          isSupported = parseSupported;
	        }
	      }
	      return has[name] = !!isSupported;
	    }

	    if (!has("json")) {
	      // Common `[[Class]]` name aliases.
	      var functionClass = "[object Function]",
	          dateClass = "[object Date]",
	          numberClass = "[object Number]",
	          stringClass = "[object String]",
	          arrayClass = "[object Array]",
	          booleanClass = "[object Boolean]";

	      // Detect incomplete support for accessing string characters by index.
	      var charIndexBuggy = has("bug-string-char-index");

	      // Define additional utility methods if the `Date` methods are buggy.
	      if (!isExtended) {
	        var floor = Math.floor;
	        // A mapping between the months of the year and the number of days between
	        // January 1st and the first of the respective month.
	        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
	        // Internal: Calculates the number of days between the Unix epoch and the
	        // first day of the given month.
	        var getDay = function getDay(year, month) {
	          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
	        };
	      }

	      // Internal: Determines if a property is a direct property of the given
	      // object. Delegates to the native `Object#hasOwnProperty` method.
	      if (!(_isProperty = objectProto.hasOwnProperty)) {
	        _isProperty = function isProperty(property) {
	          var members = {},
	              constructor;
	          if ((members.__proto__ = null, members.__proto__ = {
	            // The *proto* property cannot be set multiple times in recent
	            // versions of Firefox and SeaMonkey.
	            "toString": 1
	          }, members).toString != getClass) {
	            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
	            // supports the mutable *proto* property.
	            _isProperty = function isProperty(property) {
	              // Capture and break the object's prototype chain (see section 8.6.2
	              // of the ES 5.1 spec). The parenthesized expression prevents an
	              // unsafe transformation by the Closure Compiler.
	              var original = this.__proto__,
	                  result = property in (this.__proto__ = null, this);
	              // Restore the original prototype chain.
	              this.__proto__ = original;
	              return result;
	            };
	          } else {
	            // Capture a reference to the top-level `Object` constructor.
	            constructor = members.constructor;
	            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
	            // other environments.
	            _isProperty = function isProperty(property) {
	              var parent = (this.constructor || constructor).prototype;
	              return property in this && !(property in parent && this[property] === parent[property]);
	            };
	          }
	          members = null;
	          return _isProperty.call(this, property);
	        };
	      }

	      // Internal: Normalizes the `for...in` iteration algorithm across
	      // environments. Each enumerated key is yielded to a `callback` function.
	      _forEach = function forEach(object, callback) {
	        var size = 0,
	            Properties,
	            members,
	            property;

	        // Tests for bugs in the current environment's `for...in` algorithm. The
	        // `valueOf` property inherits the non-enumerable flag from
	        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
	        (Properties = function Properties() {
	          this.valueOf = 0;
	        }).prototype.valueOf = 0;

	        // Iterate over a new instance of the `Properties` class.
	        members = new Properties();
	        for (property in members) {
	          // Ignore all properties inherited from `Object.prototype`.
	          if (_isProperty.call(members, property)) {
	            size++;
	          }
	        }
	        Properties = members = null;

	        // Normalize the iteration algorithm.
	        if (!size) {
	          // A list of non-enumerable properties inherited from `Object.prototype`.
	          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
	          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
	          // properties.
	          _forEach = function forEach(object, callback) {
	            var isFunction = getClass.call(object) == functionClass,
	                property,
	                length;
	            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[_typeof(object.hasOwnProperty)] && object.hasOwnProperty || _isProperty;
	            for (property in object) {
	              // Gecko <= 1.0 enumerates the `prototype` property of functions under
	              // certain conditions; IE does not.
	              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for each non-enumerable property.
	            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property)) {}
	          };
	        } else if (size == 2) {
	          // Safari <= 2.0.4 enumerates shadowed properties twice.
	          _forEach = function forEach(object, callback) {
	            // Create a set of iterated properties.
	            var members = {},
	                isFunction = getClass.call(object) == functionClass,
	                property;
	            for (property in object) {
	              // Store each property name to prevent double enumeration. The
	              // `prototype` property of functions is not enumerated due to cross-
	              // environment inconsistencies.
	              if (!(isFunction && property == "prototype") && !_isProperty.call(members, property) && (members[property] = 1) && _isProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	          };
	        } else {
	          // No bugs detected; use the standard `for...in` algorithm.
	          _forEach = function forEach(object, callback) {
	            var isFunction = getClass.call(object) == functionClass,
	                property,
	                isConstructor;
	            for (property in object) {
	              if (!(isFunction && property == "prototype") && _isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for the `constructor` property due to
	            // cross-environment inconsistencies.
	            if (isConstructor || _isProperty.call(object, property = "constructor")) {
	              callback(property);
	            }
	          };
	        }
	        return _forEach(object, callback);
	      };

	      // Public: Serializes a JavaScript `value` as a JSON string. The optional
	      // `filter` argument may specify either a function that alters how object and
	      // array members are serialized, or an array of strings and numbers that
	      // indicates which properties should be serialized. The optional `width`
	      // argument may be either a string or number that specifies the indentation
	      // level of the output.
	      if (!has("json-stringify")) {
	        // Internal: A map of control characters and their escaped equivalents.
	        var Escapes = {
	          92: "\\\\",
	          34: '\\"',
	          8: "\\b",
	          12: "\\f",
	          10: "\\n",
	          13: "\\r",
	          9: "\\t"
	        };

	        // Internal: Converts `value` into a zero-padded string such that its
	        // length is at least equal to `width`. The `width` must be <= 6.
	        var leadingZeroes = "000000";
	        var toPaddedString = function toPaddedString(width, value) {
	          // The `|| 0` expression is necessary to work around a bug in
	          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
	          return (leadingZeroes + (value || 0)).slice(-width);
	        };

	        // Internal: Double-quotes a string `value`, replacing all ASCII control
	        // characters (characters with code unit values between 0 and 31) with
	        // their escaped equivalents. This is an implementation of the
	        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
	        var unicodePrefix = "\\u00";
	        var quote = function quote(value) {
	          var result = '"',
	              index = 0,
	              length = value.length,
	              useCharIndex = !charIndexBuggy || length > 10;
	          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
	          for (; index < length; index++) {
	            var charCode = value.charCodeAt(index);
	            // If the character is a control character, append its Unicode or
	            // shorthand escape sequence; otherwise, append the character as-is.
	            switch (charCode) {
	              case 8:case 9:case 10:case 12:case 13:case 34:case 92:
	                result += Escapes[charCode];
	                break;
	              default:
	                if (charCode < 32) {
	                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
	                  break;
	                }
	                result += useCharIndex ? symbols[index] : value.charAt(index);
	            }
	          }
	          return result + '"';
	        };

	        // Internal: Recursively serializes an object. Implements the
	        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
	        var serialize = function serialize(property, object, callback, properties, whitespace, indentation, stack) {
	          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
	          try {
	            // Necessary for host object support.
	            value = object[property];
	          } catch (exception) {}
	          if ((typeof value === "undefined" ? "undefined" : _typeof(value)) == "object" && value) {
	            className = getClass.call(value);
	            if (className == dateClass && !_isProperty.call(value, "toJSON")) {
	              if (value > -1 / 0 && value < 1 / 0) {
	                // Dates are serialized according to the `Date#toJSON` method
	                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
	                // for the ISO 8601 date time string format.
	                if (getDay) {
	                  // Manually compute the year, month, date, hours, minutes,
	                  // seconds, and milliseconds if the `getUTC*` methods are
	                  // buggy. Adapted from @Yaffle's `date-shim` project.
	                  date = floor(value / 864e5);
	                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++) {}
	                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++) {}
	                  date = 1 + date - getDay(year, month);
	                  // The `time` value specifies the time within the day (see ES
	                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
	                  // to compute `A modulo B`, as the `%` operator does not
	                  // correspond to the `modulo` operation for negative numbers.
	                  time = (value % 864e5 + 864e5) % 864e5;
	                  // The hours, minutes, seconds, and milliseconds are obtained by
	                  // decomposing the time within the day. See section 15.9.1.10.
	                  hours = floor(time / 36e5) % 24;
	                  minutes = floor(time / 6e4) % 60;
	                  seconds = floor(time / 1e3) % 60;
	                  milliseconds = time % 1e3;
	                } else {
	                  year = value.getUTCFullYear();
	                  month = value.getUTCMonth();
	                  date = value.getUTCDate();
	                  hours = value.getUTCHours();
	                  minutes = value.getUTCMinutes();
	                  seconds = value.getUTCSeconds();
	                  milliseconds = value.getUTCMilliseconds();
	                }
	                // Serialize extended years correctly.
	                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) + "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
	                // Months, dates, hours, minutes, and seconds should have two
	                // digits; milliseconds should have three.
	                "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
	                // Milliseconds are optional in ES 5.0, but required in 5.1.
	                "." + toPaddedString(3, milliseconds) + "Z";
	              } else {
	                value = null;
	              }
	            } else if (typeof value.toJSON == "function" && (className != numberClass && className != stringClass && className != arrayClass || _isProperty.call(value, "toJSON"))) {
	              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
	              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
	              // ignores all `toJSON` methods on these objects unless they are
	              // defined directly on an instance.
	              value = value.toJSON(property);
	            }
	          }
	          if (callback) {
	            // If a replacement function was provided, call it to obtain the value
	            // for serialization.
	            value = callback.call(object, property, value);
	          }
	          if (value === null) {
	            return "null";
	          }
	          className = getClass.call(value);
	          if (className == booleanClass) {
	            // Booleans are represented literally.
	            return "" + value;
	          } else if (className == numberClass) {
	            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
	            // `"null"`.
	            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
	          } else if (className == stringClass) {
	            // Strings are double-quoted and escaped.
	            return quote("" + value);
	          }
	          // Recursively serialize objects and arrays.
	          if ((typeof value === "undefined" ? "undefined" : _typeof(value)) == "object") {
	            // Check for cyclic structures. This is a linear search; performance
	            // is inversely proportional to the number of unique nested objects.
	            for (length = stack.length; length--;) {
	              if (stack[length] === value) {
	                // Cyclic structures cannot be serialized by `JSON.stringify`.
	                throw TypeError();
	              }
	            }
	            // Add the object to the stack of traversed objects.
	            stack.push(value);
	            results = [];
	            // Save the current indentation level and indent one additional level.
	            prefix = indentation;
	            indentation += whitespace;
	            if (className == arrayClass) {
	              // Recursively serialize array elements.
	              for (index = 0, length = value.length; index < length; index++) {
	                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
	                results.push(element === undef ? "null" : element);
	              }
	              result = results.length ? whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : "[" + results.join(",") + "]" : "[]";
	            } else {
	              // Recursively serialize object members. Members are selected from
	              // either a user-specified list of property names, or the object
	              // itself.
	              _forEach(properties || value, function (property) {
	                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
	                if (element !== undef) {
	                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
	                  // is not the empty string, let `member` {quote(property) + ":"}
	                  // be the concatenation of `member` and the `space` character."
	                  // The "`space` character" refers to the literal space
	                  // character, not the `space` {width} argument provided to
	                  // `JSON.stringify`.
	                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
	                }
	              });
	              result = results.length ? whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : "{" + results.join(",") + "}" : "{}";
	            }
	            // Remove the object from the traversed object stack.
	            stack.pop();
	            return result;
	          }
	        };

	        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
	        exports.stringify = function (source, filter, width) {
	          var whitespace, callback, properties, className;
	          if (objectTypes[typeof filter === "undefined" ? "undefined" : _typeof(filter)] && filter) {
	            if ((className = getClass.call(filter)) == functionClass) {
	              callback = filter;
	            } else if (className == arrayClass) {
	              // Convert the property names array into a makeshift set.
	              properties = {};
	              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], (className = getClass.call(value), className == stringClass || className == numberClass) && (properties[value] = 1)) {}
	            }
	          }
	          if (width) {
	            if ((className = getClass.call(width)) == numberClass) {
	              // Convert the `width` to an integer and create a string containing
	              // `width` number of space characters.
	              if ((width -= width % 1) > 0) {
	                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ") {}
	              }
	            } else if (className == stringClass) {
	              whitespace = width.length <= 10 ? width : width.slice(0, 10);
	            }
	          }
	          // Opera <= 7.54u2 discards the values associated with empty string keys
	          // (`""`) only if they are used directly within an object member list
	          // (e.g., `!("" in { "": 1})`).
	          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
	        };
	      }

	      // Public: Parses a JSON source string.
	      if (!has("json-parse")) {
	        var fromCharCode = String.fromCharCode;

	        // Internal: A map of escaped control characters and their unescaped
	        // equivalents.
	        var Unescapes = {
	          92: "\\",
	          34: '"',
	          47: "/",
	          98: "\b",
	          116: "\t",
	          110: "\n",
	          102: "\f",
	          114: "\r"
	        };

	        // Internal: Stores the parser state.
	        var Index, Source;

	        // Internal: Resets the parser state and throws a `SyntaxError`.
	        var abort = function abort() {
	          Index = Source = null;
	          throw SyntaxError();
	        };

	        // Internal: Returns the next token, or `"$"` if the parser has reached
	        // the end of the source string. A token may be a string, number, `null`
	        // literal, or Boolean literal.
	        var lex = function lex() {
	          var source = Source,
	              length = source.length,
	              value,
	              begin,
	              position,
	              isSigned,
	              charCode;
	          while (Index < length) {
	            charCode = source.charCodeAt(Index);
	            switch (charCode) {
	              case 9:case 10:case 13:case 32:
	                // Skip whitespace tokens, including tabs, carriage returns, line
	                // feeds, and space characters.
	                Index++;
	                break;
	              case 123:case 125:case 91:case 93:case 58:case 44:
	                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
	                // the current position.
	                value = charIndexBuggy ? source.charAt(Index) : source[Index];
	                Index++;
	                return value;
	              case 34:
	                // `"` delimits a JSON string; advance to the next character and
	                // begin parsing the string. String tokens are prefixed with the
	                // sentinel `@` character to distinguish them from punctuators and
	                // end-of-string tokens.
	                for (value = "@", Index++; Index < length;) {
	                  charCode = source.charCodeAt(Index);
	                  if (charCode < 32) {
	                    // Unescaped ASCII control characters (those with a code unit
	                    // less than the space character) are not permitted.
	                    abort();
	                  } else if (charCode == 92) {
	                    // A reverse solidus (`\`) marks the beginning of an escaped
	                    // control character (including `"`, `\`, and `/`) or Unicode
	                    // escape sequence.
	                    charCode = source.charCodeAt(++Index);
	                    switch (charCode) {
	                      case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:
	                        // Revive escaped control characters.
	                        value += Unescapes[charCode];
	                        Index++;
	                        break;
	                      case 117:
	                        // `\u` marks the beginning of a Unicode escape sequence.
	                        // Advance to the first character and validate the
	                        // four-digit code point.
	                        begin = ++Index;
	                        for (position = Index + 4; Index < position; Index++) {
	                          charCode = source.charCodeAt(Index);
	                          // A valid sequence comprises four hexdigits (case-
	                          // insensitive) that form a single hexadecimal value.
	                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
	                            // Invalid Unicode escape sequence.
	                            abort();
	                          }
	                        }
	                        // Revive the escaped character.
	                        value += fromCharCode("0x" + source.slice(begin, Index));
	                        break;
	                      default:
	                        // Invalid escape sequence.
	                        abort();
	                    }
	                  } else {
	                    if (charCode == 34) {
	                      // An unescaped double-quote character marks the end of the
	                      // string.
	                      break;
	                    }
	                    charCode = source.charCodeAt(Index);
	                    begin = Index;
	                    // Optimize for the common case where a string is valid.
	                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
	                      charCode = source.charCodeAt(++Index);
	                    }
	                    // Append the string as-is.
	                    value += source.slice(begin, Index);
	                  }
	                }
	                if (source.charCodeAt(Index) == 34) {
	                  // Advance to the next character and return the revived string.
	                  Index++;
	                  return value;
	                }
	                // Unterminated string.
	                abort();
	              default:
	                // Parse numbers and literals.
	                begin = Index;
	                // Advance past the negative sign, if one is specified.
	                if (charCode == 45) {
	                  isSigned = true;
	                  charCode = source.charCodeAt(++Index);
	                }
	                // Parse an integer or floating-point value.
	                if (charCode >= 48 && charCode <= 57) {
	                  // Leading zeroes are interpreted as octal literals.
	                  if (charCode == 48 && (charCode = source.charCodeAt(Index + 1), charCode >= 48 && charCode <= 57)) {
	                    // Illegal octal literal.
	                    abort();
	                  }
	                  isSigned = false;
	                  // Parse the integer component.
	                  for (; Index < length && (charCode = source.charCodeAt(Index), charCode >= 48 && charCode <= 57); Index++) {}
	                  // Floats cannot contain a leading decimal point; however, this
	                  // case is already accounted for by the parser.
	                  if (source.charCodeAt(Index) == 46) {
	                    position = ++Index;
	                    // Parse the decimal component.
	                    for (; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++) {}
	                    if (position == Index) {
	                      // Illegal trailing decimal.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Parse exponents. The `e` denoting the exponent is
	                  // case-insensitive.
	                  charCode = source.charCodeAt(Index);
	                  if (charCode == 101 || charCode == 69) {
	                    charCode = source.charCodeAt(++Index);
	                    // Skip past the sign following the exponent, if one is
	                    // specified.
	                    if (charCode == 43 || charCode == 45) {
	                      Index++;
	                    }
	                    // Parse the exponential component.
	                    for (position = Index; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++) {}
	                    if (position == Index) {
	                      // Illegal empty exponent.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Coerce the parsed value to a JavaScript number.
	                  return +source.slice(begin, Index);
	                }
	                // A negative sign may only precede numbers.
	                if (isSigned) {
	                  abort();
	                }
	                // `true`, `false`, and `null` literals.
	                if (source.slice(Index, Index + 4) == "true") {
	                  Index += 4;
	                  return true;
	                } else if (source.slice(Index, Index + 5) == "false") {
	                  Index += 5;
	                  return false;
	                } else if (source.slice(Index, Index + 4) == "null") {
	                  Index += 4;
	                  return null;
	                }
	                // Unrecognized token.
	                abort();
	            }
	          }
	          // Return the sentinel `$` character if the parser has reached the end
	          // of the source string.
	          return "$";
	        };

	        // Internal: Parses a JSON `value` token.
	        var get = function get(value) {
	          var results, hasMembers;
	          if (value == "$") {
	            // Unexpected end of input.
	            abort();
	          }
	          if (typeof value == "string") {
	            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
	              // Remove the sentinel `@` character.
	              return value.slice(1);
	            }
	            // Parse object and array literals.
	            if (value == "[") {
	              // Parses a JSON array, returning a new JavaScript array.
	              results = [];
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing square bracket marks the end of the array literal.
	                if (value == "]") {
	                  break;
	                }
	                // If the array literal contains elements, the current token
	                // should be a comma separating the previous element from the
	                // next.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "]") {
	                      // Unexpected trailing `,` in array literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each array element.
	                    abort();
	                  }
	                }
	                // Elisions and leading commas are not permitted.
	                if (value == ",") {
	                  abort();
	                }
	                results.push(get(value));
	              }
	              return results;
	            } else if (value == "{") {
	              // Parses a JSON object, returning a new JavaScript object.
	              results = {};
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing curly brace marks the end of the object literal.
	                if (value == "}") {
	                  break;
	                }
	                // If the object literal contains members, the current token
	                // should be a comma separator.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "}") {
	                      // Unexpected trailing `,` in object literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each object member.
	                    abort();
	                  }
	                }
	                // Leading commas are not permitted, object property names must be
	                // double-quoted strings, and a `:` must separate each property
	                // name and value.
	                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
	                  abort();
	                }
	                results[value.slice(1)] = get(lex());
	              }
	              return results;
	            }
	            // Unexpected token encountered.
	            abort();
	          }
	          return value;
	        };

	        // Internal: Updates a traversed object member.
	        var update = function update(source, property, callback) {
	          var element = walk(source, property, callback);
	          if (element === undef) {
	            delete source[property];
	          } else {
	            source[property] = element;
	          }
	        };

	        // Internal: Recursively traverses a parsed JSON object, invoking the
	        // `callback` function for each value. This is an implementation of the
	        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
	        var walk = function walk(source, property, callback) {
	          var value = source[property],
	              length;
	          if ((typeof value === "undefined" ? "undefined" : _typeof(value)) == "object" && value) {
	            // `forEach` can't be used to traverse an array in Opera <= 8.54
	            // because its `Object#hasOwnProperty` implementation returns `false`
	            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
	            if (getClass.call(value) == arrayClass) {
	              for (length = value.length; length--;) {
	                update(value, length, callback);
	              }
	            } else {
	              _forEach(value, function (property) {
	                update(value, property, callback);
	              });
	            }
	          }
	          return callback.call(source, property, value);
	        };

	        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
	        exports.parse = function (source, callback) {
	          var result, value;
	          Index = 0;
	          Source = "" + source;
	          result = get(lex());
	          // If a JSON string contains multiple tokens, it is invalid.
	          if (lex() != "$") {
	            abort();
	          }
	          // Reset the parser state.
	          Index = Source = null;
	          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
	        };
	      }
	    }

	    exports["runInContext"] = runInContext;
	    return exports;
	  }

	  if (freeExports && !isLoader) {
	    // Export for CommonJS environments.
	    runInContext(root, freeExports);
	  } else {
	    // Export for web browsers and JavaScript engines.
	    var nativeJSON = root.JSON,
	        previousJSON = root["JSON3"],
	        isRestored = false;

	    var JSON3 = runInContext(root, root["JSON3"] = {
	      // Public: Restores the original value of the global `JSON` object and
	      // returns a reference to the `JSON3` object.
	      "noConflict": function noConflict() {
	        if (!isRestored) {
	          isRestored = true;
	          root.JSON = nativeJSON;
	          root["JSON3"] = previousJSON;
	          nativeJSON = previousJSON = null;
	        }
	        return JSON3;
	      }
	    });

	    root.JSON = {
	      "parse": JSON3.parse,
	      "stringify": JSON3.stringify
	    };
	  }

	  // Export for asynchronous module loaders.
	  if (isLoader) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return JSON3;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}).call(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)(module), (function() { return this; }())))

/***/ },
/* 70 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 71 */
/***/ function(module, exports) {

	'use strict';

	module.exports = '1.1.1';

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var eventUtils = __webpack_require__(37),
	    JSON3 = __webpack_require__(69),
	    browser = __webpack_require__(61);

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:utils:iframe');
	}

	module.exports = {
	  WPrefix: '_jp',
	  currentWindowId: null,

	  polluteGlobalNamespace: function polluteGlobalNamespace() {
	    if (!(module.exports.WPrefix in global)) {
	      global[module.exports.WPrefix] = {};
	    }
	  },

	  postMessage: function postMessage(type, data) {
	    if (global.parent !== global) {
	      global.parent.postMessage(JSON3.stringify({
	        windowId: module.exports.currentWindowId,
	        type: type,
	        data: data || ''
	      }), '*');
	    } else {
	      debug('Cannot postMessage, no parent window.', type, data);
	    }
	  },

	  createIframe: function createIframe(iframeUrl, errorCallback) {
	    var iframe = global.document.createElement('iframe');
	    var tref, unloadRef;
	    var unattach = function unattach() {
	      debug('unattach');
	      clearTimeout(tref);
	      // Explorer had problems with that.
	      try {
	        iframe.onload = null;
	      } catch (x) {
	        // intentionally empty
	      }
	      iframe.onerror = null;
	    };
	    var cleanup = function cleanup() {
	      debug('cleanup');
	      if (iframe) {
	        unattach();
	        // This timeout makes chrome fire onbeforeunload event
	        // within iframe. Without the timeout it goes straight to
	        // onunload.
	        setTimeout(function () {
	          if (iframe) {
	            iframe.parentNode.removeChild(iframe);
	          }
	          iframe = null;
	        }, 0);
	        eventUtils.unloadDel(unloadRef);
	      }
	    };
	    var onerror = function onerror(err) {
	      debug('onerror', err);
	      if (iframe) {
	        cleanup();
	        errorCallback(err);
	      }
	    };
	    var post = function post(msg, origin) {
	      debug('post', msg, origin);
	      try {
	        // When the iframe is not loaded, IE raises an exception
	        // on 'contentWindow'.
	        setTimeout(function () {
	          if (iframe && iframe.contentWindow) {
	            iframe.contentWindow.postMessage(msg, origin);
	          }
	        }, 0);
	      } catch (x) {
	        // intentionally empty
	      }
	    };

	    iframe.src = iframeUrl;
	    iframe.style.display = 'none';
	    iframe.style.position = 'absolute';
	    iframe.onerror = function () {
	      onerror('onerror');
	    };
	    iframe.onload = function () {
	      debug('onload');
	      // `onload` is triggered before scripts on the iframe are
	      // executed. Give it few seconds to actually load stuff.
	      clearTimeout(tref);
	      tref = setTimeout(function () {
	        onerror('onload timeout');
	      }, 2000);
	    };
	    global.document.body.appendChild(iframe);
	    tref = setTimeout(function () {
	      onerror('timeout');
	    }, 15000);
	    unloadRef = eventUtils.unloadAdd(cleanup);
	    return {
	      post: post,
	      cleanup: cleanup,
	      loaded: unattach
	    };
	  }

	  /* jshint undef: false, newcap: false */
	  /* eslint no-undef: 0, new-cap: 0 */
	  , createHtmlfile: function createHtmlfile(iframeUrl, errorCallback) {
	    var axo = ['Active'].concat('Object').join('X');
	    var doc = new global[axo]('htmlfile');
	    var tref, unloadRef;
	    var iframe;
	    var unattach = function unattach() {
	      clearTimeout(tref);
	      iframe.onerror = null;
	    };
	    var cleanup = function cleanup() {
	      if (doc) {
	        unattach();
	        eventUtils.unloadDel(unloadRef);
	        iframe.parentNode.removeChild(iframe);
	        iframe = doc = null;
	        CollectGarbage();
	      }
	    };
	    var onerror = function onerror(r) {
	      debug('onerror', r);
	      if (doc) {
	        cleanup();
	        errorCallback(r);
	      }
	    };
	    var post = function post(msg, origin) {
	      try {
	        // When the iframe is not loaded, IE raises an exception
	        // on 'contentWindow'.
	        setTimeout(function () {
	          if (iframe && iframe.contentWindow) {
	            iframe.contentWindow.postMessage(msg, origin);
	          }
	        }, 0);
	      } catch (x) {
	        // intentionally empty
	      }
	    };

	    doc.open();
	    doc.write('<html><s' + 'cript>' + 'document.domain="' + global.document.domain + '";' + '</s' + 'cript></html>');
	    doc.close();
	    doc.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
	    var c = doc.createElement('div');
	    doc.body.appendChild(c);
	    iframe = doc.createElement('iframe');
	    c.appendChild(iframe);
	    iframe.src = iframeUrl;
	    iframe.onerror = function () {
	      onerror('onerror');
	    };
	    tref = setTimeout(function () {
	      onerror('timeout');
	    }, 15000);
	    unloadRef = eventUtils.unloadAdd(cleanup);
	    return {
	      post: post,
	      cleanup: cleanup,
	      loaded: unattach
	    };
	  }
	};

	module.exports.iframeEnabled = false;
	if (global.document) {
	  // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
	  // huge delay, or not at all.
	  module.exports.iframeEnabled = (typeof global.postMessage === 'function' || _typeof(global.postMessage) === 'object') && !browser.isKonqueror();
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36), (function() { return this; }())))

/***/ },
/* 73 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	module.exports = {
	  isObject: function isObject(obj) {
	    var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
	    return type === 'function' || type === 'object' && !!obj;
	  },

	  extend: function extend(obj) {
	    if (!this.isObject(obj)) {
	      return obj;
	    }
	    var source, prop;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	      source = arguments[i];
	      for (prop in source) {
	        if (Object.prototype.hasOwnProperty.call(source, prop)) {
	          obj[prop] = source[prop];
	        }
	      }
	    }
	    return obj;
	  }
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var inherits = __webpack_require__(48),
	    HtmlfileReceiver = __webpack_require__(75),
	    XHRLocalObject = __webpack_require__(60),
	    AjaxBasedTransport = __webpack_require__(53);

	function HtmlFileTransport(transUrl) {
	  if (!HtmlfileReceiver.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
	}

	inherits(HtmlFileTransport, AjaxBasedTransport);

	HtmlFileTransport.enabled = function (info) {
	  return HtmlfileReceiver.enabled && info.sameOrigin;
	};

	HtmlFileTransport.transportName = 'htmlfile';
	HtmlFileTransport.roundTrips = 2;

	module.exports = HtmlFileTransport;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';

	var inherits = __webpack_require__(48),
	    iframeUtils = __webpack_require__(72),
	    urlUtils = __webpack_require__(40),
	    EventEmitter = __webpack_require__(49).EventEmitter,
	    random = __webpack_require__(38);

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:receiver:htmlfile');
	}

	function HtmlfileReceiver(url) {
	  debug(url);
	  EventEmitter.call(this);
	  var self = this;
	  iframeUtils.polluteGlobalNamespace();

	  this.id = 'a' + random.string(6);
	  url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));

	  debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
	  var constructFunc = HtmlfileReceiver.htmlfileEnabled ? iframeUtils.createHtmlfile : iframeUtils.createIframe;

	  global[iframeUtils.WPrefix][this.id] = {
	    start: function start() {
	      debug('start');
	      self.iframeObj.loaded();
	    },
	    message: function message(data) {
	      debug('message', data);
	      self.emit('message', data);
	    },
	    stop: function stop() {
	      debug('stop');
	      self._cleanup();
	      self._close('network');
	    }
	  };
	  this.iframeObj = constructFunc(url, function () {
	    debug('callback');
	    self._cleanup();
	    self._close('permanent');
	  });
	}

	inherits(HtmlfileReceiver, EventEmitter);

	HtmlfileReceiver.prototype.abort = function () {
	  debug('abort');
	  this._cleanup();
	  this._close('user');
	};

	HtmlfileReceiver.prototype._cleanup = function () {
	  debug('_cleanup');
	  if (this.iframeObj) {
	    this.iframeObj.cleanup();
	    this.iframeObj = null;
	  }
	  delete global[iframeUtils.WPrefix][this.id];
	};

	HtmlfileReceiver.prototype._close = function (reason) {
	  debug('_close', reason);
	  this.emit('close', null, reason);
	  this.removeAllListeners();
	};

	HtmlfileReceiver.htmlfileEnabled = false;

	// obfuscate to avoid firewalls
	var axo = ['Active'].concat('Object').join('X');
	if (axo in global) {
	  try {
	    HtmlfileReceiver.htmlfileEnabled = !!new global[axo]('htmlfile');
	  } catch (x) {
	    // intentionally empty
	  }
	}

	HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;

	module.exports = HtmlfileReceiver;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36), (function() { return this; }())))

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var inherits = __webpack_require__(48),
	    AjaxBasedTransport = __webpack_require__(53),
	    XhrReceiver = __webpack_require__(57),
	    XHRCorsObject = __webpack_require__(58),
	    XHRLocalObject = __webpack_require__(60);

	function XhrPollingTransport(transUrl) {
	  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
	}

	inherits(XhrPollingTransport, AjaxBasedTransport);

	XhrPollingTransport.enabled = function (info) {
	  if (info.nullOrigin) {
	    return false;
	  }

	  if (XHRLocalObject.enabled && info.sameOrigin) {
	    return true;
	  }
	  return XHRCorsObject.enabled;
	};

	XhrPollingTransport.transportName = 'xhr-polling';
	XhrPollingTransport.roundTrips = 2; // preflight, ajax

	module.exports = XhrPollingTransport;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var inherits = __webpack_require__(48),
	    AjaxBasedTransport = __webpack_require__(53),
	    XdrStreamingTransport = __webpack_require__(62),
	    XhrReceiver = __webpack_require__(57),
	    XDRObject = __webpack_require__(63);

	function XdrPollingTransport(transUrl) {
	  if (!XDRObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
	}

	inherits(XdrPollingTransport, AjaxBasedTransport);

	XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
	XdrPollingTransport.transportName = 'xdr-polling';
	XdrPollingTransport.roundTrips = 2; // preflight, ajax

	module.exports = XdrPollingTransport;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	// The simplest and most robust transport, using the well-know cross
	// domain hack - JSONP. This transport is quite inefficient - one
	// message could use up to one http request. But at least it works almost
	// everywhere.
	// Known limitations:
	//   o you will get a spinning cursor
	//   o for Konqueror a dumb timer is needed to detect errors

	var inherits = __webpack_require__(48),
	    SenderReceiver = __webpack_require__(54),
	    JsonpReceiver = __webpack_require__(79),
	    jsonpSender = __webpack_require__(80);

	function JsonPTransport(transUrl) {
	  if (!JsonPTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }
	  SenderReceiver.call(this, transUrl, '/jsonp', jsonpSender, JsonpReceiver);
	}

	inherits(JsonPTransport, SenderReceiver);

	JsonPTransport.enabled = function () {
	  return !!global.document;
	};

	JsonPTransport.transportName = 'jsonp-polling';
	JsonPTransport.roundTrips = 1;
	JsonPTransport.needBody = true;

	module.exports = JsonPTransport;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';

	var utils = __webpack_require__(72),
	    random = __webpack_require__(38),
	    browser = __webpack_require__(61),
	    urlUtils = __webpack_require__(40),
	    inherits = __webpack_require__(48),
	    EventEmitter = __webpack_require__(49).EventEmitter;

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:receiver:jsonp');
	}

	function JsonpReceiver(url) {
	  debug(url);
	  var self = this;
	  EventEmitter.call(this);

	  utils.polluteGlobalNamespace();

	  this.id = 'a' + random.string(6);
	  var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));

	  global[utils.WPrefix][this.id] = this._callback.bind(this);
	  this._createScript(urlWithId);

	  // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
	  this.timeoutId = setTimeout(function () {
	    debug('timeout');
	    self._abort(new Error('JSONP script loaded abnormally (timeout)'));
	  }, JsonpReceiver.timeout);
	}

	inherits(JsonpReceiver, EventEmitter);

	JsonpReceiver.prototype.abort = function () {
	  debug('abort');
	  if (global[utils.WPrefix][this.id]) {
	    var err = new Error('JSONP user aborted read');
	    err.code = 1000;
	    this._abort(err);
	  }
	};

	JsonpReceiver.timeout = 35000;
	JsonpReceiver.scriptErrorTimeout = 1000;

	JsonpReceiver.prototype._callback = function (data) {
	  debug('_callback', data);
	  this._cleanup();

	  if (this.aborting) {
	    return;
	  }

	  if (data) {
	    debug('message', data);
	    this.emit('message', data);
	  }
	  this.emit('close', null, 'network');
	  this.removeAllListeners();
	};

	JsonpReceiver.prototype._abort = function (err) {
	  debug('_abort', err);
	  this._cleanup();
	  this.aborting = true;
	  this.emit('close', err.code, err.message);
	  this.removeAllListeners();
	};

	JsonpReceiver.prototype._cleanup = function () {
	  debug('_cleanup');
	  clearTimeout(this.timeoutId);
	  if (this.script2) {
	    this.script2.parentNode.removeChild(this.script2);
	    this.script2 = null;
	  }
	  if (this.script) {
	    var script = this.script;
	    // Unfortunately, you can't really abort script loading of
	    // the script.
	    script.parentNode.removeChild(script);
	    script.onreadystatechange = script.onerror = script.onload = script.onclick = null;
	    this.script = null;
	  }
	  delete global[utils.WPrefix][this.id];
	};

	JsonpReceiver.prototype._scriptError = function () {
	  debug('_scriptError');
	  var self = this;
	  if (this.errorTimer) {
	    return;
	  }

	  this.errorTimer = setTimeout(function () {
	    if (!self.loadedOkay) {
	      self._abort(new Error('JSONP script loaded abnormally (onerror)'));
	    }
	  }, JsonpReceiver.scriptErrorTimeout);
	};

	JsonpReceiver.prototype._createScript = function (url) {
	  debug('_createScript', url);
	  var self = this;
	  var script = this.script = global.document.createElement('script');
	  var script2; // Opera synchronous load trick.

	  script.id = 'a' + random.string(8);
	  script.src = url;
	  script.type = 'text/javascript';
	  script.charset = 'UTF-8';
	  script.onerror = this._scriptError.bind(this);
	  script.onload = function () {
	    debug('onload');
	    self._abort(new Error('JSONP script loaded abnormally (onload)'));
	  };

	  // IE9 fires 'error' event after onreadystatechange or before, in random order.
	  // Use loadedOkay to determine if actually errored
	  script.onreadystatechange = function () {
	    debug('onreadystatechange', script.readyState);
	    if (/loaded|closed/.test(script.readyState)) {
	      if (script && script.htmlFor && script.onclick) {
	        self.loadedOkay = true;
	        try {
	          // In IE, actually execute the script.
	          script.onclick();
	        } catch (x) {
	          // intentionally empty
	        }
	      }
	      if (script) {
	        self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
	      }
	    }
	  };
	  // IE: event/htmlFor/onclick trick.
	  // One can't rely on proper order for onreadystatechange. In order to
	  // make sure, set a 'htmlFor' and 'event' properties, so that
	  // script code will be installed as 'onclick' handler for the
	  // script object. Later, onreadystatechange, manually execute this
	  // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
	  // set. For reference see:
	  //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
	  // Also, read on that about script ordering:
	  //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
	  if (typeof script.async === 'undefined' && global.document.attachEvent) {
	    // According to mozilla docs, in recent browsers script.async defaults
	    // to 'true', so we may use it to detect a good browser:
	    // https://developer.mozilla.org/en/HTML/Element/script
	    if (!browser.isOpera()) {
	      // Naively assume we're in IE
	      try {
	        script.htmlFor = script.id;
	        script.event = 'onclick';
	      } catch (x) {
	        // intentionally empty
	      }
	      script.async = true;
	    } else {
	      // Opera, second sync script hack
	      script2 = this.script2 = global.document.createElement('script');
	      script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
	      script.async = script2.async = false;
	    }
	  }
	  if (typeof script.async !== 'undefined') {
	    script.async = true;
	  }

	  var head = global.document.getElementsByTagName('head')[0];
	  head.insertBefore(script, head.firstChild);
	  if (script2) {
	    head.insertBefore(script2, head.firstChild);
	  }
	};

	module.exports = JsonpReceiver;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36), (function() { return this; }())))

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';

	var random = __webpack_require__(38),
	    urlUtils = __webpack_require__(40);

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:sender:jsonp');
	}

	var form, area;

	function createIframe(id) {
	  debug('createIframe', id);
	  try {
	    // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
	    return global.document.createElement('<iframe name="' + id + '">');
	  } catch (x) {
	    var iframe = global.document.createElement('iframe');
	    iframe.name = id;
	    return iframe;
	  }
	}

	function createForm() {
	  debug('createForm');
	  form = global.document.createElement('form');
	  form.style.display = 'none';
	  form.style.position = 'absolute';
	  form.method = 'POST';
	  form.enctype = 'application/x-www-form-urlencoded';
	  form.acceptCharset = 'UTF-8';

	  area = global.document.createElement('textarea');
	  area.name = 'd';
	  form.appendChild(area);

	  global.document.body.appendChild(form);
	}

	module.exports = function (url, payload, callback) {
	  debug(url, payload);
	  if (!form) {
	    createForm();
	  }
	  var id = 'a' + random.string(8);
	  form.target = id;
	  form.action = urlUtils.addQuery(urlUtils.addPath(url, '/jsonp_send'), 'i=' + id);

	  var iframe = createIframe(id);
	  iframe.id = id;
	  iframe.style.display = 'none';
	  form.appendChild(iframe);

	  try {
	    area.value = payload;
	  } catch (e) {
	    // seriously broken browsers get here
	  }
	  form.submit();

	  var completed = function completed(err) {
	    debug('completed', id, err);
	    if (!iframe.onerror) {
	      return;
	    }
	    iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
	    // Opera mini doesn't like if we GC iframe
	    // immediately, thus this timeout.
	    setTimeout(function () {
	      debug('cleaning up', id);
	      iframe.parentNode.removeChild(iframe);
	      iframe = null;
	    }, 500);
	    area.value = '';
	    // It is not possible to detect if the iframe succeeded or
	    // failed to submit our form.
	    callback(err);
	  };
	  iframe.onerror = function () {
	    debug('onerror', id);
	    completed();
	  };
	  iframe.onload = function () {
	    debug('onload', id);
	    completed();
	  };
	  iframe.onreadystatechange = function (e) {
	    debug('onreadystatechange', id, iframe.readyState, e);
	    if (iframe.readyState === 'complete') {
	      completed();
	    }
	  };
	  return function () {
	    debug('aborted', id);
	    completed(new Error('Aborted'));
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36), (function() { return this; }())))

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';

	__webpack_require__(82);

	var URL = __webpack_require__(41),
	    inherits = __webpack_require__(48),
	    JSON3 = __webpack_require__(69),
	    random = __webpack_require__(38),
	    escape = __webpack_require__(83),
	    urlUtils = __webpack_require__(40),
	    eventUtils = __webpack_require__(37),
	    transport = __webpack_require__(84),
	    objectUtils = __webpack_require__(73),
	    browser = __webpack_require__(61),
	    log = __webpack_require__(85),
	    Event = __webpack_require__(86),
	    EventTarget = __webpack_require__(50),
	    loc = __webpack_require__(87),
	    CloseEvent = __webpack_require__(88),
	    TransportMessageEvent = __webpack_require__(89),
	    InfoReceiver = __webpack_require__(90);

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:main');
	}

	var transports;

	// follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
	function SockJS(url, protocols, options) {
	  if (!(this instanceof SockJS)) {
	    return new SockJS(url, protocols, options);
	  }
	  if (arguments.length < 1) {
	    throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
	  }
	  EventTarget.call(this);

	  this.readyState = SockJS.CONNECTING;
	  this.extensions = '';
	  this.protocol = '';

	  // non-standard extension
	  options = options || {};
	  if (options.protocols_whitelist) {
	    log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
	  }
	  this._transportsWhitelist = options.transports;
	  this._transportOptions = options.transportOptions || {};

	  var sessionId = options.sessionId || 8;
	  if (typeof sessionId === 'function') {
	    this._generateSessionId = sessionId;
	  } else if (typeof sessionId === 'number') {
	    this._generateSessionId = function () {
	      return random.string(sessionId);
	    };
	  } else {
	    throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
	  }

	  this._server = options.server || random.numberString(1000);

	  // Step 1 of WS spec - parse and validate the url. Issue #8
	  var parsedUrl = new URL(url);
	  if (!parsedUrl.host || !parsedUrl.protocol) {
	    throw new SyntaxError("The URL '" + url + "' is invalid");
	  } else if (parsedUrl.hash) {
	    throw new SyntaxError('The URL must not contain a fragment');
	  } else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
	    throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
	  }

	  var secure = parsedUrl.protocol === 'https:';
	  // Step 2 - don't allow secure origin with an insecure protocol
	  if (loc.protocol === 'https' && !secure) {
	    throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
	  }

	  // Step 3 - check port access - no need here
	  // Step 4 - parse protocols argument
	  if (!protocols) {
	    protocols = [];
	  } else if (!Array.isArray(protocols)) {
	    protocols = [protocols];
	  }

	  // Step 5 - check protocols argument
	  var sortedProtocols = protocols.sort();
	  sortedProtocols.forEach(function (proto, i) {
	    if (!proto) {
	      throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
	    }
	    if (i < sortedProtocols.length - 1 && proto === sortedProtocols[i + 1]) {
	      throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
	    }
	  });

	  // Step 6 - convert origin
	  var o = urlUtils.getOrigin(loc.href);
	  this._origin = o ? o.toLowerCase() : null;

	  // remove the trailing slash
	  parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, ''));

	  // store the sanitized url
	  this.url = parsedUrl.href;
	  debug('using url', this.url);

	  // Step 7 - start connection in background
	  // obtain server info
	  // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
	  this._urlInfo = {
	    nullOrigin: !browser.hasDomain(),
	    sameOrigin: urlUtils.isOriginEqual(this.url, loc.href),
	    sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
	  };

	  this._ir = new InfoReceiver(this.url, this._urlInfo);
	  this._ir.once('finish', this._receiveInfo.bind(this));
	}

	inherits(SockJS, EventTarget);

	function userSetCode(code) {
	  return code === 1000 || code >= 3000 && code <= 4999;
	}

	SockJS.prototype.close = function (code, reason) {
	  // Step 1
	  if (code && !userSetCode(code)) {
	    throw new Error('InvalidAccessError: Invalid code');
	  }
	  // Step 2.4 states the max is 123 bytes, but we are just checking length
	  if (reason && reason.length > 123) {
	    throw new SyntaxError('reason argument has an invalid length');
	  }

	  // Step 3.1
	  if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
	    return;
	  }

	  // TODO look at docs to determine how to set this
	  var wasClean = true;
	  this._close(code || 1000, reason || 'Normal closure', wasClean);
	};

	SockJS.prototype.send = function (data) {
	  // #13 - convert anything non-string to string
	  // TODO this currently turns objects into [object Object]
	  if (typeof data !== 'string') {
	    data = '' + data;
	  }
	  if (this.readyState === SockJS.CONNECTING) {
	    throw new Error('InvalidStateError: The connection has not been established yet');
	  }
	  if (this.readyState !== SockJS.OPEN) {
	    return;
	  }
	  this._transport.send(escape.quote(data));
	};

	SockJS.version = __webpack_require__(71);

	SockJS.CONNECTING = 0;
	SockJS.OPEN = 1;
	SockJS.CLOSING = 2;
	SockJS.CLOSED = 3;

	SockJS.prototype._receiveInfo = function (info, rtt) {
	  debug('_receiveInfo', rtt);
	  this._ir = null;
	  if (!info) {
	    this._close(1002, 'Cannot connect to server');
	    return;
	  }

	  // establish a round-trip timeout (RTO) based on the
	  // round-trip time (RTT)
	  this._rto = this.countRTO(rtt);
	  // allow server to override url used for the actual transport
	  this._transUrl = info.base_url ? info.base_url : this.url;
	  info = objectUtils.extend(info, this._urlInfo);
	  debug('info', info);
	  // determine list of desired and supported transports
	  var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
	  this._transports = enabledTransports.main;
	  debug(this._transports.length + ' enabled transports');

	  this._connect();
	};

	SockJS.prototype._connect = function () {
	  for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
	    debug('attempt', Transport.transportName);
	    if (Transport.needBody) {
	      if (!global.document.body || typeof global.document.readyState !== 'undefined' && global.document.readyState !== 'complete' && global.document.readyState !== 'interactive') {
	        debug('waiting for body');
	        this._transports.unshift(Transport);
	        eventUtils.attachEvent('load', this._connect.bind(this));
	        return;
	      }
	    }

	    // calculate timeout based on RTO and round trips. Default to 5s
	    var timeoutMs = this._rto * Transport.roundTrips || 5000;
	    this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
	    debug('using timeout', timeoutMs);

	    var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
	    var options = this._transportOptions[Transport.transportName];
	    debug('transport url', transportUrl);
	    var transportObj = new Transport(transportUrl, this._transUrl, options);
	    transportObj.on('message', this._transportMessage.bind(this));
	    transportObj.once('close', this._transportClose.bind(this));
	    transportObj.transportName = Transport.transportName;
	    this._transport = transportObj;

	    return;
	  }
	  this._close(2000, 'All transports failed', false);
	};

	SockJS.prototype._transportTimeout = function () {
	  debug('_transportTimeout');
	  if (this.readyState === SockJS.CONNECTING) {
	    this._transportClose(2007, 'Transport timed out');
	  }
	};

	SockJS.prototype._transportMessage = function (msg) {
	  debug('_transportMessage', msg);
	  var self = this,
	      type = msg.slice(0, 1),
	      content = msg.slice(1),
	      payload;

	  // first check for messages that don't need a payload
	  switch (type) {
	    case 'o':
	      this._open();
	      return;
	    case 'h':
	      this.dispatchEvent(new Event('heartbeat'));
	      debug('heartbeat', this.transport);
	      return;
	  }

	  if (content) {
	    try {
	      payload = JSON3.parse(content);
	    } catch (e) {
	      debug('bad json', content);
	    }
	  }

	  if (typeof payload === 'undefined') {
	    debug('empty payload', content);
	    return;
	  }

	  switch (type) {
	    case 'a':
	      if (Array.isArray(payload)) {
	        payload.forEach(function (p) {
	          debug('message', self.transport, p);
	          self.dispatchEvent(new TransportMessageEvent(p));
	        });
	      }
	      break;
	    case 'm':
	      debug('message', this.transport, payload);
	      this.dispatchEvent(new TransportMessageEvent(payload));
	      break;
	    case 'c':
	      if (Array.isArray(payload) && payload.length === 2) {
	        this._close(payload[0], payload[1], true);
	      }
	      break;
	  }
	};

	SockJS.prototype._transportClose = function (code, reason) {
	  debug('_transportClose', this.transport, code, reason);
	  if (this._transport) {
	    this._transport.removeAllListeners();
	    this._transport = null;
	    this.transport = null;
	  }

	  if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
	    this._connect();
	    return;
	  }

	  this._close(code, reason);
	};

	SockJS.prototype._open = function () {
	  debug('_open', this._transport.transportName, this.readyState);
	  if (this.readyState === SockJS.CONNECTING) {
	    if (this._transportTimeoutId) {
	      clearTimeout(this._transportTimeoutId);
	      this._transportTimeoutId = null;
	    }
	    this.readyState = SockJS.OPEN;
	    this.transport = this._transport.transportName;
	    this.dispatchEvent(new Event('open'));
	    debug('connected', this.transport);
	  } else {
	    // The server might have been restarted, and lost track of our
	    // connection.
	    this._close(1006, 'Server lost session');
	  }
	};

	SockJS.prototype._close = function (code, reason, wasClean) {
	  debug('_close', this.transport, code, reason, wasClean, this.readyState);
	  var forceFail = false;

	  if (this._ir) {
	    forceFail = true;
	    this._ir.close();
	    this._ir = null;
	  }
	  if (this._transport) {
	    this._transport.close();
	    this._transport = null;
	    this.transport = null;
	  }

	  if (this.readyState === SockJS.CLOSED) {
	    throw new Error('InvalidStateError: SockJS has already been closed');
	  }

	  this.readyState = SockJS.CLOSING;
	  setTimeout(function () {
	    this.readyState = SockJS.CLOSED;

	    if (forceFail) {
	      this.dispatchEvent(new Event('error'));
	    }

	    var e = new CloseEvent('close');
	    e.wasClean = wasClean || false;
	    e.code = code || 1000;
	    e.reason = reason;

	    this.dispatchEvent(e);
	    this.onmessage = this.onclose = this.onerror = null;
	    debug('disconnected');
	  }.bind(this), 0);
	};

	// See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
	// and RFC 2988.
	SockJS.prototype.countRTO = function (rtt) {
	  // In a local environment, when using IE8/9 and the `jsonp-polling`
	  // transport the time needed to establish a connection (the time that pass
	  // from the opening of the transport to the call of `_dispatchOpen`) is
	  // around 200msec (the lower bound used in the article above) and this
	  // causes spurious timeouts. For this reason we calculate a value slightly
	  // larger than that used in the article.
	  if (rtt > 100) {
	    return 4 * rtt; // rto > 400msec
	  }
	  return 300 + rtt; // 300msec < rto <= 400msec
	};

	module.exports = function (availableTransports) {
	  transports = transport(availableTransports);
	  __webpack_require__(95)(SockJS, availableTransports);
	  return SockJS;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36), (function() { return this; }())))

/***/ },
/* 82 */
/***/ function(module, exports) {

	/* eslint-disable */
	/* jscs: disable */
	'use strict';

	// pulled specific shims from https://github.com/es-shims/es5-shim

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var ArrayPrototype = Array.prototype;
	var ObjectPrototype = Object.prototype;
	var FunctionPrototype = Function.prototype;
	var StringPrototype = String.prototype;
	var array_slice = ArrayPrototype.slice;

	var _toString = ObjectPrototype.toString;
	var isFunction = function isFunction(val) {
	    return ObjectPrototype.toString.call(val) === '[object Function]';
	};
	var isArray = function isArray(obj) {
	    return _toString.call(obj) === '[object Array]';
	};
	var isString = function isString(obj) {
	    return _toString.call(obj) === '[object String]';
	};

	var supportsDescriptors = Object.defineProperty && function () {
	    try {
	        Object.defineProperty({}, 'x', {});
	        return true;
	    } catch (e) {
	        /* this is ES3 */
	        return false;
	    }
	}();

	// Define configurable, writable and non-enumerable props
	// if they don't exist.
	var defineProperty;
	if (supportsDescriptors) {
	    defineProperty = function defineProperty(object, name, method, forceAssign) {
	        if (!forceAssign && name in object) {
	            return;
	        }
	        Object.defineProperty(object, name, {
	            configurable: true,
	            enumerable: false,
	            writable: true,
	            value: method
	        });
	    };
	} else {
	    defineProperty = function defineProperty(object, name, method, forceAssign) {
	        if (!forceAssign && name in object) {
	            return;
	        }
	        object[name] = method;
	    };
	}
	var defineProperties = function defineProperties(object, map, forceAssign) {
	    for (var name in map) {
	        if (ObjectPrototype.hasOwnProperty.call(map, name)) {
	            defineProperty(object, name, map[name], forceAssign);
	        }
	    }
	};

	var toObject = function toObject(o) {
	    if (o == null) {
	        // this matches both null and undefined
	        throw new TypeError("can't convert " + o + ' to object');
	    }
	    return Object(o);
	};

	//
	// Util
	// ======
	//

	// ES5 9.4
	// http://es5.github.com/#x9.4
	// http://jsperf.com/to-integer

	function toInteger(num) {
	    var n = +num;
	    if (n !== n) {
	        // isNaN
	        n = 0;
	    } else if (n !== 0 && n !== 1 / 0 && n !== -(1 / 0)) {
	        n = (n > 0 || -1) * Math.floor(Math.abs(n));
	    }
	    return n;
	}

	function ToUint32(x) {
	    return x >>> 0;
	}

	//
	// Function
	// ========
	//

	// ES-5 15.3.4.5
	// http://es5.github.com/#x15.3.4.5

	function Empty() {}

	defineProperties(FunctionPrototype, {
	    bind: function bind(that) {
	        // .length is 1
	        // 1. Let Target be the this value.
	        var target = this;
	        // 2. If IsCallable(Target) is false, throw a TypeError exception.
	        if (!isFunction(target)) {
	            throw new TypeError('Function.prototype.bind called on incompatible ' + target);
	        }
	        // 3. Let A be a new (possibly empty) internal list of all of the
	        //   argument values provided after thisArg (arg1, arg2 etc), in order.
	        // XXX slicedArgs will stand in for "A" if used
	        var args = array_slice.call(arguments, 1); // for normal call
	        // 4. Let F be a new native ECMAScript object.
	        // 11. Set the [[Prototype]] internal property of F to the standard
	        //   built-in Function prototype object as specified in 15.3.3.1.
	        // 12. Set the [[Call]] internal property of F as described in
	        //   15.3.4.5.1.
	        // 13. Set the [[Construct]] internal property of F as described in
	        //   15.3.4.5.2.
	        // 14. Set the [[HasInstance]] internal property of F as described in
	        //   15.3.4.5.3.
	        var binder = function binder() {

	            if (this instanceof bound) {
	                // 15.3.4.5.2 [[Construct]]
	                // When the [[Construct]] internal method of a function object,
	                // F that was created using the bind function is called with a
	                // list of arguments ExtraArgs, the following steps are taken:
	                // 1. Let target be the value of F's [[TargetFunction]]
	                //   internal property.
	                // 2. If target has no [[Construct]] internal method, a
	                //   TypeError exception is thrown.
	                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
	                //   property.
	                // 4. Let args be a new list containing the same values as the
	                //   list boundArgs in the same order followed by the same
	                //   values as the list ExtraArgs in the same order.
	                // 5. Return the result of calling the [[Construct]] internal
	                //   method of target providing args as the arguments.

	                var result = target.apply(this, args.concat(array_slice.call(arguments)));
	                if (Object(result) === result) {
	                    return result;
	                }
	                return this;
	            } else {
	                // 15.3.4.5.1 [[Call]]
	                // When the [[Call]] internal method of a function object, F,
	                // which was created using the bind function is called with a
	                // this value and a list of arguments ExtraArgs, the following
	                // steps are taken:
	                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
	                //   property.
	                // 2. Let boundThis be the value of F's [[BoundThis]] internal
	                //   property.
	                // 3. Let target be the value of F's [[TargetFunction]] internal
	                //   property.
	                // 4. Let args be a new list containing the same values as the
	                //   list boundArgs in the same order followed by the same
	                //   values as the list ExtraArgs in the same order.
	                // 5. Return the result of calling the [[Call]] internal method
	                //   of target providing boundThis as the this value and
	                //   providing args as the arguments.

	                // equiv: target.call(this, ...boundArgs, ...args)
	                return target.apply(that, args.concat(array_slice.call(arguments)));
	            }
	        };

	        // 15. If the [[Class]] internal property of Target is "Function", then
	        //     a. Let L be the length property of Target minus the length of A.
	        //     b. Set the length own property of F to either 0 or L, whichever is
	        //       larger.
	        // 16. Else set the length own property of F to 0.

	        var boundLength = Math.max(0, target.length - args.length);

	        // 17. Set the attributes of the length own property of F to the values
	        //   specified in 15.3.5.1.
	        var boundArgs = [];
	        for (var i = 0; i < boundLength; i++) {
	            boundArgs.push('$' + i);
	        }

	        // XXX Build a dynamic function with desired amount of arguments is the only
	        // way to set the length property of a function.
	        // In environments where Content Security Policies enabled (Chrome extensions,
	        // for ex.) all use of eval or Function costructor throws an exception.
	        // However in all of these environments Function.prototype.bind exists
	        // and so this code will never be executed.
	        var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

	        if (target.prototype) {
	            Empty.prototype = target.prototype;
	            bound.prototype = new Empty();
	            // Clean up dangling references.
	            Empty.prototype = null;
	        }

	        // TODO
	        // 18. Set the [[Extensible]] internal property of F to true.

	        // TODO
	        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
	        // 20. Call the [[DefineOwnProperty]] internal method of F with
	        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
	        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
	        //   false.
	        // 21. Call the [[DefineOwnProperty]] internal method of F with
	        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
	        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
	        //   and false.

	        // TODO
	        // NOTE Function objects created using Function.prototype.bind do not
	        // have a prototype property or the [[Code]], [[FormalParameters]], and
	        // [[Scope]] internal properties.
	        // XXX can't delete prototype in pure-js.

	        // 22. Return F.
	        return bound;
	    }
	});

	//
	// Array
	// =====
	//

	// ES5 15.4.3.2
	// http://es5.github.com/#x15.4.3.2
	// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
	defineProperties(Array, { isArray: isArray });

	var boxedString = Object('a');
	var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

	var properlyBoxesContext = function properlyBoxed(method) {
	    // Check node 0.6.21 bug where third parameter is not boxed
	    var properlyBoxesNonStrict = true;
	    var properlyBoxesStrict = true;
	    if (method) {
	        method.call('foo', function (_, __, context) {
	            if ((typeof context === 'undefined' ? 'undefined' : _typeof(context)) !== 'object') {
	                properlyBoxesNonStrict = false;
	            }
	        });

	        method.call([1], function () {
	            'use strict';

	            properlyBoxesStrict = typeof this === 'string';
	        }, 'x');
	    }
	    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
	};

	defineProperties(ArrayPrototype, {
	    forEach: function forEach(fun /*, thisp*/) {
	        var object = toObject(this),
	            self = splitString && isString(this) ? this.split('') : object,
	            thisp = arguments[1],
	            i = -1,
	            length = self.length >>> 0;

	        // If no callback function or if callback is not a callable function
	        if (!isFunction(fun)) {
	            throw new TypeError(); // TODO message
	        }

	        while (++i < length) {
	            if (i in self) {
	                // Invoke the callback function with call, passing arguments:
	                // context, property value, property key, thisArg object
	                // context
	                fun.call(thisp, self[i], i, object);
	            }
	        }
	    }
	}, !properlyBoxesContext(ArrayPrototype.forEach));

	// ES5 15.4.4.14
	// http://es5.github.com/#x15.4.4.14
	// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
	var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
	defineProperties(ArrayPrototype, {
	    indexOf: function indexOf(sought /*, fromIndex */) {
	        var self = splitString && isString(this) ? this.split('') : toObject(this),
	            length = self.length >>> 0;

	        if (!length) {
	            return -1;
	        }

	        var i = 0;
	        if (arguments.length > 1) {
	            i = toInteger(arguments[1]);
	        }

	        // handle negative indices
	        i = i >= 0 ? i : Math.max(0, length + i);
	        for (; i < length; i++) {
	            if (i in self && self[i] === sought) {
	                return i;
	            }
	        }
	        return -1;
	    }
	}, hasFirefox2IndexOfBug);

	//
	// String
	// ======
	//

	// ES5 15.5.4.14
	// http://es5.github.com/#x15.5.4.14

	// [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
	// Many browsers do not split properly with regular expressions or they
	// do not perform the split correctly under obscure conditions.
	// See http://blog.stevenlevithan.com/archives/cross-browser-split
	// I've tested in many browsers and this seems to cover the deviant ones:
	//    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
	//    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
	//    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
	//       [undefined, "t", undefined, "e", ...]
	//    ''.split(/.?/) should be [], not [""]
	//    '.'.split(/()()/) should be ["."], not ["", "", "."]

	var string_split = StringPrototype.split;
	if ('ab'.split(/(?:ab)*/).length !== 2 || '.'.split(/(.?)(.?)/).length !== 4 || 'tesst'.split(/(s)*/)[1] === 't' || 'test'.split(/(?:)/, -1).length !== 4 || ''.split(/.?/).length || '.'.split(/()()/).length > 1) {
	    (function () {
	        var compliantExecNpcg = /()??/.exec('')[1] === void 0; // NPCG: nonparticipating capturing group

	        StringPrototype.split = function (separator, limit) {
	            var string = this;
	            if (separator === void 0 && limit === 0) {
	                return [];
	            }

	            // If `separator` is not a regex, use native split
	            if (_toString.call(separator) !== '[object RegExp]') {
	                return string_split.call(this, separator, limit);
	            }

	            var output = [],
	                flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.extended ? 'x' : '') + ( // Proposed for ES6
	            separator.sticky ? 'y' : ''),
	                // Firefox 3+
	            lastLastIndex = 0,

	            // Make `global` and avoid `lastIndex` issues by working with a copy
	            separator2,
	                match,
	                lastIndex,
	                lastLength;
	            separator = new RegExp(separator.source, flags + 'g');
	            string += ''; // Type-convert
	            if (!compliantExecNpcg) {
	                // Doesn't need flags gy, but they don't hurt
	                separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
	            }
	            /* Values for `limit`, per the spec:
	             * If undefined: 4294967295 // Math.pow(2, 32) - 1
	             * If 0, Infinity, or NaN: 0
	             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	             * If other: Type-convert, then use the above rules
	             */
	            limit = limit === void 0 ? -1 >>> 0 : // Math.pow(2, 32) - 1
	            ToUint32(limit);
	            while (match = separator.exec(string)) {
	                // `separator.lastIndex` is not reliable cross-browser
	                lastIndex = match.index + match[0].length;
	                if (lastIndex > lastLastIndex) {
	                    output.push(string.slice(lastLastIndex, match.index));
	                    // Fix browsers whose `exec` methods don't consistently return `undefined` for
	                    // nonparticipating capturing groups
	                    if (!compliantExecNpcg && match.length > 1) {
	                        match[0].replace(separator2, function () {
	                            for (var i = 1; i < arguments.length - 2; i++) {
	                                if (arguments[i] === void 0) {
	                                    match[i] = void 0;
	                                }
	                            }
	                        });
	                    }
	                    if (match.length > 1 && match.index < string.length) {
	                        ArrayPrototype.push.apply(output, match.slice(1));
	                    }
	                    lastLength = match[0].length;
	                    lastLastIndex = lastIndex;
	                    if (output.length >= limit) {
	                        break;
	                    }
	                }
	                if (separator.lastIndex === match.index) {
	                    separator.lastIndex++; // Avoid an infinite loop
	                }
	            }
	            if (lastLastIndex === string.length) {
	                if (lastLength || !separator.test('')) {
	                    output.push('');
	                }
	            } else {
	                output.push(string.slice(lastLastIndex));
	            }
	            return output.length > limit ? output.slice(0, limit) : output;
	        };
	    })();

	    // [bugfix, chrome]
	    // If separator is undefined, then the result array contains just one String,
	    // which is the this value (converted to a String). If limit is not undefined,
	    // then the output array is truncated so that it contains no more than limit
	    // elements.
	    // "0".split(undefined, 0) -> []
	} else if ('0'.split(void 0, 0).length) {
	        StringPrototype.split = function split(separator, limit) {
	            if (separator === void 0 && limit === 0) {
	                return [];
	            }
	            return string_split.call(this, separator, limit);
	        };
	    }

	// ES5 15.5.4.20
	// whitespace from: http://es5.github.io/#x15.5.4.20
	var ws = '\t\n\u000b\f\r   ᠎    ' + '         　\u2028' + '\u2029﻿';
	var zeroWidth = '​';
	var wsRegexChars = '[' + ws + ']';
	var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');
	var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');
	var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());
	defineProperties(StringPrototype, {
	    // http://blog.stevenlevithan.com/archives/faster-trim-javascript
	    // http://perfectionkills.com/whitespace-deviations/
	    trim: function trim() {
	        if (this === void 0 || this === null) {
	            throw new TypeError("can't convert " + this + ' to object');
	        }
	        return String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
	    }
	}, hasTrimWhitespaceBug);

	// ECMA-262, 3rd B.2.3
	// Not an ECMAScript standard, although ECMAScript 3rd Edition has a
	// non-normative section suggesting uniform semantics and it should be
	// normalized across all browsers
	// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
	var string_substr = StringPrototype.substr;
	var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
	defineProperties(StringPrototype, {
	    substr: function substr(start, length) {
	        return string_substr.call(this, start < 0 ? (start = this.length + start) < 0 ? 0 : start : start, length);
	    }
	}, hasNegativeSubstrBug);

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var JSON3 = __webpack_require__(69);

	// Some extra characters that Chrome gets wrong, and substitutes with
	// something else on the wire.
	var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g,
	    extraLookup;

	// This may be quite slow, so let's delay until user actually uses bad
	// characters.
	var unrollLookup = function unrollLookup(escapable) {
	  var i;
	  var unrolled = {};
	  var c = [];
	  for (i = 0; i < 65536; i++) {
	    c.push(String.fromCharCode(i));
	  }
	  escapable.lastIndex = 0;
	  c.join('').replace(escapable, function (a) {
	    unrolled[a] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	    return '';
	  });
	  escapable.lastIndex = 0;
	  return unrolled;
	};

	// Quote string, also taking care of unicode characters that browsers
	// often break. Especially, take care of unicode surrogates:
	// http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
	module.exports = {
	  quote: function quote(string) {
	    var quoted = JSON3.stringify(string);

	    // In most cases this should be very fast and good enough.
	    extraEscapable.lastIndex = 0;
	    if (!extraEscapable.test(quoted)) {
	      return quoted;
	    }

	    if (!extraLookup) {
	      extraLookup = unrollLookup(extraEscapable);
	    }

	    return quoted.replace(extraEscapable, function (a) {
	      return extraLookup[a];
	    });
	  }
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:utils:transport');
	}

	module.exports = function (availableTransports) {
	  return {
	    filterToEnabled: function filterToEnabled(transportsWhitelist, info) {
	      var transports = {
	        main: [],
	        facade: []
	      };
	      if (!transportsWhitelist) {
	        transportsWhitelist = [];
	      } else if (typeof transportsWhitelist === 'string') {
	        transportsWhitelist = [transportsWhitelist];
	      }

	      availableTransports.forEach(function (trans) {
	        if (!trans) {
	          return;
	        }

	        if (trans.transportName === 'websocket' && info.websocket === false) {
	          debug('disabled from server', 'websocket');
	          return;
	        }

	        if (transportsWhitelist.length && transportsWhitelist.indexOf(trans.transportName) === -1) {
	          debug('not in whitelist', trans.transportName);
	          return;
	        }

	        if (trans.enabled(info)) {
	          debug('enabled', trans.transportName);
	          transports.main.push(trans);
	          if (trans.facadeTransport) {
	            transports.facade.push(trans.facadeTransport);
	          }
	        } else {
	          debug('disabled', trans.transportName);
	        }
	      });
	      return transports;
	    }
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)))

/***/ },
/* 85 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var logObject = {};
	['log', 'debug', 'warn'].forEach(function (level) {
	  var levelExists;

	  try {
	    levelExists = global.console && global.console[level] && global.console[level].apply;
	  } catch (e) {
	    // do nothing
	  }

	  logObject[level] = levelExists ? function () {
	    return global.console[level].apply(global.console, arguments);
	  } : level === 'log' ? function () {} : logObject.log;
	});

	module.exports = logObject;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 86 */
/***/ function(module, exports) {

	'use strict';

	function Event(eventType) {
	  this.type = eventType;
	}

	Event.prototype.initEvent = function (eventType, canBubble, cancelable) {
	  this.type = eventType;
	  this.bubbles = canBubble;
	  this.cancelable = cancelable;
	  this.timeStamp = +new Date();
	  return this;
	};

	Event.prototype.stopPropagation = function () {};
	Event.prototype.preventDefault = function () {};

	Event.CAPTURING_PHASE = 1;
	Event.AT_TARGET = 2;
	Event.BUBBLING_PHASE = 3;

	module.exports = Event;

/***/ },
/* 87 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	module.exports = global.location || {
	  origin: 'http://localhost:80',
	  protocol: 'http',
	  host: 'localhost',
	  port: 80,
	  href: 'http://localhost/',
	  hash: ''
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var inherits = __webpack_require__(48),
	    Event = __webpack_require__(86);

	function CloseEvent() {
	  Event.call(this);
	  this.initEvent('close', false, false);
	  this.wasClean = false;
	  this.code = 0;
	  this.reason = '';
	}

	inherits(CloseEvent, Event);

	module.exports = CloseEvent;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var inherits = __webpack_require__(48),
	    Event = __webpack_require__(86);

	function TransportMessageEvent(data) {
	  Event.call(this);
	  this.initEvent('message', false, false);
	  this.data = data;
	}

	inherits(TransportMessageEvent, Event);

	module.exports = TransportMessageEvent;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var EventEmitter = __webpack_require__(49).EventEmitter,
	    inherits = __webpack_require__(48),
	    urlUtils = __webpack_require__(40),
	    XDR = __webpack_require__(63),
	    XHRCors = __webpack_require__(58),
	    XHRLocal = __webpack_require__(60),
	    XHRFake = __webpack_require__(91),
	    InfoIframe = __webpack_require__(92),
	    InfoAjax = __webpack_require__(94);

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:info-receiver');
	}

	function InfoReceiver(baseUrl, urlInfo) {
	  debug(baseUrl);
	  var self = this;
	  EventEmitter.call(this);

	  setTimeout(function () {
	    self.doXhr(baseUrl, urlInfo);
	  }, 0);
	}

	inherits(InfoReceiver, EventEmitter);

	// TODO this is currently ignoring the list of available transports and the whitelist

	InfoReceiver._getReceiver = function (baseUrl, url, urlInfo) {
	  // determine method of CORS support (if needed)
	  if (urlInfo.sameOrigin) {
	    return new InfoAjax(url, XHRLocal);
	  }
	  if (XHRCors.enabled) {
	    return new InfoAjax(url, XHRCors);
	  }
	  if (XDR.enabled && urlInfo.sameScheme) {
	    return new InfoAjax(url, XDR);
	  }
	  if (InfoIframe.enabled()) {
	    return new InfoIframe(baseUrl, url);
	  }
	  return new InfoAjax(url, XHRFake);
	};

	InfoReceiver.prototype.doXhr = function (baseUrl, urlInfo) {
	  var self = this,
	      url = urlUtils.addPath(baseUrl, '/info');
	  debug('doXhr', url);

	  this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);

	  this.timeoutRef = setTimeout(function () {
	    debug('timeout');
	    self._cleanup(false);
	    self.emit('finish');
	  }, InfoReceiver.timeout);

	  this.xo.once('finish', function (info, rtt) {
	    debug('finish', info, rtt);
	    self._cleanup(true);
	    self.emit('finish', info, rtt);
	  });
	};

	InfoReceiver.prototype._cleanup = function (wasClean) {
	  debug('_cleanup');
	  clearTimeout(this.timeoutRef);
	  this.timeoutRef = null;
	  if (!wasClean && this.xo) {
	    this.xo.close();
	  }
	  this.xo = null;
	};

	InfoReceiver.prototype.close = function () {
	  debug('close');
	  this.removeAllListeners();
	  this._cleanup(false);
	};

	InfoReceiver.timeout = 8000;

	module.exports = InfoReceiver;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)))

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var EventEmitter = __webpack_require__(49).EventEmitter,
	    inherits = __webpack_require__(48);

	function XHRFake() /* method, url, payload, opts */{
	  var self = this;
	  EventEmitter.call(this);

	  this.to = setTimeout(function () {
	    self.emit('finish', 200, '{}');
	  }, XHRFake.timeout);
	}

	inherits(XHRFake, EventEmitter);

	XHRFake.prototype.close = function () {
	  clearTimeout(this.to);
	};

	XHRFake.timeout = 2000;

	module.exports = XHRFake;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';

	var EventEmitter = __webpack_require__(49).EventEmitter,
	    inherits = __webpack_require__(48),
	    JSON3 = __webpack_require__(69),
	    utils = __webpack_require__(37),
	    IframeTransport = __webpack_require__(68),
	    InfoReceiverIframe = __webpack_require__(93);

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:info-iframe');
	}

	function InfoIframe(baseUrl, url) {
	  var self = this;
	  EventEmitter.call(this);

	  var go = function go() {
	    var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);

	    ifr.once('message', function (msg) {
	      if (msg) {
	        var d;
	        try {
	          d = JSON3.parse(msg);
	        } catch (e) {
	          debug('bad json', msg);
	          self.emit('finish');
	          self.close();
	          return;
	        }

	        var info = d[0],
	            rtt = d[1];
	        self.emit('finish', info, rtt);
	      }
	      self.close();
	    });

	    ifr.once('close', function () {
	      self.emit('finish');
	      self.close();
	    });
	  };

	  // TODO this seems the same as the 'needBody' from transports
	  if (!global.document.body) {
	    utils.attachEvent('load', go);
	  } else {
	    go();
	  }
	}

	inherits(InfoIframe, EventEmitter);

	InfoIframe.enabled = function () {
	  return IframeTransport.enabled();
	};

	InfoIframe.prototype.close = function () {
	  if (this.ifr) {
	    this.ifr.close();
	  }
	  this.removeAllListeners();
	  this.ifr = null;
	};

	module.exports = InfoIframe;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36), (function() { return this; }())))

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var inherits = __webpack_require__(48),
	    EventEmitter = __webpack_require__(49).EventEmitter,
	    JSON3 = __webpack_require__(69),
	    XHRLocalObject = __webpack_require__(60),
	    InfoAjax = __webpack_require__(94);

	function InfoReceiverIframe(transUrl) {
	  var self = this;
	  EventEmitter.call(this);

	  this.ir = new InfoAjax(transUrl, XHRLocalObject);
	  this.ir.once('finish', function (info, rtt) {
	    self.ir = null;
	    self.emit('message', JSON3.stringify([info, rtt]));
	  });
	}

	inherits(InfoReceiverIframe, EventEmitter);

	InfoReceiverIframe.transportName = 'iframe-info-receiver';

	InfoReceiverIframe.prototype.close = function () {
	  if (this.ir) {
	    this.ir.close();
	    this.ir = null;
	  }
	  this.removeAllListeners();
	};

	module.exports = InfoReceiverIframe;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var EventEmitter = __webpack_require__(49).EventEmitter,
	    inherits = __webpack_require__(48),
	    JSON3 = __webpack_require__(69),
	    objectUtils = __webpack_require__(73);

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:info-ajax');
	}

	function InfoAjax(url, AjaxObject) {
	  EventEmitter.call(this);

	  var self = this;
	  var t0 = +new Date();
	  this.xo = new AjaxObject('GET', url);

	  this.xo.once('finish', function (status, text) {
	    var info, rtt;
	    if (status === 200) {
	      rtt = +new Date() - t0;
	      if (text) {
	        try {
	          info = JSON3.parse(text);
	        } catch (e) {
	          debug('bad json', text);
	        }
	      }

	      if (!objectUtils.isObject(info)) {
	        info = {};
	      }
	    }
	    self.emit('finish', info, rtt);
	    self.removeAllListeners();
	  });
	}

	inherits(InfoAjax, EventEmitter);

	InfoAjax.prototype.close = function () {
	  this.removeAllListeners();
	  this.xo.close();
	};

	module.exports = InfoAjax;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)))

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var urlUtils = __webpack_require__(40),
	    eventUtils = __webpack_require__(37),
	    JSON3 = __webpack_require__(69),
	    FacadeJS = __webpack_require__(96),
	    InfoIframeReceiver = __webpack_require__(93),
	    iframeUtils = __webpack_require__(72),
	    loc = __webpack_require__(87);

	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(45)('sockjs-client:iframe-bootstrap');
	}

	module.exports = function (SockJS, availableTransports) {
	  var transportMap = {};
	  availableTransports.forEach(function (at) {
	    if (at.facadeTransport) {
	      transportMap[at.facadeTransport.transportName] = at.facadeTransport;
	    }
	  });

	  // hard-coded for the info iframe
	  // TODO see if we can make this more dynamic
	  transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
	  var parentOrigin;

	  /* eslint-disable camelcase */
	  SockJS.bootstrap_iframe = function () {
	    /* eslint-enable camelcase */
	    var facade;
	    iframeUtils.currentWindowId = loc.hash.slice(1);
	    var onMessage = function onMessage(e) {
	      if (e.source !== parent) {
	        return;
	      }
	      if (typeof parentOrigin === 'undefined') {
	        parentOrigin = e.origin;
	      }
	      if (e.origin !== parentOrigin) {
	        return;
	      }

	      var iframeMessage;
	      try {
	        iframeMessage = JSON3.parse(e.data);
	      } catch (ignored) {
	        debug('bad json', e.data);
	        return;
	      }

	      if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
	        return;
	      }
	      switch (iframeMessage.type) {
	        case 's':
	          var p;
	          try {
	            p = JSON3.parse(iframeMessage.data);
	          } catch (ignored) {
	            debug('bad json', iframeMessage.data);
	            break;
	          }
	          var version = p[0];
	          var transport = p[1];
	          var transUrl = p[2];
	          var baseUrl = p[3];
	          debug(version, transport, transUrl, baseUrl);
	          // change this to semver logic
	          if (version !== SockJS.version) {
	            throw new Error('Incompatible SockJS! Main site uses:' + ' "' + version + '", the iframe:' + ' "' + SockJS.version + '".');
	          }

	          if (!urlUtils.isOriginEqual(transUrl, loc.href) || !urlUtils.isOriginEqual(baseUrl, loc.href)) {
	            throw new Error('Can\'t connect to different domain from within an ' + 'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
	          }
	          facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
	          break;
	        case 'm':
	          facade._send(iframeMessage.data);
	          break;
	        case 'c':
	          if (facade) {
	            facade._close();
	          }
	          facade = null;
	          break;
	      }
	    };

	    eventUtils.attachEvent('message', onMessage);

	    // Start
	    iframeUtils.postMessage('s');
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)))

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var JSON3 = __webpack_require__(69),
	    iframeUtils = __webpack_require__(72);

	function FacadeJS(transport) {
	  this._transport = transport;
	  transport.on('message', this._transportMessage.bind(this));
	  transport.on('close', this._transportClose.bind(this));
	}

	FacadeJS.prototype._transportClose = function (code, reason) {
	  iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
	};
	FacadeJS.prototype._transportMessage = function (frame) {
	  iframeUtils.postMessage('t', frame);
	};
	FacadeJS.prototype._send = function (data) {
	  this._transport.send(data);
	};
	FacadeJS.prototype._close = function () {
	  this._transport.close();
	  this._transport.removeAllListeners();
	};

	module.exports = FacadeJS;

/***/ }
/******/ ])
});
;
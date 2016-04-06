const DEFAULTS = {
	method: 'GET',
	headers: {},
	data: '',
	onSuccess: noop,
	onError: noop
};

export default function createXhr(options) {
	if (arguments.length === 0) throw new TypeError('Expected 1 argument, got 0');
	if (typeof options === 'string') {
		options = {
			url: options
		};
	}
	if (!options.url) throw new TypeError('The \'url\' option is required');

	const settings = Object.assign({}, DEFAULTS, options);
	const request = settings.xhr || new XMLHttpRequest();

	function handleReadystatechange() {
		if (request.readyState !== 4) return;
		if (!isSuccess(request.status)) settings.onError(request);
		else settings.onSuccess(request);
	}

	request.open(settings.method, settings.url, true);
	request.onreadystatechange = handleReadystatechange;

	for(const h in settings.headers) {
		if (settings.headers.hasOwnProperty(h)) {
			const hv = settings.headers[h];
			request.setRequestHeader(h, hv);
		}

	}

	request.send(settings.data);

	return request;
}

function noop() { }

function isSuccess(status) {
	return status >= 200 && status <= 299;
}

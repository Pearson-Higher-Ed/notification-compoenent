import realtime from 'rtd';

export default function(config, cb) {

	return new Promise((resolve, reject) => {
		const rtd = realtime(config.rtdUrl);
		rtd.setToken(config.nfPiToken);
		rtd.on('ready', function(data) {
			rtd.subscribe(config.rtdProductType + '.' + config.nfRecipientId, ['all']);
			resolve(rtd);
		})

		rtd.on('message', function(type, message) {
			cb(message);
		});

	});
}

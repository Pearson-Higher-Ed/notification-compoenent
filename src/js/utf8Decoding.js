// Because dionysus isn't decoding the utf8 codes we need to do this

module.exports = {
	getDecodedString : function(s) {
		const elem = document.createElement('textarea');
		elem.innerHTML = s;
		return elem.value;
	},

	decodeNotificationMessage: function(obj) {
		obj.body = this.getDecodedString(obj.body);
		obj.source = this.getDecodedString(obj.source);
		obj.title = this.getDecodedString(obj.title);
		obj.tourButtonText = this.getDecodedString(obj.tourButtonText);

		return obj;
	}
}

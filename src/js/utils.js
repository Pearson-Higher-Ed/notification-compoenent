module.exports = {
	hasHTMLTags : function(s) {
		const docBody =this.removeScriptTags(s);
		const childNodes = docBody && [].slice.call(docBody.childNodes);
		return this.hasElementNodeType(childNodes);
	},

	hasElementNodeType : function (nodes) {	
		return nodes && nodes.filter((node) => node.nodeType === 1).length;
	},

	removeScriptTags : function (s) {	
		const doc = new DOMParser().parseFromString(s, 'text/html');

		doc && [].slice.call(doc.body.getElementsByTagName('script')).forEach(item => {
			item.remove();
		});
		return doc.body;
	}

}

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
		const scriptTags = doc.body.getElementsByTagName('script')

		doc && scriptTags && [].slice.call(scriptTags).forEach(item => {
			item.remove();
		});
		return doc.body;
	}

}

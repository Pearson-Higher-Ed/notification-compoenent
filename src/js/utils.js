// Because dangerouslySetInnerHTML prop is required only if the string contains HTML tags

module.exports = {
	hasHTMLTags : function(s) {
		const doc = new DOMParser().parseFromString(s, 'text/html');
		const childNodes = doc && [].slice.call(doc.body.childNodes);
		return this.hasElementNodeType(childNodes);
	},

	hasElementNodeType : function (nodes) {	
		return nodes && nodes.filter((node) => node.nodeType === 1).length > 0;
	}

}

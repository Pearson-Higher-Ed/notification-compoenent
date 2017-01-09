// Because dangerouslySetInnerHTML prop is not needed for normal string

module.exports = {
	hasHTMLTags : function(s) {
		const doc = new DOMParser().parseFromString(s, 'text/html');
		const childNodes = [].slice.call(doc.body.childNodes)
		return this.hasElementNodeType(childNodes);
	},

	hasElementNodeType : function (nodes) {	
		if(nodes === undefined) {
			return '';
		}
		return nodes.filter((node) => node.nodeType === 1).length > 0;
	}

}

import React from 'react';
import decode from './utf8Decoding.js';
import utils from './utils';
export default class NotificationSummary extends React.Component {
	constructor(props) {
		super(props);
	}

	appendDelimiter(s, delimiter, r) {
		if(s.length) {
			s.map(tag=> {
				r = r.replace(tag, `${delimiter}${tag}${delimiter}`);
			})
			return r;
		}
	}

	containsHtml(summary) {
		if(summary && utils.hasHTMLTags(summary)) {
			return (
				<p dangerouslySetInnerHTML={{__html: summary}}/>
				);
		}
		return (
			<p>{summary}</p>
			);  
	}
	
	getSummaryDom() {
		let summaryBody = this.props.summary ? this.props.summary.body : '';
		const summary = this.props.summary;
		//regex for {{button}} html placeholder in the notifications summary body
		const regex = /\{{[(\w\s?)]+\}}+/g;
		const htmlTags = summaryBody && summaryBody.match(regex) || []; 
		if (htmlTags.length) {
			const delimiter = '##';
			/*finding the html tag placeholder example '{{button}}' in the notification body and appending a delimiter ## before and after 
			to make is easy to split in order to add the dangerouslySetInnerHTML based on the text or html*/
			summaryBody = this.appendDelimiter(htmlTags, delimiter, summaryBody);
			
			const summaryBodyArray = summaryBody && summaryBody.split(delimiter) || [];
			return summaryBodyArray.map(function(s, i) {
				if(s.match(regex)) { 
					const tagName = s.substring(2, s.length-2);
					const tagValue = decode.getDecodedString(summary[tagName]);
					return (
						<div key={i} dangerouslySetInnerHTML={{__html: tagValue}}></div>
						);
				}
				return (
					<div key={i}>{decode.getDecodedString(s)}</div>
					);
			})
		}
		/*To make it backward compatible so that the older notifications in console application should work 
		and as a side note the older notifications with special chars wont be rendered as expected but should not see any errors in console output*/
		return this.containsHtml(summaryBody);
	}

	render() {
		return (
			<div className={this.props.className}>{this.getSummaryDom()}</div>
			)
	}
}

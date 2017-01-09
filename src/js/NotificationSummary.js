import React from 'react';
import utils from './utils';

const NotificationSummary = ({summary, className}) => {
	if(summary && utils.hasHTMLTags(summary)) {
		return (
			<div className={className} dangerouslySetInnerHTML={{__html: summary}}/>
		);
	}
	return (
		<div className={className}>{summary}</div>	
	);  
};

export default NotificationSummary;

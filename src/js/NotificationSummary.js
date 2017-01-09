import React from 'react';
import utils from './utils';

const NotificationSummary = ({summary, className}) => {
	if(summary && utils.hasHTMLTags(summary)) {
		return (
			<p className={className} dangerouslySetInnerHTML={{__html: summary}}/>
		);
	}
	return (
		<p className={className}>{summary}</p>	
	);  
};

export default NotificationSummary;

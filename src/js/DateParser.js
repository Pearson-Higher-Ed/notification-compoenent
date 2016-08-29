import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {
    injectIntl,
    IntlProvider,
    FormattedRelative,
    FormattedDate
} from 'react-intl';

module.exports = {

	getFormatDateString: function(updatedAt) {
		
		let difference = (new Date() - updatedAt) / 1000 / 60;// in minutes
		if (difference >= 60) {
			difference = difference / 60;
			if (difference >= 24) {
				return <FormattedDate value={new Date(updatedAt)} year="numeric" month="short" day="2-digit" 
				weekday="short"/>
			}
			
			return <FormattedRelative value={new Date(updatedAt)} units="hour"/>
		}
		
		return parseInt(difference) === 1 || parseInt(new Date() - updatedAt- 1000 * 60 * 60 * 24) === 0 ? 'Just Now' : <FormattedRelative value={new Date(updatedAt)} units="minute"/>;
	}
}

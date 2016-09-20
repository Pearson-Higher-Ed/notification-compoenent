import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { injectIntl, IntlProvider, FormattedRelative, FormattedDate, defineMessages, FormattedMessage } from 'react-intl';
const messages = defineMessages({
	dateParserNow: {
		id: 'dateParser.now',
		defaultMessage: 'Just Now'
	},
	dateParserMinutes: {
		id: 'dateParser.minutes',
		defaultMessage: '{minutesCount} minutes ago'
	}
});
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
		
		return (parseInt(difference) === 1 || parseInt(difference) === 0 || parseInt(new Date() - updatedAt- 1000 * 60 * 60 * 24) === 0) ? <FormattedMessage {...messages.dateParserNow} /> : <FormattedMessage {...messages.dateParserMinutes} values={{minutesCount: parseInt(difference)}} />;
	}
}

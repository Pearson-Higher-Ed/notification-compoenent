jest.unmock('../src/js/DateParser');

import DateParser from '../src/js/DateParser';

describe('DateParser', () => {

    it('should display 10 min', () => {
        let now = new Date();
        let tenMinutesAgo = new Date(now.getTime() - 600000);
        expect(DateParser.getFormatDateString(tenMinutesAgo)).toBe('10 min');
    });

    it('should display 1 hr', () => {
        let now = new Date();
        let oneHourAgo = new Date(now.getTime() - 600000 * 6);
        expect(DateParser.getFormatDateString(oneHourAgo)).toBe('1 hr');
    });
    
    it('should display 1 day before', () => {
        let now = new Date();
        now.setDate(now.getDate()-1);
        expect(DateParser.getFormatDateString(now)).toMatch(/[a-zA-Z]{3}\s[a-zA-z]{3}\s\d{2}\s\d{4}/);
    });
});
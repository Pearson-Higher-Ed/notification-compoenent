
import DateParser from '../src/js/DateParser';

describe('DateParser', () => {

    it('should display 10 minutes', () => {
        let now = new Date();
        let tenMinutesAgo = new Date(now.getTime() - 600000);
        expect(DateParser.getFormatDateString(tenMinutesAgo)).toBe('10 minutes ago');
    });

    it('should display 1 minute as Just Now', () => {
        let now = new Date();
        let minuteAgo = new Date(now.getTime() - 60000);
        expect(DateParser.getFormatDateString(minuteAgo)).toBe('Just Now');
    });

     it('should display Just Now', () => {
        let now = new Date();
        let justNow = new Date(now.getTime());
        expect(DateParser.getFormatDateString(justNow)).toBe('Just Now');
    });

    it('should display 1 hour', () => {
        let now = new Date();
        let oneHourAgo = new Date(now.getTime() - 600000 * 6);
        expect(DateParser.getFormatDateString(oneHourAgo)).toBe('1 hour ago');
    });

    it('should display 2 hours', () => {
        let now = new Date();
        let twoHoursAgo = new Date(now.getTime() - 600000 * 12);
        expect(DateParser.getFormatDateString(twoHoursAgo)).toBe('2 hours ago');
    });

    it('should display 1 day before', () => {
        let now = new Date();
        now.setDate(now.getDate()-1);
        expect(DateParser.getFormatDateString(now)).toMatch(/[a-zA-Z]{3},\s[a-zA-z]{3}\s\d{1,2},\s\d{4}/);
    });
});

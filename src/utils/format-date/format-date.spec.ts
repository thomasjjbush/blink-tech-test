import { formatDate } from './format-date';

describe('formatDate', () => {
    beforeAll(() => {
        jest.useFakeTimers('modern');
    });

    it('should return both the formatted time and date if the provided date string is not today', () => {
        expect(formatDate(new Date(null).toString())).toBe('1/1/1970 01:00');
    });

    it('should return only the formatted time if the provided date string is today', () => {
        jest.setSystemTime(new Date(null));
        expect(formatDate(new Date(null).toString())).toBe('01:00');
    });
});

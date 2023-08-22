import dayjs from 'dayjs';
import {
    toUnix,
    DateTimeNow,
    isFutureDate,
    isAfter,
    getTimeDifference,
    timeUntilNow,
    addHours,
} from '../dateHelper';

describe('Date Utility Functions', () => {
    const now = dayjs();
    const tomorrow = now.add(1, 'day').toDate();

    test('toUnix converts date to Unix timestamp', () => {
        const unixTimestamp = toUnix(now.toDate());
        expect(unixTimestamp).toBe(Math.floor(now.toDate().getTime() / 1000));
    });

    test('DateTimeNow returns current date', () => {
        const currentDate = DateTimeNow();
        expect(currentDate).toBeInstanceOf(Date);
    });

    test('isFutureDate correctly identifies future dates', () => {
        expect(isFutureDate(tomorrow)).toBe(true);
        expect(isFutureDate(now.toDate())).toBe(false);
    });

    test('isAfter compares two dates correctly', () => {
        expect(isAfter(now.toDate(), tomorrow)).toBe(false);
        expect(isAfter(tomorrow, now.toDate())).toBe(true);
    });

    test('getTimeDifference calculates time difference', () => {
        const timeDiff = getTimeDifference(tomorrow, now.toDate());
        expect(timeDiff).toBe(24 * 60 * 60 * 1000); // 24 hours in milliseconds
    });

    test('addHours adds hours to a date', () => {
        const hoursToAdd = 5;
        const newDate = addHours(now.toDate(), hoursToAdd);
        expect(newDate).toEqual(now.add(hoursToAdd, 'hours').toDate());
    });
});

import { generateNumArray, generateYearsArray } from '../generators';

describe('generateYearsArray', () => {
    it('should generate an array of years from current year to current year + numYears', () => {
        const numYears = 20;
        const yearsArray = generateYearsArray(numYears);
        const currentYear = new Date().getFullYear();
        const endYear = currentYear + numYears;

        expect(yearsArray).toHaveLength(numYears + 1);

        for (let i = 0; i < yearsArray.length; i++) {
            expect(yearsArray[i]).toBe(currentYear + i);
        }
    });

    it('should generate an array of years from current year to current year + numYears', () => {
        const numYears = 5;
        const yearsArray = generateYearsArray(numYears);
        const currentYear = new Date().getFullYear();
        const endYear = currentYear + numYears;

        expect(yearsArray).toHaveLength(numYears + 1);

        for (let i = 0; i < yearsArray.length; i++) {
            expect(yearsArray[i]).toBe(currentYear + i);
        }
    });
});

describe('generateNumArray', () => {
    it('should generate an array of consecutive numbers from 1 to numItems', () => {
        const numItems = 10;
        const numArray = generateNumArray(numItems);

        expect(numArray).toHaveLength(numItems);

        for (let i = 0; i < numArray.length; i++) {
            expect(numArray[i]).toBe(i + 1);
        }
    });

    it('should generate an array of consecutive numbers from 1 to numItems', () => {
        const numItems = 3;
        const numArray = generateNumArray(numItems);

        expect(numArray).toHaveLength(numItems);

        for (let i = 0; i < numArray.length; i++) {
            expect(numArray[i]).toBe(i + 1);
        }
    });
});

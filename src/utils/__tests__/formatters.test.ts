import { getEllipsisTxt, addSeparator, currencyFormat, capitalize } from '../formatters';

describe('getEllipsisTxt', () => {
    it('should return truncated string with ellipsis', () => {
        const result = getEllipsisTxt('This is a long string that needs to be truncated', 10);
        expect(result).toEqual('This is a ... truncated');
    });

    it('should return empty string if input is empty', () => {
        const result = getEllipsisTxt('');
        expect(result).toEqual('');
    });
});

describe('addSeparator', () => {
    it('should add comma separators to numbers', () => {
        const result = addSeparator('1000000');
        expect(result).toEqual('1,000,000');
    });
});

describe('currencyFormat', () => {
    it('should format number as currency', () => {
        const result = currencyFormat(123456.789, 'R');
        expect(result).toEqual('R 123,456.79');
    });
});

describe('capitalize', () => {
    it('should capitalize the first letter of a string', () => {
        const result = capitalize('hello');
        expect(result).toEqual('Hello');
    });

    it('should capitalize the first letter of a string and make the rest lowercase', () => {
        const result = capitalize('HELLO');
        expect(result).toEqual('Hello');
    });
});

/// remove phone number
/// can't change name surname - need to fill in any if it is filled in you can't change it
/// change email and password

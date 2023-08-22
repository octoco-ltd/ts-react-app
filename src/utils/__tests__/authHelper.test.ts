import { NetworkStatusEnums } from '../enums/networkSTatusEnums';


describe('NetworkStatusEnums', () => {
    it('contains the correct values', () => {
        expect(NetworkStatusEnums.IDLE).toBe('idle');
        expect(NetworkStatusEnums.LOADING).toBe('loading');
        expect(NetworkStatusEnums.SUCCESS).toBe('authenticated');
        expect(NetworkStatusEnums.FAILED).toBe('error');
        expect(NetworkStatusEnums.REGISTERED).toBe('registered');
    });

    it('does not contain unexpected values', () => {
        const values = Object.values(NetworkStatusEnums);
        const expectedValues = ['idle', 'loading', 'authenticated', 'error', 'registered'];
        expect(values).toEqual(expectedValues);
    });

    // Add more test cases as needed...
});

import { openInNewTab } from '../navigationHelpers';

describe('openInNewTab', () => {
    it('opens a new tab with the provided URL', () => {
        const mockWindowOpen = jest.spyOn(window, 'open').mockReturnValue(null);

        openInNewTab('https://www.example.com');

        expect(mockWindowOpen).toHaveBeenCalledWith(
            'https://www.example.com',
            '_blank',
            'noopener,noreferrer',
        );
        mockWindowOpen.mockRestore(); // Restore the original window.open function
    });
});

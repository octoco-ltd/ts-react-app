export const openInNewTab = (url: string) => {
    if (typeof window !== 'undefined' && window.open) {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    }
};

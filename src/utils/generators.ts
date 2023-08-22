export const generateYearsArray = (numYears: number): number[] => {
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + numYears;

    return Array.from({ length: endYear - currentYear + 1 }, (_, index) => currentYear + index);
};

export const generateNumArray = (numItems: number): number[] => {
    return Array.from({ length: numItems }, (_, i) => i + 1);
};

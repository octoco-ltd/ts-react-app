// @ts-ignore
import dayjs from 'dayjs';

/*
A simple and flexible date helper class supporting pretty much any date format
This is so that we aren't dependent on dayjs throughout the app.
We can more easily change our Date dependency by only using dayjsJS/dayJS/etc here
*/

type format =
    | 'short'
    | 'full';

// tslint:disable-next-line:prefer-const
let dateTypes: Date | string | number | dayjs.Dayjs;
type DateType = typeof dateTypes;

export const toUnix = (date: Date | string): number => {
    return Math.floor(new Date(date).getTime() / 1000);
};

export const DateTimeNow = (): Date => {
    return dayjs().toDate();
};

export const isFutureDate = (firstDate: DateType): boolean => {
    let date1 = firstDate;
    if (typeof date1 === 'number') date1 = dayjs.unix(date1);
    return dayjs(date1).isAfter(dayjs());
};

/**
 * Returns true if firstData is after secondDate.
 *
 * @param firstDate - The first date to compare
 * @param secondDate - The second date to compare against
 * @returns boolean - true if firstData is after secondDate, false otherwise
 *
 */
export const isAfter = (firstDate: DateType, secondDate: DateType): boolean => {
    let date1 = firstDate;
    let date2 = secondDate;
    if (typeof date1 === 'number') date1 = dayjs.unix(date1);
    if (typeof date2 === 'number') date2 = dayjs.unix(date2);
    return dayjs(date1).isAfter(dayjs(date2));
};

export const getTimeDifference = (firstDate: DateType, secondDate: DateType): number => {
    let date1 = firstDate;
    let date2 = secondDate;
    if (typeof date1 === 'number') date1 = dayjs.unix(date1);
    if (typeof date2 === 'number') date2 = dayjs.unix(date2);
    return dayjs(date1).diff(dayjs(date2));
};

export const timeUntilNow = (firstDate: DateType): number => {
    let date1 = firstDate;
    if (typeof date1 === 'number') date1 = dayjs.unix(date1);
    return dayjs(date1).diff();
};

export const addHours = (firstDate: DateType | null, hours: number): Date => {
    if (firstDate == null) return dayjs().add(hours, 'hours').toDate();
    if (typeof firstDate === 'number') return dayjs.unix(firstDate).add(hours, 'hours').toDate();
    return  dayjs(firstDate).add(hours, 'hours').toDate();
};

export const addTime = (firstDate: DateType | null, amount: number, unit: 'hours' | 'milliseconds' | 'seconds' | 'minutes' | 'days' ): Date => {
    if (firstDate == null) return dayjs().add(amount, unit).toDate();
    if (typeof firstDate === 'number') return dayjs.unix(firstDate).add(amount, unit).toDate();
    return  dayjs(firstDate).add(amount, unit).toDate();
};

export const addMilliseconds = (firstDate: DateType, milliseconds: number): Date => {
    if (firstDate == null) return dayjs().add(milliseconds, 'milliseconds').toDate();
    if (typeof firstDate === 'number') return dayjs.unix(firstDate).add(milliseconds, 'milliseconds').toDate();
    return  dayjs(firstDate).add(milliseconds, 'milliseconds').toDate();
};

export const isToday = (date: DateType): boolean => {
    if (typeof date === 'number') return dayjs.unix(date).format('DD MMM YYYY') === dayjs().format('DD MMM YYYY');
    return dayjs(date).format('DD MMM YYYY') === dayjs().format('DD MMM YYYY');
};

export const isTomorrow = (date: DateType): boolean => {
    const tomorrow = dayjs().add(1, 'day').format('DD MMMM YYYY');
    if (typeof date === 'number') return dayjs.unix(date).format('DD MMMM YYYY') === tomorrow;
    return dayjs(date).format('DD MMMM YYYY') === tomorrow;
};

export const formatDate = (date: DateType | undefined, type?: format | string): string => {
    if (!date) return 'N/A';
    let formattedDate: string | number | Date | dayjs.Dayjs = date;
    if (typeof date === 'number') formattedDate = dayjs.unix(date);
    switch (type ?? '') {
        case 'short':
            formattedDate = dayjs(formattedDate).format('DD MMM YY');
            break;
        case 'full':
            formattedDate = dayjs(formattedDate).format('DD MMMM YYYY');
            break;
        default:
            if (type) formattedDate = dayjs(formattedDate).format(type);
            else formattedDate = dayjs(formattedDate).format('DD MMM YY');
            break;
    }
    return formattedDate;
};
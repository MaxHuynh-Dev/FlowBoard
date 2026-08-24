import { format } from 'date-fns';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

class DAY_UTILS {
  constructor() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
  }

  formatDate(date: Date): string {
    const typeFormat = 'MM/dd/yyyy';
    return format(date, typeFormat);
  }

  formatDateVN(date: Date): string {
    const typeFormat = 'dd/MM/yyyy';
    return format(date, typeFormat);
  }

  formatDateVNPlusTime(date: Date): string {
    const typeFormat = 'dd/MM/yyyy HH:mm';
    return format(date, typeFormat);
  }

  convertToVNTimeZone(date: Date): string {
    const hour = 7;
    date.setTime(date.getTime() + hour * 60 * 60 * 1000);
    return date.toISOString();
  }

  // convertToVNTimeZoneMbyMoment(date: string | Date): string {
  //   const testDateUtc = moment.utc(date);
  //   const localDate = moment(testDateUtc).local();
  //   return localDate.format('MM-DD-YYYY HH:mm:ss');
  // }

  getCurrentTime(date: number): string {
    return dayjs(date).tz('Europe/London').format('HH:mm');
  }
}

export const dayUtils = new DAY_UTILS();

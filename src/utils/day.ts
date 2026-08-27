class DAY_UTILS {
  private formatDateParts(
    date: Date,
    options: Intl.DateTimeFormatOptions,
    separator: string
  ): string {
    const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(date);
    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
    return `${values.month}${separator}${values.day}${separator}${values.year}`;
  }

  formatDateVN(date: Date): string {
    const formattedDate = this.formatDateParts(
      date,
      { day: '2-digit', month: '2-digit', year: 'numeric' },
      '/'
    );
    const [month, day, year] = formattedDate.split('/');
    return `${day}/${month}/${year}`;
  }

  formatDateVNPlusTime(date: Date): string {
    const formattedDate = this.formatDateVN(date);
    const time = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).format(date);
    return `${formattedDate} ${time}`;
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

  getCurrentDate(): string {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date());
  }

  getCurrentTimeOfDay(date: Date = new Date()): 'morning' | 'afternoon' | 'evening' {
    const hour = date.getHours();

    if (hour < 12) {
      return 'morning';
    }

    if (hour < 18) {
      return 'afternoon';
    }

    return 'evening';
  }

  getCurrentTime(date: number): string {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).format(date);
  }

  formatDate(value: string): string {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(value));
  }
}

export const dayUtils = new DAY_UTILS();

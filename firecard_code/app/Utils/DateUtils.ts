import moment from 'moment';

/** Class providing utility methods for {Date} objects. */
class DateUtils {
  /**
   * Returns true if the date is valid.
   *
   * @param {Date} date The date whose validity state is desired.
   * @returns {boolean} A boolean representing the validity state.
   */
  static isDateValid(date: Date): boolean {
    return date instanceof Date && !isNaN(date.valueOf());
  }

  /**
   * Returns the DD.MM.YYYY representation from a date.
   *
   * @param {Date} date The date whose representation is desired.
   * @returns {string} The desired representation.
   */
  static displayDate(date: Date): string {
    if (this.isDateValid(date)) {
      return moment(date).format('DD.MM.YYYY');
    } else {
      return '';
    }
  }

  /**
   * Returns the YYYY-MM-DD representation from a date.
   *
   * @param {Date} date The date whose representation is desired.
   * @returns {string} The desired representation.
   */
  static displayInvertedDate(date: Date): string {
    if (this.isDateValid(date)) {
      return moment(date).format('YYYY-MM-DD');
    } else {
      return '';
    }
  }

  /**
   * Returns the YYYY-MM representation from a date.
   * @param {Date} date The date whose representation is desired.
   * @returns {string} The desired representation.
   */
  static displayYearMonthDate(date: Date): string {
    if (this.isDateValid(date)) {
      return moment(date).format('YYYY-MM');
    } else {
      return '';
    }
  }

  /**
   * Returns the HH:mm representation from a date.
   *
   * @param {Date} date The date whose representation is desired.
   * @returns {string} The desired representation.
   */
  static displayTime(date: Date): string {
    if (this.isDateValid(date)) {
      return moment(date).format('HH:mm');
    } else {
      return '';
    }
  }

  /**
   * Returns the fhir instant representation from a date.
   *
   * @param {Date} date The date whose fhir instant representation is desired.
   * @returns {string} The desired fhir instant representation.
   */
  static displayFhirInstantDateTime(date: Date): string {
    if (this.isDateValid(date)) {
      return moment(date).format();
    } else {
      return '';
    }
  }

  /**
   * Returns the difference in minutes between two dates.
   * @param {Date} start The older date.
   * @param {Date} end The latest date.
   * @returns {string} The desired difference in minutes.
   */
  static minutesDifference(start: Date, end: Date): string {
    if (this.isDateValid(start) && this.isDateValid(end)) {
      return moment(end).diff(moment(start), 'minutes').toString();
    } else {
      return '';
    }
  }
}

export default DateUtils;

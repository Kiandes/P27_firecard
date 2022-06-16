import DateUtils from '../DateUtils';

it('given a date 01.01.2001, isDateValid() returns true', () => {
  const date: Date = new Date('2001-01-01');
  expect(DateUtils.isDateValid(date)).toBe(true);
});

it('given an invalid date, isDateValid() returns false', () => {
  const date: Date = new Date('');
  expect(DateUtils.isDateValid(date)).toBe(false);
});

it('given a date 01.01.2001, displayDate() returns 01.01.2001', () => {
  const date: Date = new Date('2001-01-01');
  expect(DateUtils.displayDate(date)).toBe('01.01.2001');
});

it("given an invalid date, displayDate() returns ''", () => {
  const date: Date = new Date('');
  expect(DateUtils.displayDate(date)).toBe('');
});

it('given a date 01.01.2001, displayInvertedDate() returns 01.01.2001', () => {
  const date: Date = new Date('2001-01-01');
  expect(DateUtils.displayInvertedDate(date)).toBe('2001-01-01');
});

it("given an invalid date, displayInvertedDate() returns ''", () => {
  const date: Date = new Date('');
  expect(DateUtils.displayInvertedDate(date)).toBe('');
});

it('given a date time 2001-01-01 10:20:01, displayYearMonthDate() returns 2001-01', () => {
  const date: Date = new Date('2001-01-01 10:20:01');
  expect(DateUtils.displayYearMonthDate(date)).toBe('2001-01');
});

it("given an invalid date and time, displayYearMonthDate() returns ''", () => {
  const date: Date = new Date('');
  expect(DateUtils.displayYearMonthDate(date)).toBe('');
});

it('given a time 10:20:01, displayTime() returns 10:20', () => {
  const date: Date = new Date('2001-01-01 10:20:01');
  expect(DateUtils.displayTime(date)).toBe('10:20');
});

it("given an invalid time, displayTime() returns ''", () => {
  const date: Date = new Date('');
  expect(DateUtils.displayTime(date)).toBe('');
});

it('given a date time 2001-01-01 10:20:01, displayFhirInstantDateTime() returns 2001-01-01T10:20:01+01:00', () => {
  const date: Date = new Date('2001-01-01 10:20:01');
  expect(DateUtils.displayFhirInstantDateTime(date)).toBe('2001-01-01T10:20:01+01:00');
});

it("given an invalid date and time, displayFhirInstantDateTime() returns ''", () => {
  const date: Date = new Date('');
  expect(DateUtils.displayFhirInstantDateTime(date)).toBe('');
});

it('given two dates times 2001-01-01 10:20:01 and 2001-01-01 10:34:06, minutesDifference() returns 14', () => {
  const start: Date = new Date('2001-01-01 10:20:01');
  const end: Date = new Date('2001-01-01 10:34:06');
  expect(DateUtils.minutesDifference(start, end)).toBe('14');
});

it('given two dates times 2001-01-01 10:34:06 and 2001-01-01 10:20:01, minutesDifference() returns -14', () => {
  const end: Date = new Date('2001-01-01 10:20:01');
  const start: Date = new Date('2001-01-01 10:34:06');
  expect(DateUtils.minutesDifference(start, end)).toBe('-14');
});

it("given an invalid ending date and time, minutesDifference() returns ''", () => {
  const start: Date = new Date('');
  const end: Date = new Date('2001-01-01 10:34:06');
  expect(DateUtils.minutesDifference(start, end)).toBe('');
});

it("given an invalid starting date and time, minutesDifference() returns ''", () => {
  const start: Date = new Date('2001-01-01 10:20:01');
  const end: Date = new Date('');
  expect(DateUtils.minutesDifference(start, end)).toBe('');
});

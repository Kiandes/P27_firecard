import {Patient} from '@i4mi/fhir_r4';
import UserUtils from '../UserUtils';

it('given a FHIR patient with id 16-2500, getFhirId() returns 16-2500', () => {
  const patient: Patient = {id: '16-2500'};
  expect(UserUtils.getFhirId(patient)).toBe('16-2500');
});

it("given a FHIR patient with no id, getFhirId() returns ''", () => {
  const patient: Patient = {};
  expect(UserUtils.getFhirId(patient)).toBe('');
});

it('given a FHIR patient with MIDATA id 16-2500, getMidataId() returns 16-2500', () => {
  const patient: Patient = {
    identifier: [
      {
        system: 'http://midata.coop/identifier/midata-id',
        value: '16-2500',
      },
    ],
  };
  expect(UserUtils.getMidataId(patient)).toBe('16-2500');
});

it("given a FHIR patient with no MIDATA id, getMidataId() returns ''", () => {
  const patient: Patient = {};
  expect(UserUtils.getMidataId(patient)).toBe('');
});

it('given a FHIR patient with email address jest@test.com, getEmailAddress() returns jest@test.com', () => {
  const patient: Patient = {
    identifier: [
      {
        system: 'http://midata.coop/identifier/patient-login',
        value: 'jest@test.com',
      },
    ],
  };
  expect(UserUtils.getEmailAddress(patient)).toBe('jest@test.com');
});

it("given a FHIR patient with no email address, getEmailAddress() returns ''", () => {
  const patient: Patient = {};
  expect(UserUtils.getEmailAddress(patient)).toBe('');
});

it('given a FHIR patient with birthdate 01.01.2001, getBirthdate().toDateString() returns Mon Jan 01 2001', () => {
  const patient: Patient = {birthDate: '2001-01-01'};
  expect(UserUtils.getBirthdate(patient).toDateString()).toBe(
    'Mon Jan 01 2001',
  );
});

it('given a FHIR patient with no birthdate, getBirthdate().toDateString() returns Invalid date', () => {
  const patient: Patient = {};
  expect(UserUtils.getBirthdate(patient).toDateString()).toBe(
    new Date('').toDateString(),
  );
});

it('given a FHIR patient with name given names Jest Test and family name Tester, getName() returns Jest Test Tester', () => {
  const patient: Patient = {
    name: [
      {
        given: ['Jest', 'Test'],
        family: 'Tester',
      },
    ],
  };
  expect(UserUtils.getName(patient)).toBe('Jest Test Tester');
});

it('given a FHIR patient with family name Tester, getName() returns Tester', () => {
  const patient: Patient = {
    name: [
      {
        family: 'Tester',
      },
    ],
  };
  expect(UserUtils.getName(patient)).toBe('Tester');
});

it('given a FHIR patient with given names Jest Test, getName() returns Jest Test', () => {
  const patient: Patient = {
    name: [
      {
        given: ['Jest', 'Test'],
      },
    ],
  };
  expect(UserUtils.getName(patient)).toBe('Jest Test');
});

it("given a FHIR patient with no email address, getEmailAddress() returns ''", () => {
  const patient: Patient = {};
  expect(UserUtils.getName(patient)).toBe('');
});

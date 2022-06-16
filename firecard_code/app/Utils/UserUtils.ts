import {Patient} from '@i4mi/fhir_r4';

/** Class providing utility methods for {Patient} objects. */
class UserUtils {
  /**
   * Returns the FHIR id from a patient.
   *
   * @param {Patient | undefined} patient The patient whose FHIR id is desired.
   * @returns {string} The desired FHIR id.
   */
  static getFhirId(patient: Patient | undefined): string {
    return patient?.id ?? '';
  }

  /**
   * Returns the MIDATA id from a patient.
   *
   * @param {Patient | undefined} patient The patient whose MIDATA id is desired.
   * @returns {string} The desired MIDATA id.
   */
  static getMidataId(patient: Patient | undefined): string {
    if (patient?.identifier) {
      let midataId = '';
      for (let i = 0; i < patient.identifier.length; i++) {
        if (
          patient.identifier[i].system ===
          'http://midata.coop/identifier/midata-id'
        ) {
          midataId = patient.identifier[i].value ?? '';
          break;
        }
      }
      return midataId;
    } else {
      return '';
    }
  }

  /**
   * Returns the email address from a patient.
   *
   * @param {Patient | undefined} patient The patient whose email address is desired.
   * @returns {string} The desired email address.
   */
  static getEmailAddress(patient: Patient | undefined): string {
    if (patient?.identifier) {
      let emailAddress = '';
      for (let i = 0; i < patient.identifier.length; i++) {
        if (
          patient.identifier[i].system ===
          'http://midata.coop/identifier/patient-login'
        ) {
          emailAddress = patient.identifier[i].value ?? '';
          break;
        }
      }
      return emailAddress;
    } else {
      return '';
    }
  }

  /**
   * Returns the birthdate from a patient.
   *
   * @param {Patient | undefined} patient The patient whose birthdate is desired.
   * @returns {Date} The desired birthdate.
   */
  static getBirthdate(patient: Patient | undefined): Date {
    return new Date(patient?.birthDate ?? '');
  }

  /**
   * Returns the name from a patient.
   *
   * @param {Patient | undefined} patient The patient whose name is desired.
   * @returns {string} The desired name.
   */
  static getName(patient: Patient | undefined): string {
    let name = '';
    if (patient?.name && patient.name.length > 0) {
      // I assume that the first element is always the official name, as MIDATA does not specify the use field of a HumanName.
      const humanName = patient.name[0];
      if (humanName.given && humanName.given.length > 0) {
        for (let i = 0; i < humanName.given.length; i++) {
          name += `${humanName.given[i]} `;
        }
      }
      name += humanName.family ?? '';
    }
    return name.trim();
  }
}

export default UserUtils;

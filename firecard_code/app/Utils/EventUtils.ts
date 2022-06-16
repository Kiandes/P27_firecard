import {
  Alarm,
  Availability,
  Event,
  EventAccessLevel,
  EventStatus,
} from 'expo-calendar';
import {
  Appointment,
  AppointmentParticipant,
  AppointmentParticipationStatus,
  AppointmentStatus,
  Bundle,
  instant,
  Location,
} from '@i4mi/fhir_r4';
import moment from 'moment';
import uuid from 'react-native-uuid';
import {sha256} from 'js-sha256';
import DateUtils from './DateUtils';

/** Class providing utility methods for {Appointment} objects. */
class AppointmentUtils {
  /**
   * Returns the Expo equivalent from an FHIR appointment, to export to a local calendar.
   * @param {Appointment} appointment The FHIR appointment whose Expo equivalent is desired.
   * @param {Alarm[]} alarms The alarms of the future exported Expo equivalent.
   * @param {string} calendarId The calendar id where Expo equivalent will be exported.
   * @param {string} userId The FHIR id of the user that will be used as a salt.
   * @returns {Event} The desired Expo equivalent.
   */
  static createEvent(
    appointment: Appointment,
    alarms: Alarm[],
    calendarId: string,
    userId: string,
  ): Event {
    return {
      // access set to default, to enable synchronization for this appointment since it do not contain any data.
      accessLevel: EventAccessLevel.DEFAULT,
      alarms: alarms,
      allDay: false,
      availability: Availability.BUSY,
      calendarId: calendarId,
      endDate: moment(appointment.end).toDate(),
      // creates a hash from the appointment id and fhir id of the user. It could be useful for future version to check if appointment was already exported.
      id: sha256(appointment.id + userId),
      startDate: moment(appointment.start).toDate(),
      status: EventStatus.CONFIRMED,
      title: 'Booked Slot',
    } as Event;
  }

  /**
   * Returns a FHIR appointment corresponding to given parameters.
   * @param {string} title The title of the desired FHIR appointment.
   * @param {string} participants The participants of the desired FHIR appointment.
   * @param {instant} start The starting date and time of the desired FHIR appointment.
   * @param {instant} end The ending date and time of the desired FHIR appointment.
   * @param {string} description The description of the desired FHIR appointment.
   * @param {string} address The address line of the address of the desired FHIR appointment.
   * @param {string} postalCode The postal code of the address of the desired FHIR appointment.
   * @param {string} city The city of the address of the desired FHIR appointment.
   * @param {string} owner The email address of the owner of the desired FHIR appointment.
   * @returns {Appointment} The desired FHIR appointment.
   */
  static createAppointment(
    title: string,
    participants: string,
    start: instant,
    end: instant,
    description: string,
    address: string,
    postalCode: string,
    city: string,
    owner: string,
  ): Appointment {
    // Creates the location and sets up the address in it.
    let location: Location | undefined;

    if (address !== '') {
      location = {
        resourceType: 'Location',
        id: uuid.v4() as string,
        address: {
          line: Array(1).fill(address),
          postalCode: postalCode,
          city: city,
        },
      };
    }

    // Creates a list of participants.
    let emails: string[] | undefined;

    if (participants !== '') {
      emails = participants.split(';');
    }

    const appointmentParticipants = this.createParticipants(
      owner,
      emails,
      location,
    );

    // Creates the desired appointment.
    return {
      resourceType: 'Appointment',
      status: AppointmentStatus.PROPOSED,
      description: title,
      participant: appointmentParticipants,
      start: start,
      end: end,
      minutesDuration: DateUtils.minutesDifference(
        new Date(start),
        new Date(end),
      ),
      comment: description,
      contained: Array(1).fill(location),
    };
  }

  /**
   * Returns a list containing the participants of an FHIR appointment.
   * @param {string} owner The email address of the owner of the future FHIR appointment.
   * @param {string[]} emails The emails of the participants of the future FHIR appointment.
   * @param {Location} location The location containing the address of the future FHIR appointment.
   * @returns {AppointmentParticipant[]} Returns the desired list of participants.
   * @private This method is private because it will only be used inside {EventUtils} class.
   */
  private static createParticipants(
    owner: string,
    emails?: string[],
    location?: Location,
  ): AppointmentParticipant[] {
    const participants: AppointmentParticipant[] = [];

    // Adds the owner
    participants.push({
      status: AppointmentParticipationStatus.ACCEPTED,
      actor: {
        identifier: {
          system: 'http://midata.coop/identifier/patient-login-or-invitation',
          value: owner,
        },
      },
    });

    // Adds the other participants
    if (emails) {
      for (let i = 0; i < emails.length; i++) {
        participants.push({
          status: AppointmentParticipationStatus.NEEDS_ACTION,
          actor: {
            identifier: {
              system:
                'http://midata.coop/identifier/patient-login-or-invitation',
              value: emails[i],
            },
          },
        });
      }
    }

    // Adds the location containing the address
    if (location) {
      participants.push({
        status: AppointmentParticipationStatus.ACCEPTED,
        actor: {
          reference: `#${location.id}`,
          type: 'Location',
        },
      });
    }

    return participants;
  }

  /**
   * Returns a list of appointments from a searchset bundle.
   * @param {Bundle} bundle The searchset bundle we want to extract appointments.
   * @returns {Appointment[]} The desired list of appointment.
   */
  static bundleToAppointmentArray(bundle: Bundle): Appointment[] {
    let appointments: Appointment[] = [];
    bundle.entry?.forEach(x => {
      if (x.resource?.resourceType === 'Appointment') {
        appointments.push(x.resource as Appointment);
      }
    });
    return appointments;
  }
}

export default AppointmentUtils;

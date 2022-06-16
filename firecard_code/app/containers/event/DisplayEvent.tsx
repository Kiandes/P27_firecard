import * as React from 'react';
import {
  Box,
  Button,
  Column,
  HStack,
  Icon,
  Input,
  ScrollView,
  TextArea,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {
  Appointment,
  AppointmentParticipationStatus,
  AppointmentStatus,
  Location,
} from '@i4mi/fhir_r4';
import AppointmentUtils from '../../Utils/EventUtils';
import {useAppSelector} from '../../hooks';
import {createEventAsync} from 'expo-calendar';
import {DisplayEventProps} from '../../models/props/AuthorizedStackScreenProps';
import {usePutAppointmentMutation} from '../../store/reducers/fhirApi';
import ParticipantsList from '../../components/ParticipantsList';
import DateUtils from '../../Utils/DateUtils';

/**
 * Returns a container that shows an appointment and its participants.
 * @param {HomeProps} props Props containing the appointment to display and a Navigation object.
 * @returns {JSX.Element} The desired container with the appointment.
 */
const DisplayEvent = (props: DisplayEventProps): JSX.Element => {
  const appointment = props.route.params.appointment;

  let location: Location | null = null;

  const {session} = useAppSelector(state => {
    return state.auth;
  });

  // Hook to update an appointment.
  const [putAppointment] = usePutAppointmentMutation();

  // Checks if the appointment contains a Location.
  if (appointment.contained && appointment.contained.length > 0) {
    for (const resource of appointment.contained) {
      if (resource.resourceType === 'Location') {
        location = resource as Location;
        break;
      }
    }
  }

  /**
   * Returns a pretty string of start and end dates and times.
   * @returns {string} The desired pretty string.
   */
  const startEndToPretty = (): string => {
    let pretty = '';
    pretty += moment(appointment.start).format('dddd, Do MMMM');
    pretty += '\n';
    pretty += DateUtils.displayTime(new Date(appointment.start ?? ''));
    pretty += '\n';
    pretty += DateUtils.displayTime(new Date(appointment.end ?? ''));
    pretty += '\n(';
    // Compatibility code if the appointment do not contain the minutes' duration.
    pretty +=
      appointment.minutesDuration ??
      DateUtils.minutesDifference(
        new Date(appointment.start ?? ''),
        new Date(appointment.end ?? ''),
      );
    pretty += ' minutes)';
    return pretty;
  };

  /**
   * Returns a pretty string of the address.
   * @returns {string} The desired pretty string.
   */
  const locationToAddress = (): string => {
    let address = '';
    if (location) {
      if (location.address) {
        if (location.address.line) {
          for (const line of location.address.line) {
            address += line + '\n';
          }
        }
        if (location.address.postalCode) {
          address += location.address.postalCode + '\n';
        }
        if (location.address.city) {
          address += location.address.city + '\n';
        }
      }
    }
    return address;
  };

  let isOwner: boolean = false;

  // Sets isOwner with true if the connected user is the creator of the resource.
  // MIDATA dependent code, will not work with another FHIR service.
  if (appointment.meta?.extension && appointment.meta?.extension.length > 0) {
    let metadata = appointment.meta.extension.find(
      x => x.url === 'http://midata.coop/extensions/metadata',
    );
    if (metadata && metadata.extension && metadata.extension.length > 0) {
      let creator = metadata.extension.find(x => x.url === 'creator');
      if (creator && creator.valueReference) {
        isOwner =
          creator.valueReference.reference === `Patient/${session?.userId}`;
      }
    }
  }

  // Gets the selected calendarId and if the synchronisation is enabled.
  const {calendarId, isCalendarSyncEnabled} = useAppSelector(state => {
    return state.settings;
  });

  /**
   * Exports the displayed appointment to a regular calendar but without sensitive data.
   * @returns {Promise<void>} A void promise.
   */
  const onPressExport = async () => {
    if (calendarId) {
      const calendarEvent = AppointmentUtils.createEvent(
        appointment,
        [],
        calendarId,
        session?.userId ?? '',
      );
      console.log(calendarEvent);
      createEventAsync(calendarId, calendarEvent)
        .then(result => console.log(result))
        .catch(error => console.error(error));
    }
  };

  /**
   * Sets the status to the current user.
   * @param {AppointmentParticipationStatus} status The new status of the user.
   */
  const setParticipantStatus = (status: AppointmentParticipationStatus) => {
    let participant = appointment.participant.find(
      x => x.actor?.reference === `Patient/${session?.userId}`,
    );
    if (participant) {
      participant.status = status;
    }
  };

  const onPressAccept = () => {
    setParticipantStatus(AppointmentParticipationStatus.ACCEPTED);
    putAsync(appointment);
  };

  const onPressTentative = () => {
    setParticipantStatus(AppointmentParticipationStatus.TENTATIVE);
    putAsync(appointment);
  };

  const onPressDecline = () => {
    setParticipantStatus(AppointmentParticipationStatus.DECLINED);
    putAsync(appointment);
  };

  const onPressDelete = () => {
    appointment.status = AppointmentStatus.CANCELLED;
    putAsync(appointment);
  };

  /**
   * Updates the given appointment and close the modal, because there is currently a bug with MIDATA, the response creator field is wrong, so it creates problems for the isOwner variable.
   * @param {Partial<Appointment> & Pick<Appointment, "id">} body The given appointment.
   */
  const putAsync = (body: Partial<Appointment> & Pick<Appointment, 'id'>) => {
    putAppointment(body)
      .unwrap()
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        props.navigation.goBack();
      });
  };

  return (
    <ScrollView py="3" px="2">
      <Box backgroundColor="white" borderRadius="xl">
        <Input
          variant="underlined"
          size="lg"
          bold
          py="3"
          px="2"
          value={appointment.description}
          isReadOnly
        />
        <Column py="3" px="2">
          <ParticipantsList
            navigation={props.navigation}
            data={appointment.participant ?? []}
          />
          <TextArea
            isReadOnly
            variant="underlined"
            InputLeftElement={
              <Icon as={<MaterialIcons name="access-time" />} size="5" mx="2" />
            }
            value={startEndToPretty()}
            autoCompleteType={null}
          />
          <TextArea
            isReadOnly
            variant="underlined"
            InputLeftElement={
              <Icon as={<MaterialIcons name="event-note" />} size="5" mx="2" />
            }
            value={appointment.comment}
            autoCompleteType={null}
          />
          {/* Shows the field only if there is data in it. */}
          {appointment.patientInstruction ? (
            <TextArea
              isReadOnly
              variant="underlined"
              InputLeftElement={
                <Icon as={<MaterialIcons name="list" />} size="5" mx="2" />
              }
              value={appointment.patientInstruction}
              autoCompleteType={null}
            />
          ) : (
            <></>
          )}
          {/* Shows the field only if there is data in it. */}
          {location ? (
            <TextArea
              isReadOnly
              variant="underlined"
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="location-pin" />}
                  size="5"
                  mx="2"
                />
              }
              value={locationToAddress()}
              autoCompleteType={null}
            />
          ) : (
            <></>
          )}
          {isCalendarSyncEnabled ? (
            <Button mt="3" onPress={onPressExport} backgroundColor="#f26e15">
              Export in calendar
            </Button>
          ) : (
            <></>
          )}
          {/* Shows the field only if the user is the owner. */}
          {isOwner ? (
            <Button mt="3" onPress={onPressDelete} backgroundColor="#f26e15">
              Delete
            </Button>
          ) : (
            <></>
          )}
          <HStack justifyContent="space-between">
            <Button mt="3" onPress={onPressAccept} backgroundColor="#f26e15">
              <Icon
                as={<MaterialIcons name="event-available" />}
                size="5"
                mx="2"
                color="#ffffff"
              />
            </Button>
            <Button mt="3" onPress={onPressTentative} backgroundColor="#f26e15">
              <Icon
                as={<MaterialIcons name="help-outline" />}
                size="5"
                mx="2"
                color="#ffffff"
              />
            </Button>
            <Button mt="3" onPress={onPressDecline} backgroundColor="#f26e15">
              <Icon
                as={<MaterialIcons name="event-busy" />}
                size="5"
                mx="2"
                color="#ffffff"
              />
            </Button>
          </HStack>
        </Column>
      </Box>
    </ScrollView>
  );
};

export default DisplayEvent;

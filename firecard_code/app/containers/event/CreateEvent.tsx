import * as React from 'react';
import {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {
  Box,
  Button,
  Column,
  Icon,
  Input,
  Pressable,
  ScrollView,
  TextArea,
} from 'native-base';

import {useAppSelector} from '../../hooks';
import moment from 'moment';
import {
  useGetPatientQuery,
  usePostAppointmentMutation,
} from '../../store/reducers/fhirApi';
import EventUtils from '../../Utils/EventUtils';
import UserUtils from '../../Utils/UserUtils';
import {CreateEventProps} from '../../models/props/AuthorizedStackScreenProps';

/**
 * Returns a container that shows a form to create a new appointment.
 * @param {HomeProps} props Props containing the selected date and a Navigation object.
 * @returns {JSX.Element} The desired container with the form.
 */
const CreateEvent = (props: CreateEventProps): JSX.Element => {
  const {session} = useAppSelector(state => {
    return state.auth;
  });

  // Gets patient information, will not refetch if data have already been fetched previously on Settings screen.
  const {currentData} = useGetPatientQuery(session?.userId as string);

  // Hook to post the new appointment.
  const [postAppointment] = usePostAppointmentMutation();

  const [title, setTitle] = useState('');
  const [participants, setParticipants] = useState('');
  const [start, setStart] = useState(
    new Date(props.route.params.selectedDate + 'T07:00:00'),
  );
  const [end, setEnd] = useState(
    new Date(props.route.params.selectedDate + 'T08:00:00'),
  );
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');

  /**
   * Updates start and end when date has changed.
   * @param {DateTimePickerEvent} event Event object from the date picker.
   * @param {Date | undefined} date Date object from the date picker.
   */
  const onChangeDate = (event: DateTimePickerEvent, date: Date | undefined) => {
    if (date) {
      let newEnd = new Date(end);
      newEnd.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      setStart(date);
      setEnd(newEnd);
    }
  };

  /**
   * Updates start and end to ensure that end will always be bigger or equal than start.
   * @param {DateTimePickerEvent} event Event object from the time picker.
   * @param {Date | undefined} date Date object from the time picker.
   */
  const onChangeStart = (
    event: DateTimePickerEvent,
    date: Date | undefined,
  ) => {
    if (date) {
      if (end < date) {
        setEnd(date);
      }
      setStart(date);
    }
  };

  /**
   * Updates start and end to ensure that start will always be smaller or equal than end.
   * @param {DateTimePickerEvent} event Event object from the date time picker.
   * @param {Date | undefined} date Date object from the date time picker.
   */
  const onChangeEnd = (event: DateTimePickerEvent, date: Date | undefined) => {
    if (date) {
      if (start > date) {
        setStart(date);
      }
      setEnd(date);
    }
  };

  /**
   * Posts the new appointment and close the modal.
   * @returns {Promise<void>} A void Promise.
   */
  const onPressSave = async () => {
    const appointment = EventUtils.createAppointment(
      title,
      participants,
      moment(start).format(),
      moment(end).format(),
      description,
      address,
      postalCode,
      city,
      UserUtils.getEmailAddress(currentData),
    );

    postAppointment(appointment)
      .unwrap()
      .then(result => console.log(result))
      .catch(error => console.error(error))
      .finally(() => props.navigation.goBack());
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
          placeholder="Add a title"
          value={title}
          onChangeText={setTitle}
        />
        <Column py="3" px="2">
          <Input
            variant="underlined"
            InputLeftElement={
              <Icon as={<MaterialIcons name="people-alt" />} size="5" mx="2" />
            }
            placeholder="Invite attendees (e-mail separated by ;)"
            value={participants}
            onChangeText={setParticipants}
          />
          {/* This piece of code only work on Android, for iOS modification will be needed. */}
          <Pressable
            onPress={() =>
              DateTimePickerAndroid.open({
                value: start,
                mode: 'date',
                onChange: onChangeDate,
              })
            }>
            <Input
              variant="underlined"
              isReadOnly
              InputLeftElement={
                <Icon as={<MaterialIcons name="event" />} size="5" mx="2" />
              }
              value={moment(start).format('DD.MM.YYYY')}
            />
          </Pressable>
          {/* This piece of code only work on Android, for iOS modification will be needed. */}
          <Pressable
            onPress={() =>
              DateTimePickerAndroid.open({
                value: start,
                mode: 'time',
                is24Hour: true,
                onChange: onChangeStart,
              })
            }>
            <Input
              variant="underlined"
              isReadOnly
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="hourglass-top" />}
                  size="5"
                  mx="2"
                />
              }
              value={moment(start).format('HH:mm')}
            />
          </Pressable>
          {/* This piece of code only work on Android, for iOS modification will be needed. */}
          <Pressable
            onPress={() =>
              DateTimePickerAndroid.open({
                value: end,
                mode: 'time',
                is24Hour: true,
                onChange: onChangeEnd,
              })
            }>
            <Input
              variant="underlined"
              isReadOnly
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="hourglass-bottom" />}
                  size="5"
                  mx="2"
                />
              }
              value={moment(end).format('HH:mm')}
            />
          </Pressable>
          <TextArea
            variant="underlined"
            InputLeftElement={
              <Icon as={<MaterialIcons name="event-note" />} size="5" mx="2" />
            }
            placeholder="Add a description"
            value={description}
            onChangeText={setDescription}
            autoCompleteType={null}
          />
          <Input
            variant="underlined"
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="location-pin" />}
                size="5"
                mx="2"
              />
            }
            placeholder="Add an address"
            value={address}
            onChangeText={setAddress}
          />
          <Input
            variant="underlined"
            InputLeftElement={
              <Icon as={<MaterialIcons name="tag" />} size="5" mx="2" />
            }
            placeholder="Add a postal code"
            value={postalCode}
            onChangeText={setPostalCode}
          />
          <Input
            variant="underlined"
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="location-city" />}
                size="5"
                mx="2"
              />
            }
            placeholder="Add a city"
            value={city}
            onChangeText={setCity}
          />
          <Button mt="3" onPress={onPressSave} backgroundColor="#f26e15">
            Save
          </Button>
        </Column>
      </Box>
    </ScrollView>
  );
};

export default CreateEvent;

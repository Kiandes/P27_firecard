import * as React from 'react';
import {
  Text,
  Box,
  FlatList,
  HStack,
  VStack,
  Spacer,
  Pressable,
} from 'native-base';

import AppointmentListProps from '../models/props/AppointmentListProps';
import DateUtils from '../Utils/DateUtils';
import AppointmentListItemProps from '../models/props/AppointmentListItemProps';

/**
 * Returns a list component that shows appointments.
 * @param {AppointmentListProps} props Props containing the appointments, the max height of the list and a Navigation object.
 * @returns {JSX.Element} The desired list of appointments.
 */
const AppointmentsList = (props: AppointmentListProps): JSX.Element => {
  return (
    <FlatList
      maxHeight={props.height}
      data={props.data}
      renderItem={({item}) => (
        <AppointmentsListItem
          appointment={item}
          navigation={props.navigation}
        />
      )}
      keyExtractor={item => item.id as string}
    />
  );
};

/**
 * Returns an item component that show an appointment and that can be clicked to open the appointment.
 * @param {AppointmentListItemProps} props Props containing the appointment and a Navigation object.
 * @returns {JSX.Element} The desired item of appointment.
 */
const AppointmentsListItem = (props: AppointmentListItemProps): JSX.Element => {
  const appointment = props.appointment;

  return (
    <Pressable
      onPress={() =>
        props.navigation.navigate('DisplayEvent', {
          appointment: appointment,
        })
      }>
      <Box
        borderBottomWidth="1"
        borderColor="coolGray.200"
        pl="4"
        pr="5"
        py="2">
        <HStack space="3" justifyContent="space-between">
          <VStack>
            <Text color="coolGray.800" bold>
              {DateUtils.displayTime(new Date(appointment.start ?? ''))}
            </Text>
          </VStack>
          <VStack width="50%">
            <Text color="coolGray.800" bold isTruncated>
              {appointment.description}
            </Text>
            <Text color="coolGray.600" isTruncated>
              {appointment.comment}
            </Text>
          </VStack>
          <Spacer />
          <VStack>
            <Text fontSize="xs" color="coolGray.800" alignSelf="flex-start">
              {DateUtils.displayDate(new Date(appointment.start ?? ''))}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default AppointmentsList;

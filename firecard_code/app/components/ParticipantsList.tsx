import * as React from 'react';
import {Avatar, Box, HStack, Text, VStack} from 'native-base';
import ParticipantsListProps from '../models/props/ParticipantsListProps';
import ParticipantsListItemProps from '../models/props/ParticipantsListItemProps';
import {AppointmentParticipationStatus} from '@i4mi/fhir_r4';
import uuid from 'react-native-uuid';

/**
 * Returns a list component that shows participants that have responded.
 * @param {AppointmentListProps} props Props containing the participants.
 * @returns {JSX.Element} The desired list of participants.
 */
const ParticipantsList = (props: ParticipantsListProps): JSX.Element => {
  const items = [];
  // Selects only the participants that have responded.
  for (const appointmentParticipant of props.data) {
    if (
      appointmentParticipant.actor &&
      appointmentParticipant.status !==
        AppointmentParticipationStatus.NEEDS_ACTION
    ) {
      if (appointmentParticipant.actor.type !== 'Location') {
        items.push(
          <ParticipantsListItem
            key={
              appointmentParticipant.actor?.reference ?? uuid.v4().toString()
            }
            appointmentParticipant={appointmentParticipant}
            navigation={props.navigation}
          />,
        );
      }
    }
  }
  return <VStack>{items}</VStack>;
};

/**
 * Returns an item component that show a participant that has responded.
 * @param {AppointmentListItemProps} props Props containing the participant.
 * @returns {JSX.Element} The desired item of participant.
 */
const ParticipantsListItem = (
  props: ParticipantsListItemProps,
): JSX.Element => {
  const appointmentParticipant = props.appointmentParticipant;
  let display = '';
  let initials = '';
  let badgeColor: string;
  switch (appointmentParticipant.status) {
    case AppointmentParticipationStatus.ACCEPTED:
      badgeColor = 'success.500';
      break;
    case AppointmentParticipationStatus.TENTATIVE:
      badgeColor = 'warning.500';
      break;
    case AppointmentParticipationStatus.DECLINED:
      badgeColor = 'error.500';
      break;
    default:
      badgeColor = 'muted.500';
  }

  if (appointmentParticipant.actor) {
    display = appointmentParticipant.actor.display ?? '';
    initials = getInitials(display);
  }

  return (
    <Box borderBottomWidth="1" borderColor="coolGray.200" px="2" py="2">
      <HStack space="3" alignItems={'center'}>
        <Avatar bg="#f26e13" size="sm">
          {initials}
          <Avatar.Badge bg={badgeColor} />
        </Avatar>
        <Text color="coolGray.800">{display}</Text>
      </HStack>
    </Box>
  );
};

const getInitials = (name: string): string => {
  const names = name.split(' ');
  if (names.length > 1) {
    return names[0].charAt(0) + names[names.length - 1].charAt(0);
  } else {
    return names[0].charAt(0);
  }
};

export default ParticipantsList;

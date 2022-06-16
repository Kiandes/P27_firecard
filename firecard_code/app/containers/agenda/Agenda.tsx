import * as React from 'react';
import {Box, Divider, Fab, Icon, Text, View} from 'native-base';
import moment from 'moment';

import {HomeProps} from '../../models/props/AuthorizedStackScreenProps';
import {useGetFutureAppointmentsQuery} from '../../store/reducers/fhirApi';
import AppointmentsList from '../../components/AppointmentsList';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

/**
 * Returns a container that shows a list of future appointments.
 * @param {HomeProps} props Props containing Navigation object.
 * @returns {JSX.Element} The desired container that contains a list of future appointments.
 */
const Agenda = (props: HomeProps): JSX.Element => {
  // Gets the future appointments from today to no limit.
  const {currentData, refetch} = useGetFutureAppointmentsQuery(
    moment().format('YYYY-MM-DD'),
  );

  return (
    <>
      <View py="3" px="2" height={'full'}>
        <Box backgroundColor="white" borderRadius="xl">
          <Text fontSize="lg" bold py="3" px="2">
            Your Next Appointments
          </Text>
          <Divider />
          <AppointmentsList
            data={currentData ?? []}
            navigation={props.navigation}
          />
        </Box>
      </View>

      {/* Can be used to refresh the list of future appointments. */}
      <Fab
        backgroundColor="#f26e13"
        shadow="2"
        onPress={() => refetch()}
        placement={'bottom-right'}
        renderInPortal={false}
        icon={
          <Icon color="#000000" as={MaterialIcons} name="refresh" size="25" />
        }
      />
    </>
  );
};

export default Agenda;

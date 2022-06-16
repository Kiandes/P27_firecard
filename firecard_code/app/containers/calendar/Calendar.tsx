import * as React from 'react';
import {Divider, Fab, Icon, View, Box} from 'native-base';
import {Calendar as Cal, DateData} from 'react-native-calendars/src';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useGetMonthlyAppointmentsQuery} from '../../store/reducers/fhirApi';
import AppointmentsList from '../../components/AppointmentsList';
import {HomeProps} from '../../models/props/AuthorizedStackScreenProps';
import MarkedDatesProps from '../../models/props/MarkedDatesProps';
import {useEffect, useState} from 'react';
import DateUtils from '../../Utils/DateUtils';
import {Appointment} from '@i4mi/fhir_r4';

/**
 * Returns a container that shows a calendar on which a date can be selected and displays a list of appointments for this date.
 * @param {HomeProps} props Props containing Navigation object.
 * @returns {JSX.Element} The desired container with the calendar and the list.
 */
const Calendar = (props: HomeProps): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState(
    DateUtils.displayInvertedDate(new Date()),
  );

  const [markedDates, setMarkedDates] = useState({
    [selectedDate]: {
      selected: true,
      selectedColor: '#f26e13',
    },
  } as MarkedDatesProps);

  const [dailyAppointments, setDailyAppointments] = useState(
    [] as Appointment[],
  );

  // Gets the appointments for the selected month.
  const monthlyAppointments = useGetMonthlyAppointmentsQuery(
    DateUtils.displayYearMonthDate(new Date(selectedDate)),
  );

  const onDayPressed = (dateData: DateData) => {
    setSelectedDate(dateData.dateString);
  };

  const onMonthChange = (dateData: DateData) => {
    if (dateData.month === new Date().getMonth() + 1) {
      setSelectedDate(dateData.dateString);
    } else {
      setSelectedDate(dateData.dateString.slice(0, -2) + '01');
    }
  };

  // Only triggered when selectedDate or monthlyAppointments.currentData changed.
  // Builds a MarkedDatesProps object that contains information to display on the calendar.
  useEffect(() => {
    const md: MarkedDatesProps = {};
    const da: Appointment[] = [];
    const now = DateUtils.displayInvertedDate(new Date(selectedDate));
    for (const appointment of monthlyAppointments.currentData ?? []) {
      const date = DateUtils.displayInvertedDate(
        new Date(appointment.start ?? ''),
      );
      if (date === now) {
        da.push(appointment);
      }
      if (!md[date]) {
        md[date] = {
          marked: true,
          dotColor: '#f26e13',
          selectedColor: '#f26e13',
        };
      }
    }
    if (!md[selectedDate]) {
      md[selectedDate] = {selectedColor: '#f26e13'};
    }
    md[selectedDate].selected = true;
    setMarkedDates(md);
    setDailyAppointments(da);
  }, [selectedDate, monthlyAppointments.currentData]);

  return (
    <>
      <View height="4/6" py="3" px="2">
        <Box backgroundColor="white" borderRadius="xl" py="3" px="2">
          <Cal
            markingType={'dot'}
            firstDay={1}
            enableSwipeMonths={true}
            current={selectedDate}
            markedDates={markedDates}
            onDayPress={onDayPressed}
            onMonthChange={onMonthChange}
            renderArrow={direction => {
              return (
                <Icon
                  as={
                    <MaterialIcons
                      name={
                        direction === 'left' ? 'arrow-back' : 'arrow-forward'
                      }
                    />
                  }
                  size="25"
                  color="#f26e13"
                />
              );
            }}
            hideExtraDays={true}
          />
          <Divider />
          <AppointmentsList
            data={dailyAppointments}
            height="3/6"
            navigation={props.navigation}
          />
        </Box>
      </View>

      {/* Can be used to refresh the list of appointment for the selected month. */}
      <Fab
        backgroundColor="#f26e13"
        shadow="2"
        onPress={() => monthlyAppointments.refetch()}
        placement={'bottom-right'}
        renderInPortal={false}
        marginBottom={70}
        icon={
          <Icon color="#000000" as={MaterialIcons} name="refresh" size="25" />
        }
      />
      {/* Can be used to add a new appointment to the selected date. */}
      <Fab
        backgroundColor="#f26e13"
        shadow="2"
        onPress={() =>
          props.navigation.navigate('CreateEvent', {selectedDate: selectedDate})
        }
        placement={'bottom-right'}
        renderInPortal={false}
        icon={<Icon color="#000000" as={MaterialIcons} name="add" size="25" />}
      />
    </>
  );
};

export default Calendar;

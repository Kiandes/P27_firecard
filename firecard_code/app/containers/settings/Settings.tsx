/**
 *
 */

import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  ScrollView,
  Box,
  Button,
  Divider,
  Column,
  Text,
  FormControl,
  Input,
  HStack,
  Switch,
  VStack,
  Spacer,
  Select,
} from 'native-base';
import * as Calendar from 'expo-calendar';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {fhirApi, useGetPatientQuery} from '../../store/reducers/fhirApi';
import {resetSession} from '../../store/reducers/authSlice';
import {
  resetSettings,
  setCalendarId,
  setCalendarSyncValue,
  setLanguage,
} from '../../store/reducers/settingsSlice';
import UserUtils from '../../Utils/UserUtils';
import DateUtils from '../../Utils/DateUtils';

/**
 * Returns a container that shows the settings of Firecard.
 * @returns {JSX.Element} The desired container.
 */
const Settings = (): JSX.Element => {
  // Dispatch is being used to modify the state of the application.
  const dispatch = useAppDispatch();

  // Gets information about the session from the state.
  const {session} = useAppSelector(state => {
    return state.auth;
  });

  // Gets patient information.
  const {currentData} = useGetPatientQuery(session?.userId as string);

  // Gets settings from state.
  const {isCalendarSyncEnabled, calendarId, language} = useAppSelector(
    state => {
      return state.settings;
    },
  );

  /**
   * Deletes all stored data. This has to effect to disconnect the user.
   */
  const onPressLogout = () => {
    dispatch(fhirApi.util.resetApiState());
    dispatch(resetSession());
    dispatch(resetSettings());
  };

  /**
   * Saves the synchronization choice in the state.
   * @param {boolean} value The value determining if the synchronization is enabled.
   */
  const onValueChangedSynchronize = (value: boolean) => {
    dispatch(setCalendarSyncValue(value));
    setActivateSync(value);
  };

  /**
   * Saves the selected calendar id in the state.
   * @param {string} value The selected calendar id.
   */
  const onValueChangeCalendar = (value: string) => {
    dispatch(setCalendarId(value));
  };

  /**
   * Saves the selected language in the state.
   * @param {string} value The selected language.
   */
  const onValueChangeLanguage = (value: string) => {
    dispatch(setLanguage(value));
  };

  const [showDetails, setShowDetails] = useState(false);
  const [activateSync, setActivateSync] = useState(isCalendarSyncEnabled);
  const [calendars, setCalendars] = useState([] as Calendar.Calendar[]);

  // Executes only when activatesSync is changed.
  useEffect(() => {
    async function getCalendars() {
      const {status} = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendarsList = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT,
        );
        const desiredCalendars: Calendar.Calendar[] = [];
        for (let i = 0; i < calendarsList.length; i++) {
          if (
            calendarsList[i].isVisible &&
            calendarsList[i].allowsModifications
          ) {
            desiredCalendars.push(calendarsList[i]);
          }
        }
        setCalendars(desiredCalendars);
      }
    }

    if (activateSync) {
      getCalendars()
        .then(() => console.log('Calendars loaded!'))
        .catch(() =>
          console.error(
            'The loading of the calendars has encountered an error.',
          ),
        );
    }
  }, [activateSync]);

  return (
    <ScrollView height="full">
      <VStack space="6" py="3" px="2">
        <Box backgroundColor="white" borderRadius="xl">
          <Text fontSize="lg" bold py="3" px="2">
            MIDATA Account
          </Text>
          <Divider />
          <Column py="3" px="2" alignItems="center">
            <Text fontSize="xl">{UserUtils.getName(currentData)}</Text>
            <Text>{UserUtils.getEmailAddress(currentData)}</Text>
            <HStack alignItems="center" space={4}>
              <Text>Show details</Text>
              <Switch
                size="sm"
                value={showDetails}
                onValueChange={setShowDetails}
              />
            </HStack>
            {showDetails ? (
              <>
                <FormControl isReadOnly key="1">
                  <FormControl.Label>Birthdate</FormControl.Label>
                  <Input
                    variant="underlined"
                    value={DateUtils.displayDate(
                      UserUtils.getBirthdate(currentData),
                    )}
                  />
                </FormControl>
                <FormControl isReadOnly key="2">
                  <FormControl.Label>MIDATA ID</FormControl.Label>
                  <Input
                    variant="underlined"
                    value={UserUtils.getMidataId(currentData)}
                  />
                </FormControl>
                <FormControl isReadOnly key="3">
                  <FormControl.Label>FHIR ID</FormControl.Label>
                  <Input
                    variant="underlined"
                    value={UserUtils.getFhirId(currentData)}
                  />
                </FormControl>
              </>
            ) : (
              <></>
            )}
            <Button onPress={onPressLogout} mt="3">
              Logout
            </Button>
          </Column>
        </Box>

        <Box backgroundColor="white" borderRadius="xl">
          <HStack py="3" px="2" justifyContent="space-between">
            <Text fontSize="lg" bold>
              Synchronization
            </Text>
            <Spacer />
            <Switch
              size="md"
              value={activateSync}
              onValueChange={onValueChangedSynchronize}
            />
          </HStack>
          {activateSync ? (
            <>
              <Divider />
              <Column py="3" px="2" alignItems="center">
                <FormControl>
                  <FormControl.Label>
                    Calendar with which to synchronize Firecard
                  </FormControl.Label>
                  <Select
                    selectedValue={calendarId ?? undefined}
                    onValueChange={onValueChangeCalendar}>
                    {calendars.map(item => (
                      <Select.Item
                        label={item.title}
                        value={item.id}
                        key={item.id}
                      />
                    ))}
                  </Select>
                </FormControl>
              </Column>
            </>
          ) : (
            <></>
          )}
        </Box>

        <Box backgroundColor="white" borderRadius="xl">
          <Text fontSize="lg" bold py="3" px="2">
            Language
          </Text>
          <Divider />
          <Column py="3" px="2" alignItems="center">
            <Select
              width="full"
              selectedValue={language}
              onValueChange={onValueChangeLanguage}>
              <Select.Item label="English" value="en" />
            </Select>
          </Column>
        </Box>
      </VStack>
    </ScrollView>
  );
};

export default Settings;

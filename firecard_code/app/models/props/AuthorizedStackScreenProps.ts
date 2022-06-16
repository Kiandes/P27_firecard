import {Appointment} from '@i4mi/fhir_r4';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

/**
 * Type for the route of the AuthorizedStack with the parameters.
 */
export type AuthorizedStackParamList = {
  Home: undefined;
  CreateEvent: {selectedDate: string};
  DisplayEvent: {appointment: Appointment};
};

/**
 * Props for the HomeScreen.
 */
export type HomeProps = NativeStackScreenProps<
  AuthorizedStackParamList,
  'Home'
>;

/**
 * Props for the CreateEvent container.
 */
export type CreateEventProps = NativeStackScreenProps<
  AuthorizedStackParamList,
  'CreateEvent'
>;

/**
 * Props for the DisplayEvent container.
 */
export type DisplayEventProps = NativeStackScreenProps<
  AuthorizedStackParamList,
  'DisplayEvent'
>;

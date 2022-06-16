import {Appointment} from '@i4mi/fhir_r4';
import {HomeProps} from './AuthorizedStackScreenProps';

type AppointmentListPropsType = {
  data: Appointment[];
  height?: string;
};

/**
 * Props for the AppointmentsList component.
 */
interface AppointmentListProps
  extends Omit<HomeProps, 'route'>,
    AppointmentListPropsType {}

export default AppointmentListProps;

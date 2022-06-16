import {Appointment} from '@i4mi/fhir_r4';
import {HomeProps} from './AuthorizedStackScreenProps';

type AppointmentListItemPropsType = {
  appointment: Appointment;
};

/**
 * Props for the AppointmentsListItem component.
 */
interface AppointmentListItemProps
  extends Omit<HomeProps, 'route'>,
    AppointmentListItemPropsType {}

export default AppointmentListItemProps;

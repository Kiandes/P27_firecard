import {AppointmentParticipant} from '@i4mi/fhir_r4';
import {DisplayEventProps} from './AuthorizedStackScreenProps';

type ParticipantsListItemPropsType = {
  appointmentParticipant: AppointmentParticipant;
};

/**
 * Props for the ParticipantsListItem component.
 */
interface ParticipantsListItemProps
  extends Omit<DisplayEventProps, 'route'>,
    ParticipantsListItemPropsType {}

export default ParticipantsListItemProps;

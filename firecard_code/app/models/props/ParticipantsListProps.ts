import {AppointmentParticipant} from '@i4mi/fhir_r4';
import {DisplayEventProps} from './AuthorizedStackScreenProps';

type ParticipantsListPropsType = {
  data: AppointmentParticipant[];
};

/**
 * Props for the ParticipantsList component.
 */
interface ParticipantsListProps
  extends Omit<DisplayEventProps, 'route'>,
    ParticipantsListPropsType {}

export default ParticipantsListProps;

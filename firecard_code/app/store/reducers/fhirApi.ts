import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithRefresh} from '../api/refreshBaseQuery';
import {Appointment, Bundle, Patient} from '@i4mi/fhir_r4';
import EventUtils from '../../Utils/EventUtils';

/**
 * Creates a RTK API to handles HTTP requests through Redux.
 * @type {Api<(args: string, api: BaseQueryApi, extraOptions: {}) => MaybePromise<QueryReturnValue<unknown, unknown, {}>>, {getFutureAppointments: ([CastAny<BaseQueryResult<BaseQuery>, {}>] extends [NEVER] ? never : EndpointDefinitionWithQuery<string, BaseQuery, Appointment[]> & {'[resultType]'?: Appointment[], '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & QueryExtraOptions<TagTypes, Appointment[], string, BaseQuery, ReducerPath>) | (EndpointDefinitionWithQueryFn<string, BaseQuery, Appointment[]> & {'[resultType]'?: Appointment[], '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & QueryExtraOptions<TagTypes, Appointment[], string, BaseQuery, ReducerPath>), putAppointment: ([CastAny<BaseQueryResult<BaseQuery>, {}>] extends [NEVER] ? never : EndpointDefinitionWithQuery<Partial<Appointment> & Pick<Appointment, "id">, BaseQuery, Appointment> & {'[resultType]'?: Appointment, '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & MutationExtraOptions<TagTypes, Appointment, Partial<Appointment> & Pick<Appointment, "id">, BaseQuery, ReducerPath>) | (EndpointDefinitionWithQueryFn<Partial<Appointment> & Pick<Appointment, "id">, BaseQuery, Appointment> & {'[resultType]'?: Appointment, '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & MutationExtraOptions<TagTypes, Appointment, Partial<Appointment> & Pick<Appointment, "id">, BaseQuery, ReducerPath>), getMonthlyAppointments: ([CastAny<BaseQueryResult<BaseQuery>, {}>] extends [NEVER] ? never : EndpointDefinitionWithQuery<string, BaseQuery, Appointment[]> & {'[resultType]'?: Appointment[], '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & QueryExtraOptions<TagTypes, Appointment[], string, BaseQuery, ReducerPath>) | (EndpointDefinitionWithQueryFn<string, BaseQuery, Appointment[]> & {'[resultType]'?: Appointment[], '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & QueryExtraOptions<TagTypes, Appointment[], string, BaseQuery, ReducerPath>), postAppointment: ([CastAny<BaseQueryResult<BaseQuery>, {}>] extends [NEVER] ? never : EndpointDefinitionWithQuery<Omit<Appointment, "id">, BaseQuery, Appointment> & {'[resultType]'?: Appointment, '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & MutationExtraOptions<TagTypes, Appointment, Omit<Appointment, "id">, BaseQuery, ReducerPath>) | (EndpointDefinitionWithQueryFn<Omit<Appointment, "id">, BaseQuery, Appointment> & {'[resultType]'?: Appointment, '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & MutationExtraOptions<TagTypes, Appointment, Omit<Appointment, "id">, BaseQuery, ReducerPath>), getPatient: ([CastAny<BaseQueryResult<BaseQuery>, {}>] extends [NEVER] ? never : EndpointDefinitionWithQuery<string, BaseQuery, Patient> & {'[resultType]'?: Patient, '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & QueryExtraOptions<TagTypes, Patient, string, BaseQuery, ReducerPath>) | (EndpointDefinitionWithQueryFn<string, BaseQuery, Patient> & {'[resultType]'?: Patient, '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & QueryExtraOptions<TagTypes, Patient, string, BaseQuery, ReducerPath>)}, string, string, any> | Api<(args: string, api: BaseQueryApi, extraOptions: {}) => MaybePromise<QueryReturnValue<unknown, unknown, {}>>, {getFutureAppointments: ([CastAny<BaseQueryResult<BaseQuery>, {}>] extends [NEVER] ? never : EndpointDefinitionWithQuery<string, BaseQuery, Appointment[]> & {'[resultType]'?: Appointment[], '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & QueryExtraOptions<TagTypes, Appointment[], string, BaseQuery, ReducerPath>) | (EndpointDefinitionWithQueryFn<string, BaseQuery, Appointment[]> & {'[resultType]'?: Appointment[], '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & QueryExtraOptions<TagTypes, Appointment[], string, BaseQuery, ReducerPath>), putAppointment: ([CastAny<BaseQueryResult<BaseQuery>, {}>] extends [NEVER] ? never : EndpointDefinitionWithQuery<Partial<Appointment> & Pick<Appointment, "id">, BaseQuery, Appointment> & {'[resultType]'?: Appointment, '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & MutationExtraOptions<TagTypes, Appointment, Partial<Appointment> & Pick<Appointment, "id">, BaseQuery, ReducerPath>) | (EndpointDefinitionWithQueryFn<Partial<Appointment> & Pick<Appointment, "id">, BaseQuery, Appointment> & {'[resultType]'?: Appointment, '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & MutationExtraOptions<TagTypes, Appointment, Partial<Appointment> & Pick<Appointment, "id">, BaseQuery, ReducerPath>), getMonthlyAppointments: ([CastAny<BaseQueryResult<BaseQuery>, {}>] extends [NEVER] ? never : EndpointDefinitionWithQuery<string, BaseQuery, Appointment[]> & {'[resultType]'?: Appointment[], '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & QueryExtraOptions<TagTypes, Appointment[], string, BaseQuery, ReducerPath>) | (EndpointDefinitionWithQueryFn<string, BaseQuery, Appointment[]> & {'[resultType]'?: Appointment[], '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & QueryExtraOptions<TagTypes, Appointment[], string, BaseQuery, ReducerPath>), postAppointment: ([CastAny<BaseQueryResult<BaseQuery>, {}>] extends [NEVER] ? never : EndpointDefinitionWithQuery<Omit<Appointment, "id">, BaseQuery, Appointment> & {'[resultType]'?: Appointment, '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & MutationExtraOptions<TagTypes, Appointment, Omit<Appointment, "id">, BaseQuery, ReducerPath>) | (EndpointDefinitionWithQueryFn<Omit<Appointment, "id">, BaseQuery, Appointment> & {'[resultType]'?: Appointment, '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & MutationExtraOptions<TagTypes, Appointment, Omit<Appointment, "id">, BaseQuery, ReducerPath>), getPatient: ([CastAny<BaseQueryResult<BaseQuery>, {}>] extends [NEVER] ? never : EndpointDefinitionWithQuery<string, BaseQuery, Patient> & {'[resultType]'?: Patient, '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & QueryExtraOptions<TagTypes, Patient, string, BaseQuery, ReducerPath>) | (EndpointDefinitionWithQueryFn<string, BaseQuery, Patient> & {'[resultType]'?: Patient, '[baseQuery]'?: BaseQuery} & NonOptionalKeys<Parameters<BaseQuery>[2]> extends never ? {extraOptions?: BaseQueryExtraOptions<BaseQuery>} : {extraOptions: BaseQueryExtraOptions<BaseQuery>} & QueryExtraOptions<TagTypes, Patient, string, BaseQuery, ReducerPath>)}, string, string, typeof coreModuleName>}
 */
export const fhirApi = createApi({
  reducerPath: 'fhirApi',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['Appointment'],
  endpoints: builder => ({
    getPatient: builder.query<Patient, string>({
      query: id => `/Patient/${id}`,
    }),
    getMonthlyAppointments: builder.query<Appointment[], string>({
      query: date =>
        `/Appointment?date=eq${date}&_sort=date&status=proposed,pending,booked,arrived,checked-in,waitlist`,
      transformResponse: (response: Bundle) => {
        return EventUtils.bundleToAppointmentArray(response);
      },
      providesTags: ['Appointment'],
    }),
    getFutureAppointments: builder.query<Appointment[], string>({
      query: date =>
        `/Appointment?date=ge${date}&_sort=date&status=proposed,pending,booked,arrived,checked-in,waitlist`,
      transformResponse: (response: Bundle) => {
        return EventUtils.bundleToAppointmentArray(response);
      },
      providesTags: ['Appointment'],
    }),
    postAppointment: builder.mutation<Appointment, Omit<Appointment, 'id'>>({
      query: body => ({
        url: '/Appointment',
        method: 'POST',
        body: JSON.stringify(body),
      }),
      invalidatesTags: ['Appointment'],
    }),
    putAppointment: builder.mutation<
      Appointment,
      Partial<Appointment> & Pick<Appointment, 'id'>
    >({
      query: body => ({
        url: `/Appointment/${body.id}`,
        method: 'PUT',
        body: JSON.stringify(body),
      }),
      invalidatesTags: ['Appointment'],
    }),
  }),
});

export const {
  useGetPatientQuery,
  useGetFutureAppointmentsQuery,
  useGetMonthlyAppointmentsQuery,
  usePostAppointmentMutation,
  usePutAppointmentMutation,
} = fhirApi;

import {BaseQueryFn, fetchBaseQuery} from '@reduxjs/toolkit/query';
import {RootState} from '../index';
import {refresh} from 'react-native-app-auth';
import {resetSession, setSession} from '../reducers/authSlice';
import SessionUtils from '../../Utils/SessionUtils';
import {Session} from '../../models/Session';

/**
 * Base Query that will be used in Firecard. It contains the headers to uses MIDATA properly.
 */
const baseQuery = fetchBaseQuery({
  baseUrl: SessionUtils.OAUTH_CONFIG.issuer,
  prepareHeaders: (headers, {getState}) => {
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/fhir+json; fhirVersion=4.0');
    const session = (getState() as RootState).auth.session;
    if (session && session.refreshToken) {
      const accessToken = session.accessToken;
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

/**
 * Middleware for queries. Handles the cases when token is expired.
 * @returns {Promise<{error: {status: number, data: unknown} | {status: "FETCH_ERROR", data?: undefined, error: string} | {status: "PARSING_ERROR", originalStatus: number, data: string, error: string} | {status: "CUSTOM_ERROR", data?: unknown, error: string}, data?: undefined, meta?: FetchBaseQueryMeta} | {error?: undefined, data: unknown, meta?: FetchBaseQueryMeta}>}
 */
export const baseQueryWithRefresh: BaseQueryFn<string> = async (
  args,
  api,
  extraOptions,
) => {
  let session = (api.getState() as RootState).auth.session;
  if (SessionUtils.isSessionExpired(session as Session)) {
    console.log('Session is expired');
    session = (api.getState() as RootState).auth.session;
    if (session && session.refreshToken) {
      try {
        const refreshResult = await refresh(SessionUtils.OAUTH_CONFIG, {
          refreshToken: session.refreshToken,
        });
        const newSession: Session = {
          accessToken: refreshResult.accessToken,
          accessTokenExpirationDate: refreshResult.accessTokenExpirationDate,
          refreshToken: refreshResult.refreshToken,
          tokenType: refreshResult.tokenType,
          userId: session.userId,
        };
        api.dispatch(setSession(newSession));
        return baseQuery(args, api, extraOptions);
      } catch (error) {
        console.log(error);
        api.dispatch(resetSession());
      }
    } else {
      console.log('Non valid session found.');
      api.dispatch(resetSession());
    }
  } else {
    return baseQuery(args, api, extraOptions);
  }
};

import Config from 'react-native-config';
import {AuthConfiguration, authorize} from 'react-native-app-auth';

import {AppDispatch} from '../store';
import {resetSession, setSession} from '../store/reducers/authSlice';
import {Session} from '../models/Session';

/** Class providing utility methods for {Session} objects. */
class SessionUtils {
  /**
   * Configuration object form OAuth2 authentication and authorization.
   * Read from the .env configuration file.
   * @type {AuthConfiguration}
   */
  static readonly OAUTH_CONFIG: AuthConfiguration = {
    issuer: Config.host + '/fhir',
    clientId: Config.client_id,
    redirectUrl: Config.redirect_URL,
    scopes: ['user/*.*'],
    serviceConfiguration: {
      authorizationEndpoint: Config.host + Config.auth_endpoint,
      tokenEndpoint: Config.host + Config.token_endpoint,
    },
    additionalParameters: {},
  };

  /**
   * Returns true if the session is expired.
   *
   * @param {Session} session The session whose expiration state is desired.
   * @returns {boolean} A boolean representing the expiration state.
   */
  static isSessionExpired(session: Session) {
    return new Date(session.accessTokenExpirationDate) < new Date();
  }

  /**
   * Returns true if the session is valid.
   *
   * @param {Session | null} session The session whose validity state is desired.
   * @returns {boolean} A boolean representing the validity state.
   */
  static isSessionValid(session: Session | null) {
    return session !== null;
  }

  /**
   * Starts the OAuth2 authentication and authorization process.
   *
   * @param {AppDispatch} dispatch Dispatch function to modify the state.
   */
  static login(dispatch: AppDispatch) {
    authorize(this.OAUTH_CONFIG)
      .then(authorizeResult => {
        const newSession: Session = {
          accessToken: authorizeResult.accessToken,
          accessTokenExpirationDate: authorizeResult.accessTokenExpirationDate,
          refreshToken: authorizeResult.refreshToken,
          tokenType: authorizeResult.tokenType,
          userId: authorizeResult.tokenAdditionalParameters?.patient,
        };

        dispatch(setSession(newSession));
      })
      .catch(error => {
        console.error(error);

        dispatch(resetSession());
      });
  }
}

export default SessionUtils;

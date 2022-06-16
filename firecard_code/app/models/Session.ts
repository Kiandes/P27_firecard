/**
 * Type for the session data. Class is not used because a class should not be stored in the state.
 */
export type Session = {
  accessToken: string;
  accessTokenExpirationDate: string;
  refreshToken: string | null;
  tokenType: string;
  userId: string | undefined;
};

/**
 * Type for the authSlice state.
 */
export type AuthState = {
  session: Session | null;
};

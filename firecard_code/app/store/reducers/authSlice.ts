import {createSlice} from '@reduxjs/toolkit';
import {AuthState, Session} from '../../Models/Session';

/**
 * Redux slice for the authentication. Stores the session.
 * @type {Slice<AuthState, {resetSession(state): void, setSession(state, action: {payload: Session}): void}, string>}
 */
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    session: null,
  } as AuthState,
  reducers: {
    setSession(state, action: {payload: Session}){
      state.session = action.payload;
    },
    resetSession(state) {
      state.session = null;
    },
  },
});

export const {setSession, resetSession} = authSlice.actions;
export default authSlice.reducer;

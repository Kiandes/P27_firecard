import {createSlice} from '@reduxjs/toolkit';
import {SettingsState} from '../../models/Settings';

/**
 * Redux slice for the settings. Stores the settings.
 * @type {Slice<SettingsState, {setCalendarSyncValue(state, action): void, resetSettings(state): void, setCalendarId(state, action): void, setLanguage(state, action): void}, string>}
 */
const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    isCalendarSyncEnabled: false,
    calendarId: null,
    language: 'en',
  } as SettingsState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
    setCalendarSyncValue(state, action) {
      state.isCalendarSyncEnabled = action.payload;
    },
    setCalendarId(state, action) {
      state.calendarId = action.payload;
    },
    resetSettings(state) {
      state.isCalendarSyncEnabled = false;
      state.calendarId = null;
      state.language = 'en';
    },
  },
});

export const {setLanguage, setCalendarSyncValue, setCalendarId, resetSettings} =
  settingsSlice.actions;
export default settingsSlice.reducer;

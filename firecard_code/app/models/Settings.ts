/**
 * Type for the settingsSlice state.
 */
export type SettingsState = {
  isCalendarSyncEnabled: boolean;
  calendarId: string | null;
  language: 'en' | 'fr' | 'de' | 'it';
};

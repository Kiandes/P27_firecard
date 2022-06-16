import {combineReducers, configureStore} from '@reduxjs/toolkit';
// @ts-ignore
import createSensistiveStorage from 'redux-persist-sensitive-storage';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import {setupListeners} from '@reduxjs/toolkit/query';
import authSlice from './reducers/authSlice';
import settingsSlice from './reducers/settingsSlice';
import {fhirApi} from './reducers/fhirApi';

/**
 * The list of reducers.
 * @type {Reducer<CombinedState<unknown>>}
 */
const reducers = combineReducers({
  auth: authSlice,
  settings: settingsSlice,
  [fhirApi.reducerPath]: fhirApi.reducer,
});

/**
 * Storage creation. Attention: sharedPreferences should be encrypted on Android, because they can be read by other applications.
 * redux-persist-sensitive-storage should update its code to use a newer version of react-native-sensitive-info, because current
 * version do not support encryption.
 */
const storage = createSensistiveStorage({
  keychainService: 'firecard',
  sharedPreferencesName: 'firecard',
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

/**
 * The store of Firecard, that manages the state.
 * @type {EnhancedStore<EmptyObject & PersistPartial, AnyAction, MiddlewareArray<[...ExcludeFromTuple<[ThunkMiddlewareFor<EmptyObject & PersistPartial, {serializableCheck: {ignoredActions: ("persist/FLUSH" | "persist/REHYDRATE" | "persist/PAUSE" | "persist/PERSIST" | "persist/PURGE" | "persist/REGISTER")[]}}>], never>, ...any]>>}
 */
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(fhirApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;

import * as React from 'react';
import {Provider} from 'react-redux';
import store, {persistor} from '../store';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {NativeBaseProvider, StatusBar} from 'native-base';
import RNBootSplash from 'react-native-bootsplash';
import {PersistGate} from 'redux-persist/integration/react';

import Navigation from './Navigation';

/**
 * Returns the basis container of the application. The providers are declared here.
 * @returns {JSX.Element} The basis container.
 */
const App = (): JSX.Element => {
  return (
    <>
      {/* Provides the redux store. */}
      <Provider store={store}>
        {/* Provides the persistor for redux. */}
        <PersistGate persistor={persistor}>
          {/* Provides React-Navigation to the app. */}
          <NavigationContainer
            theme={NavigationTheme}
            onReady={() => RNBootSplash.hide({fade: true})}>
            {/* Provides NativeBase to the app. */}
            <NativeBaseProvider>
              <StatusBar
                backgroundColor={'#bda600'}
                barStyle={'dark-content'}
              />
              {/* Uses our custom navigation container.*/}
              <Navigation />
            </NativeBaseProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export const NavigationTheme: Theme = {
  dark: false,
  colors: {
    primary: 'rgba(0, 0, 0, 0)',
    background: 'rgb(225, 226, 225)',
    card: 'rgb(244, 215, 43)',
    text: 'rgb(0, 0, 0)',
    border: 'rgba(0, 0, 0, 0)',
    notification: 'rgba(0, 0, 0, 0)',
  },
};

export default App;

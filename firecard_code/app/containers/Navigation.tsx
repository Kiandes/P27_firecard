import * as React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useAppSelector} from '../hooks';
import SessionUtils from '../Utils/SessionUtils';

import LoginScreen from './login/Login';
import CalendarScreen from './calendar/Calendar';
import CreateEventScreen from './event/CreateEvent';
import DisplayEventScreen from './event/DisplayEvent';
import AgendaScreen from './agenda/Agenda';
import SettingsScreen from './settings/Settings';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {Icon} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AuthorizedStackParamList} from '../models/props/AuthorizedStackScreenProps';

const AuthorizedStack = createNativeStackNavigator<AuthorizedStackParamList>();
const UnauthorizedStack = createNativeStackNavigator();
const HomeTabs = createBottomTabNavigator();

/**
 * Returns the tab navigator of the application.
 * @returns {JSX.Element} The tab navigator.
 */
const HomeTabsScreen = (): JSX.Element => {
  return (
    <HomeTabs.Navigator screenOptions={TabsOptions}>
      <HomeTabs.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{title: 'Firecard'}}
      />
      <HomeTabs.Screen name="Agenda" component={AgendaScreen} />
      <HomeTabs.Screen name="Settings" component={SettingsScreen} />
    </HomeTabs.Navigator>
  );
};

/**
 * Returns a container that defines the navigators and uses the different containers. Has to be put to App.tsx.
 * @returns {JSX.Element} The navigation container.
 */
const Navigation = (): JSX.Element => {
  // Gets session information from state.
  const {session} = useAppSelector(state => state.auth);

  return (
    <>
      {/* Checks if the user is connected. */}
      {SessionUtils.isSessionValid(session) ? (
        <AuthorizedStack.Navigator>
          <AuthorizedStack.Screen
            name="Home"
            component={HomeTabsScreen}
            options={{headerShown: false}}
          />
          <AuthorizedStack.Screen
            name="CreateEvent"
            component={CreateEventScreen}
            options={{title: 'Create event'}}
          />
          <AuthorizedStack.Screen
            name="DisplayEvent"
            component={DisplayEventScreen}
            options={{title: 'Display event'}}
          />
        </AuthorizedStack.Navigator>
      ) : (
        <UnauthorizedStack.Navigator>
          <UnauthorizedStack.Screen name="Welcome" component={LoginScreen} />
        </UnauthorizedStack.Navigator>
      )}
    </>
  );
};

const TabsOptions = (props: {route: RouteProp<ParamListBase, string>}) => {
  let style: BottomTabNavigationOptions = {};

  style.tabBarIcon = ({color, size}) => {
    let iconName = 'circle';

    switch (props.route.name) {
      case 'Calendar':
        iconName = 'calendar-today';
        break;
      case 'Agenda':
        iconName = 'view-list';
        break;
      case 'Settings':
        iconName = 'settings';
        break;
    }
    return (
      <Icon as={<MaterialIcons name={iconName} />} size={size} color={color} />
    );
  };
  style.tabBarActiveTintColor = '#f26e13';
  style.tabBarInactiveTintColor = '#000000';
  style.tabBarActiveBackgroundColor = '#ffff64';
  style.tabBarInactiveBackgroundColor = '#ffff64';

  return style;
};

export default Navigation;

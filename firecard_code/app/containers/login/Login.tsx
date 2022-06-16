/**
 *
 */

import * as React from 'react';
import {Button, Text, View, Divider, Box, Column} from 'native-base';
import {useAppDispatch} from '../../hooks';
import SessionUtils from '../../Utils/SessionUtils';

/**
 * Returns a container that shows the login page of Firecard.
 * @returns {JSX.Element} The desired login container.
 */
const Login = (): JSX.Element => {
  // Dispatch is being used to modify the state of the application.
  const dispatch = useAppDispatch();

  /**
   * Calls login function that starts the OAuth2 process.
   */
  const onClickLogin = () => {
    SessionUtils.login(dispatch);
  };

  return (
    <View py="3" px="2">
      <Box backgroundColor="white" borderRadius="xl">
        <Text fontSize="lg" bold py="3" px="2">
          Welcome to Firecard!
        </Text>
        <Divider />
        <Column py="3" px="2" alignItems="center">
          <Text textAlign="justify">
            Firecard is a MIDATA cloud-based medical calendar project. The
            project is part of Alex Fahrni's bachelor thesis.
          </Text>
          <Button onPress={onClickLogin} mt="3">
            Login
          </Button>
        </Column>
      </Box>
    </View>
  );
};

export default Login;

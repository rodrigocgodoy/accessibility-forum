import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Forum from '../pages/Forum';
import Profile from '../pages/Profile';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="Forum"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Forum" component={Forum} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

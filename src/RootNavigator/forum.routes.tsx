import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Forum from '../pages/Forum';
import Details from '../pages/Details';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="Forum"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Forum" component={Forum} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

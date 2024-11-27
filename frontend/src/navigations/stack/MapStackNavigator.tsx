import {mapNavigations} from '@/constants';
import {MapHomeScreen} from '@/screens';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

export type MapStackParamList = {
  [mapNavigations.MAP_HOME]: undefined;
};

export function MapStackNavgator() {
  const Stack = createStackNavigator<MapStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={mapNavigations.MAP_HOME}
        component={MapHomeScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

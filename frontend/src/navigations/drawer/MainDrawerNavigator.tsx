import {CalendarHomeScreen, FeedHomeScreen, MapHomeScreen} from '@/screens';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';

export function MainDrawerNavigator() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MapHome" component={MapHomeScreen} />
      <Drawer.Screen name="FeedHome" component={FeedHomeScreen} />
      <Drawer.Screen name="Calendar" component={CalendarHomeScreen} />
    </Drawer.Navigator>
  );
}

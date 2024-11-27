import {CalendarHomeScreen, FeedHomeScreen} from '@/screens';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {MapStackNavgator, MapStackParamList} from '../stack/MapStackNavigator';
import {MainDrawerNavigations} from '@/constants';
import {NavigatorScreenParams} from '@react-navigation/native';

export type DrawerParamList = {
  [MainDrawerNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [MainDrawerNavigations.FEED]: undefined;
  [MainDrawerNavigations.CALENDAR]: undefined;
};

export function MainDrawerNavigator() {
  const Drawer = createDrawerNavigator<DrawerParamList>();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}>
      <Drawer.Screen
        name={MainDrawerNavigations.HOME}
        component={MapStackNavgator}
        options={{
          title: '홈',
        }}
      />
      <Drawer.Screen
        name={MainDrawerNavigations.FEED}
        component={FeedHomeScreen}
        options={{
          title: '피드',
        }}
      />
      <Drawer.Screen
        name={MainDrawerNavigations.CALENDAR}
        component={CalendarHomeScreen}
        options={{
          title: '캘린더',
        }}
      />
    </Drawer.Navigator>
  );
}

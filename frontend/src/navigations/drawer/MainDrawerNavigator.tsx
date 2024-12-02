import {CalendarHomeScreen} from '@/screens';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {MapStackNavgator, MapStackParamList} from '../stack/MapStackNavigator';
import {colors, mainDrawerNavigations} from '@/constants';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dimensions} from 'react-native';
import {CustomDrawerContent} from './CustomDrawerContent';
import {
  FeedStackNavigator,
  FeedStackParamList,
} from '../stack/FeedStackNavigator';

export type DrawerParamList = {
  [mainDrawerNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainDrawerNavigations.FEED]: NavigatorScreenParams<FeedStackParamList>;
  [mainDrawerNavigations.CALENDAR]: undefined;
};

const DrawerIcons = (
  route: RouteProp<DrawerParamList, keyof DrawerParamList>,
  focusted: boolean,
) => {
  let iconName = '';

  switch (route.name) {
    case mainDrawerNavigations.HOME: {
      iconName = 'location-on';
      break;
    }
    case mainDrawerNavigations.FEED: {
      iconName = 'book';
      break;
    }
    case mainDrawerNavigations.CALENDAR: {
      iconName = 'event-note';
      break;
    }
  }

  return (
    <MaterialIcons
      name={iconName}
      color={focusted ? colors.BLACK : colors.GRAY_500}
      size={25}
    />
  );
};

export function MainDrawerNavigator() {
  const Drawer = createDrawerNavigator<DrawerParamList>();

  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={({route}) => ({
        headerShown: false,
        drawerType: 'front',
        drawerIcon: ({focused}) => DrawerIcons(route, focused),
        drawerActiveTintColor: colors.BLACK,
        drawerInactiveTintColor: colors.GRAY_500,
        drawerActiveBackgroundColor: colors.PINK_200,
        drawerInactiveBackgroundColor: colors.GRAY_100,
        drawerStyle: {
          width: Dimensions.get('screen').width * 0.6,
          backgroundColor: colors.WHITE,
        },
        drawerLabelStyle: {
          fontWeight: '600',
        },
      })}>
      <Drawer.Screen
        name={mainDrawerNavigations.HOME}
        component={MapStackNavgator}
        options={{
          title: '홈',
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name={mainDrawerNavigations.FEED}
        component={FeedStackNavigator}
        options={{
          title: '피드',
        }}
      />
      <Drawer.Screen
        name={mainDrawerNavigations.CALENDAR}
        component={CalendarHomeScreen}
        options={{
          title: '캘린더',
        }}
      />
    </Drawer.Navigator>
  );
}

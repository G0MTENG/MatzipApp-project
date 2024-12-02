import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {colors, feedNavigations} from '@/constants';
import {
  FeedDetailScreen,
  FeedFavoriteScreen,
  FeedHomeScreen,
  FeedSearchScreen,
} from '@/screens';
import {FeedHomeHeaderLeft} from '@/components';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: {
    id: number;
  };
  [feedNavigations.SEARCH]: undefined;
  [feedNavigations.FAVORITE]: undefined;
};

export function FeedStackNavigator() {
  const Stack = createStackNavigator<FeedStackParamList>();
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
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={({navigation}) => ({
          headerTitle: '피드',
          headerLeft: () => FeedHomeHeaderLeft(navigation),
        })}
      />
      <Stack.Screen
        name={feedNavigations.FEED_DETAIL}
        component={FeedDetailScreen}
        options={{
          headerTitle: '',
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.GRAY_100,
          },
        }}
      />
      <Stack.Screen
        name={feedNavigations.SEARCH}
        component={FeedSearchScreen}
        options={{
          headerTitle: '로그인',
        }}
      />
      <Stack.Screen
        name={feedNavigations.FAVORITE}
        component={FeedFavoriteScreen}
        options={{
          headerTitle: '회원가입',
        }}
      />
    </Stack.Navigator>
  );
}

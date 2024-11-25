import React from 'react';
import {AuthStackNavigator, MainDrawerNavigator} from '@/navigations';

export function RootNavigator() {
  const isLoggedIn = false;

  return <>{isLoggedIn ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}

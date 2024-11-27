import React from 'react';
import {AuthStackNavigator, MainDrawerNavigator} from '@/navigations';
import {useAuth} from '@/hooks';

export function RootNavigator() {
  const {isLogin} = useAuth();

  return <>{isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}

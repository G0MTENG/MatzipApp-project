/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {RootNavigator} from './src/navigations/root/RootNavigator';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '@/apis/queryClient';

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

// <div>텍스트</div>
// <View><Text>텍스트</Text></View> => View는 HTML의 div 역할을 하지만 바로 텍스트를 넣을 수 없음.

export default App;

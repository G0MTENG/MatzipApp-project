import {CustomButton} from '@/components';
import {useAuth} from '@/hooks';
import React from 'react';
import {Text, View} from 'react-native';

export function MapHomeScreen() {
  const {logoutMuatation} = useAuth();

  return (
    <View>
      <Text>맵 스크린</Text>
      <CustomButton
        label="로그아웃"
        onPress={() => logoutMuatation.mutate(null)}
      />
    </View>
  );
}

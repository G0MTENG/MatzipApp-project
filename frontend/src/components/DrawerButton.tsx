import React from 'react';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DrawerParamList, MapStackParamList} from '@/navigations';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {colors} from '@/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<DrawerParamList>
>;

export const DrawerButton = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  return (
    <Pressable
      style={[styles.drawerButton, {top: inset.top || 20}]}
      onPress={navigation.openDrawer}>
      <Ionicons name="menu-outline" color={colors.WHITE} size={25} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  drawerButton: {
    position: 'absolute',
    left: 0,
    top: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    elevation: 4,
  },
});

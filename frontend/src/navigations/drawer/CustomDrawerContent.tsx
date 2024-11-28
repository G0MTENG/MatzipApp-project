import {ResponseProfile} from '@/apis';
import {colors} from '@/constants';
import {useAuth} from '@/hooks';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {getProfileQuery} = useAuth();
  const {email, nickname, imageUri, kakaoImageUri} =
    getProfileQuery.data as Pick<
      ResponseProfile,
      'email' | 'nickname' | 'imageUri' | 'kakaoImageUri'
    >;

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          <View style={styles.userImageContainer}>
            {!imageUri && !kakaoImageUri && (
              <Image
                style={styles.userImage}
                source={require('@/assets/user-default-image.png')}
              />
            )}
            {imageUri && (
              <Image style={styles.userImage} source={{uri: imageUri}} />
            )}
            {!imageUri && kakaoImageUri && (
              <Image style={styles.userImage} source={{uri: kakaoImageUri}} />
            )}
          </View>
          <Text style={styles.nameText}>{nickname ?? email}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors.WHITE,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    marginHorizontal: 15,
  },
  nameText: {
    color: colors.BLACK,
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  userImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
});

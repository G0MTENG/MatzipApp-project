import {DrawerButton} from '@/components';
import React, {useRef} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {colors} from '@/constants';
import {useUserLocation} from '@/hooks/useUserLocation';
import {usePermission} from '@/hooks';

export function MapHomeScreen() {
  const {userLocation, isUserLocationError} = useUserLocation();
  usePermission('LOCATION');
  const mapRef = useRef<MapView>(null);

  console.log(userLocation, isUserLocationError);

  const handlePressUserLocation = () => {
    if (
      isUserLocationError ||
      typeof userLocation?.latitude !== 'number' ||
      typeof userLocation?.longitude !== 'number'
    ) {
      // 에러 메시지를 표시
      return;
    }

    mapRef.current?.animateToRegion(
      {
        ...userLocation,
        longitudeDelta: 0.0922,
        latitudeDelta: 0.0421,
      },
      1000,
    );
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
      />
      <DrawerButton />
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  mapButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    elevation: 2,
  },
});

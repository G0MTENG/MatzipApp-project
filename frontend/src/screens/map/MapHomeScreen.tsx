import {DrawerButton, CustomMarker, Navigation} from '@/components';
import React, {useRef, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import MapView, {
  Callout,
  LatLng,
  LongPressEvent,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {alertsOptions, colors, mapNavigations} from '@/constants';
import {useUserLocation} from '@/hooks/useUserLocation';
import {usePermission} from '@/hooks';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {mapStyle} from '@/style';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useGetMarkers} from '@/hooks/queries/useGetMarkers';

export function MapHomeScreen() {
  const {userLocation, isUserLocationError} = useUserLocation();
  const navigation = useNavigation<Navigation>();
  usePermission('LOCATION');
  const mapRef = useRef<MapView>(null);
  const [selectLocation, setSelectLocation] = useState<LatLng | null>(null);
  const {data: markers = []} = useGetMarkers();

  const handleLongPressMapView = ({nativeEvent}: LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate);
    console.log('coordinate', nativeEvent.coordinate);
  };

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

  const handlePressAddPost = () => {
    if (!selectLocation) {
      return Alert.alert(
        alertsOptions.NOT_SELECTED_LOCATION.TITLE,
        alertsOptions.NOT_SELECTED_LOCATION.DESCRIPTION,
      );
    }

    navigation.navigate(mapNavigations.ADD_POST, {
      location: selectLocation,
    });
    setSelectLocation(null);
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
        customMapStyle={mapStyle}
        onLongPress={handleLongPressMapView}>
        {markers.map(({id, color, score, ...coordinate}) => (
          <CustomMarker
            key={id}
            color={color}
            score={score}
            coordinate={coordinate}
          />
        ))}
        {selectLocation && (
          <Callout>
            <CustomMarker color="GREEN" coordinate={selectLocation} />
          </Callout>
        )}
      </MapView>
      <DrawerButton />
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressAddPost}>
          <MaterialIcons name="add" color={colors.WHITE} size={25} />
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <MaterialIcons name="gps-fixed" color={colors.WHITE} size={25} />
        </Pressable>
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

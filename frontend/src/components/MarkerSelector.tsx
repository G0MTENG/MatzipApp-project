import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {MarkerView} from './CustomMarker';
import {MarkerColor} from '@/types';
import {colors} from '@/constants';

type MarkerSelectorProps = {
  score: number;
  markerColor: MarkerColor;
  setMarkerColor: (marker: MarkerColor) => void;
};

export const MarkerSelector = ({
  markerColor,
  setMarkerColor,
  score,
}: MarkerSelectorProps) => {
  const markerColors: MarkerColor[] = [
    'RED',
    'YELLOW',
    'GREEN',
    'BLUE',
    'PURPLE',
  ];

  const handleChangeMarker = (color: MarkerColor) => {
    setMarkerColor(color);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.markerLabel}>마커 선택</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.markerInputScroll}>
          {markerColors.map(color => (
            <Pressable
              key={color}
              style={[
                styles.markerBox,
                color === markerColor && styles.pressedMarker,
              ]}
              onPress={() => handleChangeMarker(color)}>
              <MarkerView score={score} color={color} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: 15,
  },
  markerInputScroll: {
    flexDirection: 'row',
    gap: 20,
  },
  markerLabel: {
    marginBottom: 15,
    color: colors.GRAY_700,
  },
  markerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: colors.GRAY_100,
    borderRadius: 6,
  },
  pressedMarker: {
    borderWidth: 2,
    borderColor: colors.RED_500,
  },
});

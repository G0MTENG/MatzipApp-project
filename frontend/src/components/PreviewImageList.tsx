import React from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {ImageInput} from './ImageInput';
import {ImageUri} from '@/types';
import {colors} from '@/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

type PreviewImageListProps = {
  images: ImageUri[];
  handleAdd: () => void;
  handleChange: (from: number, to: number) => void;
  handleDelete: (uri: string) => void;
};
export const PreviewImageList = ({
  images,
  handleAdd,
  handleDelete,
  handleChange,
}: PreviewImageListProps) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <ImageInput onChange={handleAdd} />
      <View style={styles.container}>
        {images.map(({uri}, index) => {
          return (
            <Pressable style={styles.imageContainer}>
              <Image
                key={index}
                source={{uri: `http://localhost:3030/${uri}`}}
                style={styles.image}
              />
              <Pressable
                style={[styles.imageButton, styles.deleteButton]}
                onPress={() => handleDelete(uri)}>
                <Ionicons name="close" size={16} color={colors.WHITE} />
              </Pressable>
              {index !== 0 && (
                <Pressable
                  style={[styles.imageButton, styles.moveLeftButton]}
                  onPress={() => handleChange(index, index - 1)}>
                  <Ionicons
                    name="arrow-back-outline"
                    size={16}
                    color={colors.WHITE}
                  />
                </Pressable>
              )}
              {index !== images.length - 1 && (
                <Pressable
                  style={[styles.imageButton, styles.moveRightButton]}
                  onPress={() => handleChange(index, index + 1)}>
                  <Ionicons
                    name="arrow-forward-outline"
                    size={16}
                    color={colors.WHITE}
                  />
                </Pressable>
              )}
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 15,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageButton: {
    position: 'absolute',
    backgroundColor: colors.BLACK,
    zIndex: 1,
  },
  deleteButton: {
    top: 0,
    right: 0,
  },
  moveLeftButton: {
    bottom: 0,
    left: 0,
  },
  moveRightButton: {
    bottom: 0,
    right: 0,
  },
});

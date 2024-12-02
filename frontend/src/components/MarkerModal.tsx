import {colors, feedNavigations, mainDrawerNavigations} from '@/constants';
import {useGetPost} from '@/hooks';
import React from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {View} from 'react-native';
import {MarkerView} from './CustomMarker';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {formatDate} from '@/utils';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '@/navigations';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';

type MarkerModalProps = {
  markerId: number | null;
  isVisible: boolean;
  close: () => void;
};

// {
//   "address": "",
//   "color": "RED",
//   "createdAt": "2024-11-28T09:26:51.656Z",
//   "date": "2024-11-28T09:26:51.386Z",
//   "deletedAt": null,
//   "description": "",
//   "id": 1,
//   "images": [],
//   "isFavorite": false,
//   "latitude": 37.648428,
//   "longitude": 127.111832,
//   "score": 5,
//   "title": "고속도로",
//   "updatedAt": "2024-11-28T09:26:51.656Z"
// }

type MarkerModalNavigation = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList>,
  StackNavigationProp<FeedStackParamList>
>;

export const MarkerModal = ({markerId, isVisible, close}: MarkerModalProps) => {
  const {data: post, isPending, isError} = useGetPost(markerId);
  const navigation = useNavigation<MarkerModalNavigation>();

  if (post === undefined || isError || isPending) {
    return;
  }

  const handlePressModal = () => {
    navigation.navigate(mainDrawerNavigations.FEED, {
      screen: feedNavigations.FEED_DETAIL,
      params: {
        id: post.id,
      },
      initial: false,
    });
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType={'slide'}>
      <SafeAreaView style={[styles.optionBackground]} onTouchEnd={close}>
        <Pressable style={styles.cardContainer} onPress={handlePressModal}>
          <View style={styles.cardInner}>
            <View style={styles.cardAlign}>
              {post.images.length > 0 && (
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `${
                        Platform.OS === 'ios'
                          ? 'http://localhost:3030/'
                          : 'http://10.0.2.2:3030/'
                      }${post.images[0]?.uri}`,
                    }}
                    resizeMode="cover"
                  />
                </View>
              )}
              {post.images.length === 0 && (
                <View
                  style={[styles.imageContainer, styles.emptyImageContainer]}>
                  <MarkerView color={post.color} score={post.score} />
                </View>
              )}
              <View style={styles.infoContainer}>
                <View style={styles.addressContainer}>
                  <Octicons name="location" size={10} color={colors.GRAY_500} />
                  <Text
                    style={styles.addressText}
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {post.address}
                  </Text>
                </View>
                <Text style={styles.titleText}>{post.title}</Text>
                <Text style={styles.dateText}>
                  {formatDate(post.date, '.')}
                </Text>
              </View>
            </View>

            <View style={styles.nextButton}>
              <MaterialIcons
                name="arrow-forward-ios"
                size={20}
                color={colors.BLACK}
              />
            </View>
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  optionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardContainer: {
    backgroundColor: colors.WHITE,
    margin: 10,
    borderRadius: 20,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    elevation: 1,
    borderColor: colors.GRAY_500,
    borderWidth: 1.5,
  },
  cardInner: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  emptyImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.GRAY_200,
    borderRadius: 35,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  cardAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    width: Dimensions.get('screen').width / 2,
    marginLeft: 15,
    gap: 5,
  },
  addressContainer: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: colors.GRAY_500,
    fontSize: 10,
  },
  titleText: {
    color: colors.BLACK,
    fontSize: 15,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.PINK_700,
  },
  nextButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

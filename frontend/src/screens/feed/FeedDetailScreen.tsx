import {colorHex, CustomButton, Ionicons, Octicons} from '@/components';
import {colors, feedNavigations} from '@/constants';
import {useGetPost} from '@/hooks';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {formatDate} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type FeedDetailScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.FEED_DETAIL
>;

export const FeedDetailScreen = ({route}: FeedDetailScreenProps) => {
  const navigation = useNavigation();
  const id = route.params.id;
  const {data: post, isPending, isError} = useGetPost(id);
  const insets = useSafeAreaInsets();

  if (!post || isPending || isError) {
    return;
  }

  return (
    <>
      <ScrollView
        scrollIndicatorInsets={{right: 1}}
        style={[
          styles.container,
          insets.bottom
            ? {
                marginBottom: insets.bottom + 50,
              }
            : styles.scrollNoInsets,
        ]}>
        <SafeAreaView style={styles.headerContainer}>
          <View style={styles.header}>
            <Octicons
              name="arrow-left"
              size={30}
              color={colors.WHITE}
              onPress={() => navigation.goBack()}
            />
            <Ionicons name="ellipsis-vertical" size={30} color={colors.WHITE} />
          </View>
        </SafeAreaView>

        <View style={styles.imageContainer}>
          {post.images.length > 0 && (
            <Image
              style={styles.image}
              source={{
                uri: `${
                  Platform.OS === 'ios'
                    ? 'http://localhost:3030/'
                    : 'http://10.0.2.2:3030/'
                }${post.images[0].uri}`,
              }}
              resizeMode="cover"
            />
          )}
          {post.images.length === 0 && (
            <View style={styles.emptyImageContainer}>
              <Text>No Image</Text>
            </View>
          )}
        </View>

        <View style={styles.contentsContainer}>
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
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColumnKeyText}>방문날짜</Text>
                <Text style={styles.infoColumnValueText}>
                  {formatDate(post.date)}
                </Text>
              </View>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColumnKeyText}>평점</Text>
                <Text style={styles.infoColumnValueText}>{post.score}점</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColumnKeyText}>마커색상</Text>
                <View
                  style={[
                    styles.markerColor,
                    {backgroundColor: colorHex[post.color]},
                  ]}
                />
              </View>
            </View>
          </View>
          <Text style={styles.descriptionText}>{post.description}</Text>
        </View>

        {post.images.length > 0 && (
          <View style={styles.imageContentsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.scrollContainer}>
                <View style={styles.previewImageContainer}>
                  {post.images.map(({uri}, index) => (
                    <Image
                      key={index}
                      source={{uri: `http://localhost:3030/${uri}`}}
                      style={styles.image}
                    />
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </ScrollView>
      <View
        style={[
          styles.bottomContainer,
          {
            padding: insets.bottom,
          },
        ]}>
        <View
          style={[
            styles.tabContainer,
            insets.bottom === 0 && styles.tabContainerNoInsets,
          ]}>
          <Pressable
            style={({pressed}) => [
              styles.bookmarkContainer,
              pressed && styles.bookmarkPressedContainer,
            ]}>
            <Octicons name="star-fill" size={30} color={colors.GRAY_100} />
          </Pressable>
          <CustomButton
            label="위치보기"
            size="medium"
            variant="filled"
            onPress={() => {}}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  headerContainer: {
    top: 0,
    zIndex: 1,
    width: '100%',
    position: 'absolute',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  imageContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  emptyImageContainer: {
    height: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.GRAY_200,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },
  contentsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  infoContainer: {
    marginVertical: 20,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoColumnKeyText: {
    color: colors.BLACK,
  },
  infoColumnValueText: {
    color: colors.PINK_700,
  },
  markerColor: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  addressContainer: {
    gap: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: colors.GRAY_500,
    fontSize: 12,
  },
  descriptionText: {
    color: colors.BLACK,
    lineHeight: 25,
    fontSize: 16,
  },
  imageContentsContainer: {
    paddingVertical: 15,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
  previewImageContainer: {
    width: 70,
    height: 70,
  },
  scrollContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 15,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_200,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tabContainerNoInsets: {
    marginBottom: 10,
  },
  bookmarkContainer: {
    backgroundColor: colors.PINK_700,
    height: '100%',
    paddingHorizontal: 5,
    justifyContent: 'center',
    borderRadius: 3,
  },
  bookmarkPressedContainer: {
    opacity: 0.5,
  },
  scrollNoInsets: {
    marginBottom: 65,
  },
});

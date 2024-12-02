import React from 'react';
import {ResponsePost} from '@/apis';
import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {Dimensions} from 'react-native';
import {colors, feedNavigations} from '@/constants';
import {formatDate} from '@/utils';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerParamList} from '@/navigations';
import {DrawerNavigationProp} from '@react-navigation/drawer';

type FeedItemProps = {
  post: ResponsePost;
};

export type FeedNavigation = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList>,
  DrawerNavigationProp<DrawerParamList>
>;

export const FeedItem = ({post}: FeedItemProps) => {
  const navigation = useNavigation<FeedNavigation>();
  const handlePressFeedItem = () => {
    navigation.navigate(feedNavigations.FEED_DETAIL, {id: post.id});
  };

  return (
    <Pressable style={styles.container} onPress={handlePressFeedItem}>
      <View>
        {post.images.length > 0 && (
          <View key={post.id} style={styles.imageContainer}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{
                uri: `${
                  Platform.OS === 'ios'
                    ? 'http://localhost:3030/'
                    : 'http://10.0.2.2:3030/'
                }${post.images[0]?.uri}`,
              }}
            />
          </View>
        )}
        {post.images.length === 0 && (
          <View style={[styles.imageContainer, styles.emptyImageContainer]}>
            <Text>No Image</Text>
          </View>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>{formatDate(post.date, '/')}</Text>
        <Text style={styles.titleText}>{post.title}</Text>
        <Text style={styles.descriptionText} numberOfLines={1}>
          {post.description}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    marginVertical: 12,
  },
  imageContainer: {
    width: Dimensions.get('screen').width / 2 - 25,
    height: Dimensions.get('screen').width / 2 - 25,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  emptyImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.GRAY_200,
    borderRadius: 5,
    borderWidth: 1,
  },
  textContainer: {
    marginTop: 7,
    gap: 2,
  },
  dateText: {
    color: colors.PINK_700,
    fontWeight: '600',
    fontSize: 12,
  },
  titleText: {
    color: colors.BLACK,
    fontWeight: '500',
    fontSize: 13,
  },
  descriptionText: {
    color: colors.GRAY_500,
    fontSize: 13,
  },
});

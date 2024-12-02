import {FeedList} from '@/components';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

export function FeedHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

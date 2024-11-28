import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  AddPostHeaderRight,
  CustomButton,
  InputField,
  MarkerSelector,
} from '@/components';
import {colors, mapNavigations} from '@/constants';
import {useForm, useMutationCreatePost} from '@/hooks';
import {StackScreenProps} from '@react-navigation/stack';
import {MarkerColor} from '@/types';
import {validateAddPost} from '@/utils';
import {MapStackParamList} from '@/navigations';
import {useGetAddress} from '@/hooks/useGetAddress';
import {ScoreInput} from '@/components/ScoreInput';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

type PostInfomation = {
  title: string;
  description: string;
};

export const AddPostScreen = ({route, navigation}: AddPostScreenProps) => {
  const {location} = route.params;
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutationCreatePost();
  const formState = useForm<PostInfomation>({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });
  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const address = useGetAddress(location);

  const handleSubmit = useCallback(() => {
    const body = {
      date: new Date(),
      title: formState.values.title,
      description: formState.values.description,
      color: markerColor,
      imageUris: [],
      score,
      address,
      ...location,
    };
    createPost.mutate(body, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  }, [
    formState.values.title,
    formState.values.description,
    markerColor,
    score,
    address,
    location,
    createPost,
    navigation,
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  }, [navigation, handleSubmit]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value={address}
            disabled
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton variant="outlined" size="large" label="날짜 선택" />
          <InputField
            placeholder="제목을 입력해주세요"
            inputMode="text"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...formState.getInputProps('title')}
          />
          <InputField
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요 (선택)"
            multiline
            returnKeyType="next"
            {...formState.getInputProps('description')}
          />
          <MarkerSelector
            score={score}
            markerColor={markerColor}
            setMarkerColor={setMarkerColor}
          />
          <ScoreInput score={score} onChangeScore={setScore} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
});

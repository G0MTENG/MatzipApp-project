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
  DatePickerOption,
  InputField,
  MarkerSelector,
  PreviewImageList,
} from '@/components';
import {colors, mapNavigations} from '@/constants';
import {
  useDateSelect,
  useForm,
  useImagePicker,
  useMutationCreatePost,
  usePermission,
} from '@/hooks';
import {StackScreenProps} from '@react-navigation/stack';
import {MarkerColor} from '@/types';
import {formatDate, validateAddPost} from '@/utils';
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
  usePermission('PHOTO');
  const imagePicker = useImagePicker({
    initialImages: [],
  });
  const {date, isVisible, isDatePicked, dateSelectHandlers} = useDateSelect();
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
      date,
      title: formState.values.title,
      description: formState.values.description,
      color: markerColor,
      imageUris: imagePicker.images,
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
    date,
    markerColor,
    score,
    address,
    location,
    createPost,
    navigation,
    imagePicker.images,
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
          <CustomButton
            onPress={dateSelectHandlers.show}
            variant="outlined"
            size="large"
            label={isDatePicked ? formatDate(date, '.') : '날짜 선택'}
          />
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
          <PreviewImageList
            images={imagePicker.images}
            handleAdd={imagePicker.add}
            handleDelete={imagePicker.delete}
            handleChange={imagePicker.change}
          />
          <DatePickerOption
            isVisible={isVisible}
            date={date}
            onChangeDate={dateSelectHandlers.handleChangeDate}
            onConfirmDate={dateSelectHandlers.handleConfirm}
          />
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

import {getFormDataImages} from '@/utils';
import ImagePicker, {PickerErrorCode} from 'react-native-image-crop-picker';
import {useMutateImages} from './queries/useMutateImages';
import {ImageUri} from '@/types';
import {useState} from 'react';
import {Alert} from 'react-native';
import {alertsOptions} from '@/constants';

type UseImageUriPickerProps = {
  initialImages: ImageUri[];
};

export const useImagePicker = ({
  initialImages = [],
}: UseImageUriPickerProps) => {
  const [imageUris, setImageUris] = useState<ImageUri[]>(initialImages);
  const imageMutation = useMutateImages();
  const addImageUris = (uris: string[]) => {
    if (uris.length + imageUris.length > 5) {
      Alert.alert(
        alertsOptions.IMAGE_UPLOAD_FILE_NUMBER.TITLE,
        alertsOptions.IMAGE_UPLOAD_FILE_NUMBER.DESCRIPTION,
      );
      return;
    }
    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const deleteImageUri = (uri: string) => {
    const newImageUris = imageUris.filter(image => image.uri !== uri);
    setImageUris(newImageUris);
  };

  const changeImageUrisOrder = (fromIndex: number, toIndex: number) => {
    const copyImageUris = [...imageUris];
    const [removedImage] = copyImageUris.splice(fromIndex, 1); // 이미지 제거
    copyImageUris.splice(toIndex, 0, removedImage);
    setImageUris(copyImageUris);
  };

  const handleChange = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      includeBase64: true,
      maxFiles: 5,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    })
      .then(images => {
        const formData = getFormDataImages(images);
        imageMutation.mutate(formData, {
          onSuccess: data => addImageUris(data),
        });
      })
      .catch((error: {code: PickerErrorCode}) => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          // 에러메시지 표시
        }
      });
  };

  return {
    images: imageUris,
    add: handleChange,
    delete: deleteImageUri,
    change: changeImageUrisOrder,
  };
};

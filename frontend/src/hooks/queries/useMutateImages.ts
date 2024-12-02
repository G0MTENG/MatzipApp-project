import {uploadImages} from '@/apis';
import {UseMutationCustomOptions} from '@/types';
import {useMutation} from '@tanstack/react-query';

export const useMutateImages = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: uploadImages,
    ...mutationOptions,
  });
};

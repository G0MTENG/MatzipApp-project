import {createPost} from '@/apis';
import {queryClient} from '@/apis/queryClient';
import {markerQueryKeys, postQueryKeys} from '@/constants';
import {Marker, UseMutationCustomOptions} from '@/types';
import {useMutation} from '@tanstack/react-query';

export const useMutationCreatePost = (
  mutationOptions?: UseMutationCustomOptions,
) => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: newPost => {
      queryClient.invalidateQueries({
        queryKey: [postQueryKeys.POST, postQueryKeys.GET_POSTS],
      });

      queryClient.invalidateQueries({
        queryKey: [markerQueryKeys.MARKER, markerQueryKeys.GET_MARKERS],
      });

      // 직접 업데이트 하는 방법
      queryClient.setQueriesData<Marker[]>(
        {queryKey: [markerQueryKeys.MARKER, markerQueryKeys.GET_MARKERS]},
        existingMarkers => {
          const newMarker = {
            id: newPost.id,
            latitude: newPost.latitude,
            longitude: newPost.longitude,
            color: newPost.color,
            score: newPost.score,
          };

          return existingMarkers
            ? [...existingMarkers, newMarker]
            : [newMarker];
        },
      );
    },
    ...mutationOptions,
  });
};

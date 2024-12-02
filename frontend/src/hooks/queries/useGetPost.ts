import {getPost, ResponsiveSinglePost} from '@/apis';
import {postQueryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types';
import {useQuery} from '@tanstack/react-query';

export const useGetPost = (
  id: number | null,
  queryOptions?: UseQueryCustomOptions<ResponsiveSinglePost>,
) => {
  return useQuery({
    queryKey: [postQueryKeys.POST, postQueryKeys.GET_POST, id],
    queryFn: () => getPost(Number(id)),
    enabled: Boolean(id),
    ...queryOptions,
  });
};

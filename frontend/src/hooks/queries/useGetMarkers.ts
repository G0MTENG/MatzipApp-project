import {getMarkers} from '@/apis';
import {markerQueryKeys} from '@/constants';
import {Marker, UseQueryCustomOptions} from '@/types';
import {useQuery} from '@tanstack/react-query';

export const useGetMarkers = (
  queryOptions?: UseQueryCustomOptions<Marker[]>,
) => {
  return useQuery({
    queryKey: [markerQueryKeys.MARKER, markerQueryKeys.GET_MARKERS],
    queryFn: getMarkers,
    ...queryOptions,
  });
};

import {Marker} from '@/types';
import {axiosInstance} from './axios';

export const getMarkers = async (): Promise<Marker[]> => {
  const {data} = await axiosInstance.get('/markers/my');
  return data;
};

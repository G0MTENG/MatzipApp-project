import {ImageUri, Post} from '@/types';
import {axiosInstance} from './axios';

export type RequestCreatePost = Omit<Post, 'id'> & {
  imageUris: ImageUri[];
};

export type ResponsePost = Post & {
  images: ImageUri[];
};

export const createPost = async (
  body: RequestCreatePost,
): Promise<ResponsePost> => {
  const response = await axiosInstance.post('/posts', body);

  return response.data;
};

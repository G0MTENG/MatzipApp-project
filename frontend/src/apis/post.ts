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

export type ResponsiveSinglePost = ResponsePost & {
  isFavorite: boolean;
};
export const getPost = async (id: number): Promise<ResponsiveSinglePost> => {
  const {data} = await axiosInstance.get(`/posts/${id}`);

  return data;
};

export const getPosts = async (page: number = 1): Promise<ResponsePost[]> => {
  const {data} = await axiosInstance.get(`/posts/my?page=${page}`);
  return data;
};

import {axiosInstance} from './axios';
import {Category, Profile} from '@/types';
import {getEncryptStorage} from '@/utils';

export type RequestUser = {
  email: string;
  password: string;
};

export type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

export const postSignUp = async ({
  email,
  password,
}: RequestUser): Promise<void> => {
  const response = await axiosInstance.post('/auth/signup', {
    email,
    password,
  });

  return response.data;
};

export const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/signin', {
    email,
    password,
  });
  return data;
};

export type ResponseProfile = Profile & Category;

export const getProfile = async (): Promise<ResponseProfile> => {
  const {data} = await axiosInstance.get('/auth/me');
  return data;
};

export const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');

  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

export const logout = async () => {
  await axiosInstance.post('/auth/logout');
};

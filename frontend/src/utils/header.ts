import {axiosInstance} from '@/apis/axios';

export const setHeader = (key: string, value: string) => {
  axiosInstance.defaults.headers.common[key] = value;
};

export const removeHeader = (key: string) => {
  if (!axiosInstance.defaults.headers[key]) {
    return;
  }

  delete axiosInstance.defaults.headers.common[key];
};

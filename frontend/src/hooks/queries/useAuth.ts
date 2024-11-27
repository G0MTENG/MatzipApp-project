import {
  getAccessToken,
  postLogin,
  postSignUp,
  getProfile,
  logout,
} from '@/apis';
import {queryClient} from '@/apis/queryClient';
import {authQueryKeys, storageKeys, numbers} from '@/constants';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types';
import {
  removeEncryptStorage,
  removeHeader,
  setEncryptStorage,
  setHeader,
} from '@/utils';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

export const useSignUp = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postSignUp,
    ...mutationOptions,
  });
};

export const useLogin = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({accessToken, refreshToken}) => {
      setEncryptStorage('refreshToken', refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [authQueryKeys.AUTH, authQueryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [authQueryKeys.AUTH, authQueryKeys.GET_PROFILE],
      });
    },
    ...mutationOptions,
  });
};

export const useGetRefreshToken = () => {
  const {data, isSuccess, isError} = useQuery({
    queryKey: [authQueryKeys.AUTH, authQueryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      removeHeader('Authorization');
    }
  }, [isError]);

  return {isSuccess, isError};
};

export const useGetProfile = (quryOptions?: UseQueryCustomOptions) => {
  return useQuery({
    queryKey: [authQueryKeys.AUTH, authQueryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...quryOptions,
  });
};

export const useLogout = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      removeHeader('Authorization');
    },
    onSettled: () => {
      queryClient.resetQueries({queryKey: [authQueryKeys.AUTH]});
      queryClient.invalidateQueries({queryKey: [authQueryKeys.AUTH]});
    },
    ...mutationOptions,
  });
};

export const useAuth = () => {
  const signupMutation = useSignUp();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useLogin();
  const logoutMuatation = useLogout();

  return {
    signupMutation,
    loginMutation,
    isLogin,
    getProfileQuery,
    logoutMuatation,
  };
};

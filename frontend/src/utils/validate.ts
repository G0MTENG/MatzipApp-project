import {UserInfomation} from '@/screens';

export const validateLogin = ({email, password}: UserInfomation) => {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^s@]+$/.test(email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  if (!(password.length >= 8 && password.length < 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }

  return errors;
};

export type UserInfomation = {
  email: string;
  password: string;
};

export type UserSignUp = {
  email: string;
  password: string;
  passwordConfirm: string;
};

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

export const validateSignUp = ({
  email,
  password,
  passwordConfirm,
}: UserSignUp) => {
  const errors = {
    email: '',
    password: '',
    passwordConfirm: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^s@]+$/.test(email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  if (!(password.length >= 8 && password.length < 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = '비밀번호와 일치하지 않습니다.';
  }

  return errors;
};

export const validateAddPost = ({title}: {title: string}) => {
  const errors = {
    title: '',
    description: '',
  };

  if (title.trim() === '' || title.trim().length > 30) {
    errors.title = '제목은 1~30자 이내로 입력해주세요.';
  }

  return errors;
};

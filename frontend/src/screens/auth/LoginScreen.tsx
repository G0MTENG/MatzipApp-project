import {CustomButton, InputField} from '@/components';
import {useForm} from '@/hooks';
import {validateLogin} from '@/utils';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

export type UserInfomation = {
  email: string;
  password: string;
};

export function LoginScreen() {
  const formState = useForm<UserInfomation>({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });

  const handleSubmit = () => {
    console.log(formState.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          inputMode="email"
          {...formState.getInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          secureTextEntry
          {...formState.getInputProps('password')}
        />
        <CustomButton
          label="로그인"
          size="large"
          onPress={() => handleSubmit()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

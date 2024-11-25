import {colors} from '@/constants';
import React, {useRef} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

const deviceHeight = Dimensions.get('screen').height;

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

export const InputField = ({
  disabled = false,
  error,
  touched,
  ...props
}: InputFieldProps) => {
  const innerRef = useRef<TextInput | null>(null);

  const handleClickInput = () => {
    innerRef.current?.focus();
  };

  return (
    <Pressable onPress={handleClickInput}>
      <View
        style={[
          styles.container,
          disabled && styles.disabled,
          touched && Boolean(error) && styles.inputError,
        ]}>
        <TextInput
          ref={innerRef}
          editable={!disabled}
          placeholderTextColor={colors.GRAY_500}
          style={[styles.input, disabled && styles.disabled]}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          {...props}
        />
        {touched && Boolean(error) && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: deviceHeight > 700 ? 12 : 10,
  },
  input: {
    fontSize: 16,
    color: colors.BLACK,
    padding: 0,
  },
  disabled: {
    backgroundColor: colors.GRAY_500,
    color: colors.GRAY_700,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },
  errorText: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
});

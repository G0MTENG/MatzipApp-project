import {useEffect, useState} from 'react';

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

export const useForm = <T extends {}>({
  initialValue,
  validate,
}: UseFormProps<T>) => {
  const [inputValues, setInputValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    Object.keys(initialValue).reduce((acc, cur) => {
      return {
        ...acc,
        [cur]: false,
      };
    }, {} as Record<keyof T, boolean>),
  );
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    Object.keys(initialValue).reduce((acc, cur) => {
      return {
        ...acc,
        [cur]: '',
      };
    }, {} as Record<keyof T, string>),
  );

  useEffect(() => {
    const newErrors = validate(inputValues);
    setErrors(newErrors);
  }, [validate, inputValues]);

  const handleChangeText = (key: keyof T, text: string) => {
    setInputValues({
      ...inputValues,
      [key]: text,
    });
  };

  const handleBlur = (key: keyof T) => {
    setTouched({
      ...touched,
      [key]: true,
    });
  };

  const getInputProps = (key: keyof T) => {
    const value = inputValues[key];
    const onChangeText = (text: string) => handleChangeText(key, text);
    const onBlur = () => handleBlur(key);

    return {
      value,
      error: errors[key],
      touched: touched[key],
      onChangeText,
      onBlur,
    };
  };

  return {
    values: inputValues,
    errors,
    touched,
    getInputProps,
  };
};

import React from 'react';
import {colors} from '@/constants';
import {ReactNode} from 'react';
import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';

interface HeaderButtonProps extends PressableProps {
  labelText?: string;
  icon?: ReactNode;
  hasError?: boolean;
}

export const HeaderButton = ({
  labelText,
  icon,
  hasError = false,
  ...props
}: HeaderButtonProps) => {
  return (
    <Pressable style={styles.container} {...props}>
      {!labelText && icon}
      {!icon && labelText && (
        <Text style={[styles.text, hasError && styles.textError]}>
          {labelText}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
    marginLeft: 80,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.PINK_700,
  },
  textError: {
    color: colors.GRAY_200,
  },
});

import {colors} from '@/constants';
import React from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

interface DatePickerOptionProps {
  isVisible: boolean;
  date: Date;
  onChangeDate: (date: Date) => void;
  onConfirmDate: () => void;
}

export const DatePickerOption = ({
  isVisible,
  date,
  onChangeDate: onDateChange,
  onConfirmDate,
}: DatePickerOptionProps) => {
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <SafeAreaView style={[styles.optionBackground, styles.dimmed]}>
        <View style={styles.optionContainer}>
          <View style={styles.pickerContainer}>
            <DatePicker
              mode="date"
              date={date}
              onDateChange={onDateChange}
              locale="ko"
            />
          </View>
        </View>
        <View style={styles.optionContainer}>
          <Pressable style={styles.optionButton} onPress={onConfirmDate}>
            <Text style={styles.optionText}>확인</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    alignItems: 'center',
  },
  optionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  dimmed: {
    backgroundColor: 'rgba(0 0 0 / 0.5)',
  },
  optionContainer: {
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: colors.GRAY_100,
    overflow: 'hidden',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    gap: 5,
  },
  optionText: {
    fontSize: 17,
    color: colors.BLUE_500,
    fontWeight: '500',
  },
});

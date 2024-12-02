import {useState} from 'react';

export const useDateSelect = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const [isDatePicked, setIsDatePicked] = useState(false);

  const show = () => {
    setIsVisible(true);
  };

  const hide = () => {
    setIsVisible(false);
  };

  const handleConfirm = () => {
    setIsDatePicked(true);
    setIsVisible(false);
  };

  const handleChangeDate = (selectedDate: Date) => {
    setDate(selectedDate);
  };

  return {
    date,
    isVisible,
    isDatePicked,
    dateSelectHandlers: {
      show,
      hide,
      handleConfirm,
      handleChangeDate,
    },
  };
};

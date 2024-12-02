import {useState} from 'react';

export const useModal = (initialState: boolean = false) => {
  const [state, setState] = useState<boolean>(initialState);

  const open = () => {
    setState(true);
  };

  const close = () => {
    setState(false);
  };

  return {
    state,
    open,
    close,
  };
};

import React from 'react';
import {HeaderButton} from './HeaderButton';

export const AddPostHeaderRight = (onSubmit: () => void) => {
  return <HeaderButton labelText="등록" onPress={onSubmit} />;
};

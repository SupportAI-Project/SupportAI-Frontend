import { useContext } from 'react';
import { SelectedContactContextValue } from '../providers/SelectedContactProvider/provider';
import { SelectedContactContext } from '../providers/SelectedContactProvider/provider';

export const useGlobalContacts = (): SelectedContactContextValue => {
  const context = useContext(SelectedContactContext);
  if (!context) {
    throw new Error('useGlobalSelectedContact must be used within a SelectedContactProvider');
  }
  return context;
};

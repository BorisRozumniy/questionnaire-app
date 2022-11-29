import { useState } from 'react';

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const changeValue = (newValue: string) => setValue(newValue);
  return [value, changeValue] as const;
};

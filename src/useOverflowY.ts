import { useEffect, useState } from 'react';

type Overflow = 'hidden' | 'auto';
export const useOverflowY = () => {
  const [overflow, setOverflow] = useState<Overflow>('hidden');

  useEffect(() => {
    const timer = setTimeout(() => setOverflow('auto'), 256);
    return () => {
      setOverflow('hidden');
      clearTimeout(timer);
    };
  }, []);

  return [overflow];
};

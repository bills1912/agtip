import { useEffect, useRef } from 'react';

export const useTimeout = (callback: () => void, delay: number | null): void => {
  const savedCallback = useRef<(() => void) | undefined>(undefined);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout
  useEffect(() => {
    if (delay === null) return;

    const tick = (): void => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const id = window.setTimeout(tick, delay);
    return () => window.clearTimeout(id);
  }, [delay]);
};
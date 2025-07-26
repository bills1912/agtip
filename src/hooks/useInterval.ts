import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, delay: number | null): void => {
  const savedCallback = useRef<(() => void) | undefined>(undefined);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay === null) return;

    const tick = (): void => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const id = window.setInterval(tick, delay);
    return () => window.clearInterval(id);
  }, [delay]);
};
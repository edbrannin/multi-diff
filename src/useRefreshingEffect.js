import { useEffect, useState } from 'react';

export const useRefreshingEffect = (func, defaultValue) => {
  const [fetchedAt, setFetchedAt] = useState(Date.now());
  const [args, setArgs] = useState([]);
  const fetchNow = (...newArgs) => {
    setFetchedAt(Date.now());
    setArgs(newArgs);
  }
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callFunc = async () => {
      console.log('Updating, fetchedAt:', fetchedAt);
      try {
        const answer = await func(...args);
        console.log('Got value:', answer);
        setValue(answer);
      }
      catch (err) {
        console.error('Error:', err);
        setValue(null);
        setError(err);
      }
    };

    callFunc();
  }, [fetchedAt, func, args]);

  return [value, fetchNow, error];
};


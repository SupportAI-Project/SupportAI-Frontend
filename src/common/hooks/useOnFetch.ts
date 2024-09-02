import { useEffect, useRef } from "react";

export const useOnFetch = <T>(
  onFetched: (data: T) => void,
  isFetched: boolean,
  data: T | undefined,
  fetchOnce: boolean = true
) => {
  const hasFetched = useRef(false);

  useEffect(() => {
    if (isFetched && data && !hasFetched.current) {
      onFetched(data);
      hasFetched.current = fetchOnce;
    }
  }, [data, isFetched, onFetched]);
};

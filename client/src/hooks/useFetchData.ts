import { useState, useEffect } from "react";

type FetchFunction<T> = (...args: any[]) => Promise<T>;

interface UseFetchDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetchData = <T>(
  fetchFunction: FetchFunction<T>,
  ...args: any[]
): UseFetchDataReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFunction(...args);
        setData(result);
      } catch (err: any) {
        setError(err.message || "Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, ...args]);

  return { data, loading, error };
};

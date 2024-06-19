import { useEffect, useState } from "react";
export function useFetchData(fetcher, deps = [], initialData) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    const fetchData = () => {
      setLoading(true);
      setError(undefined);
  
      fetcher()
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
  
    useEffect(() => {
      fetchData();
    }, deps);
  
    return {
      data,
      loading,
      error,
      refetchData: fetchData,
    };
  }
  
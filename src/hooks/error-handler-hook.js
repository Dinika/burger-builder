import { useEffect, useState } from 'react';

export default axios => {
  const [error, setError] = useState(null);
  let reqInterceptor = axios.interceptors.request.use(req => {
    setError(null);
    return req;
  });
  let resInterceptor = axios.interceptors.response.use(
    res => res,
    error => {
      setError(error);
    }
  );
  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  function onPurchaseCancelled() {
    setError(null);
  }
  return [error, onPurchaseCancelled];
};

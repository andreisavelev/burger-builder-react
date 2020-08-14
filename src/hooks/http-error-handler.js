import { useState, useEffect, useCallback } from "react";

/**
 * Custom error handler
 * @param {Object} httpClient - any http client like axios, fetch, etc...
 * @returns {[null | Error, function]}
 */
export default httpClient => {
  const [error, setError] = useState(null);
  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setError(null)
    return req;
  });
  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
    }
  );
  const errorConfirmedHandler = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    // Clean up
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    }
  }, [reqInterceptor, resInterceptor]);

  return [error, errorConfirmedHandler];
}

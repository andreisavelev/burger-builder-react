import React, { useState, useEffect, useCallback, memo } from "react";

import Modal from "../../components/ui/Modal/Modal";
import Aux from "../Auxiliary";

/**
 * Render modal if error occurs
 * @param WrappedComponent
 * @param axios
 * @returns {function}
 */
const withErrorHandler = (WrappedComponent, axios) => {
  return memo((props) => {
    const [error, setError] = useState(null);
    const reqInterceptor = axios.interceptors.request.use((req) => {
      setError(null)
      return req;
    });
    const resInterceptor = axios.interceptors.response.use(
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
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      }
    }, [reqInterceptor, resInterceptor]);

      return (
        <Aux>
          {error && (<Modal
            show={error}
            modalClosed={errorConfirmedHandler}
          >
            {error ? error.message : null}
          </Modal>)}
          <WrappedComponent {...props} />
        </Aux>
      );
  });
};

export default withErrorHandler;

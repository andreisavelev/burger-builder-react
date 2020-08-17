import React, { memo } from "react";

import Modal from "../../components/ui/Modal/Modal";
import Aux from "../Auxiliary";
import useHttpErrorHandler from '../../hooks/http-error-handler';

/**
 * Render modal if error occurs
 * @param WrappedComponent
 * @param axios
 * @returns {function}
 */
const withErrorHandler = (WrappedComponent, axios) => {
  return memo((props) => {
    const [error, cleanError] = useHttpErrorHandler(axios);

      return (
        <Aux>
          {error && (<Modal
            show={error}
            modalClosed={cleanError}
          >
            {error ? error.message : null}
          </Modal>)}
          <WrappedComponent {...props} />
        </Aux>
      );
  });
};

export default withErrorHandler;

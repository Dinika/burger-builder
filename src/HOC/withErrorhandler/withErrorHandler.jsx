import React from 'react';
import useHttpErrorHandler from '../../hooks/error-handler-hook';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, onPurchaseCancelled] = useHttpErrorHandler(axios);
    return (
      <Aux>
        <Modal showModal={error} onPurchaseCancelled={onPurchaseCancelled}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;

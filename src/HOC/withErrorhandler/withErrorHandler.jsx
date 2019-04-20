import React, { useEffect, useState } from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
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

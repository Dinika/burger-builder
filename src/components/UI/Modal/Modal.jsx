import React, { useEffect } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../HOC/Aux';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
  // shouldComponentUpdate(nextProps) {
  //   return (
  //     this.props.showModal !== nextProps.showModal &&
  //     this.props.children !== nextProps.children
  //   );
  // }
  return (
    <Aux>
      <Backdrop
        showBackdrop={props.showModal}
        onBackdropClicked={props.onPurchaseCancelled}
      />
      <div
        className={classes.Modal}
        style={{
          transform: props.showModal ? 'translateY(0)' : 'translate(-100vh)',
          opacity: props.showModal ? '1' : '0'
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.showModal === prevProps.showModal ||
    (!nextProps.showModal || prevProps.children === nextProps.children)
);

import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../HOC/Aux';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
    return (
        <Aux>
            <Backdrop showBackdrop={props.showModal} onBackdropClicked={props.onBackdropClicked} />
            <div className={classes.Modal}
                style={{
                    transform: props.showModal ? 'translateY(0)' : 'translate(-100vh)',
                    opacity: props.showModal ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Aux>
    )
}

export default Modal;
import React, {Component} from 'react';
import classes from './Modal.module.css';
import Aux from '../../../HOC/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    UNSAFE_componentWillUpdate() {
        console.log('Modal WillUpdate');
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.showModal !== nextProps.showModal ||
            this.props.children !== nextProps.children
        );
    }
    render() {
        return (
            <Aux>
                <Backdrop showBackdrop={this.props.showModal} onBackdropClicked={this.props.onPurchaseCancelled} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.showModal ? 'translateY(0)' : 'translate(-100vh)',
                        opacity: this.props.showModal ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;
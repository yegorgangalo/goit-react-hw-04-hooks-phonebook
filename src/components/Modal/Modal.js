import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends PureComponent {

    componentDidMount() {
        window.addEventListener('keydown', this.keydownCloseModal);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keydownCloseModal);
    }

    keydownCloseModal = ({ code }) => {
        code === "Escape" && this.props.onClose();
    }

    backdropCloseModal = ({ target, currentTarget }) => {
        target === currentTarget  && this.props.onClose();
    }

    render() {
        return createPortal(
            <div className={s.backdrop} onClick={this.backdropCloseModal}>
                <div className={s.content}>{this.props.children}</div>
            </div>
        , modalRoot)
    }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
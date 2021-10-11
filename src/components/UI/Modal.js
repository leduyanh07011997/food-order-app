import ReactDOM from 'react-dom';
import { Fragment } from 'react';
import './Modal.scss';

const Backdrop = props => {
    return <div className="backdrop" onClick={props.onHideCart}></div>
} 

const ModalOverlay = props => {
    return <div className="modal">
        <div className="content">{props.children}</div>
    </div>
}

const Modal = props => {
    const overlaysElement = document.getElementById('overlays');
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onHideCart={props.onHideCart} />, overlaysElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlaysElement)}
    </Fragment>
}

export default Modal;
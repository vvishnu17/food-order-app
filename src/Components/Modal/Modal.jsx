import React, { useEffect,useRef } from "react";
import { createPortal} from 'react-dom';
import styles from './Modal.module.css';

const portalElement = document.getElementById('root');

const Modal = ({children,open,className='', onClose}) =>{
    const cssClass = styles.modal;
    const dialog = useRef();
    useEffect(()=>{
        const modal = dialog.current;
        if(open)
        {
            modal.showModal();
        }

        return ()=>{modal.close()}
    },[open])
    return createPortal(<dialog ref={dialog} className= {`${cssClass} ${className}`} onClose={onClose} >{children}</dialog>, portalElement);
}

export default Modal
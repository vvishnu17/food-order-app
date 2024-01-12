import React from "react";
import styles from './Button.module.css';

const Button = ({children,textOnly=false,className='',...props}) =>{
    const cssClass = textOnly? styles.textButton: styles.button;
    return <button className={`${cssClass} ${className}`} {...props}>
        {children}
    </button>
}
export default Button;
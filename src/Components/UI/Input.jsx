import React from "react";
import styles from './Input.module.css';

const Input = ({label,id,...props}) => {
    return <p className={styles.control}>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id}  required {...props}/>
    </p>
}

export default Input;
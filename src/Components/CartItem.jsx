import React from "react";
import styles from './CartItem.module.css';
import { currencyFormatter } from "../util/formatter";

const CartItem = ({name,quantity,price,onDecrement,onIncrement}) => {

    return <li className={styles.cartItem}>
        <p>
            {name} - {quantity} * {currencyFormatter.format(price)}
        </p>
        <p className={styles.cartItemActions}>
            <button onClick={onDecrement}>-</button>
            <span>{quantity}</span>
            <button onClick={onIncrement}>+</button>
        </p>
    </li>

}

export default CartItem;
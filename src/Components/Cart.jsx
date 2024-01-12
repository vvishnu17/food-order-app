import React , {useContext} from "react";
import Modal from "./Modal/Modal";
import CartContext from "../Store/CartContext";
import { currencyFormatter } from "../util/formatter";
import Button from "./UI/Button";
import styles from './Cart.module.css';
import ModalContext from "../Store/ModalContext";
import CartItem from "./CartItem";

const Cart = () =>{
    const cartCtx = useContext(CartContext);
    const modalCtx = useContext(ModalContext);

    const cartTotalPrice = cartCtx.items.reduce( (totalPrice,item)=> totalPrice + item.quantity * item.price,0);

    const closeCartHandler = () =>{
        modalCtx.hideCart();
    }
    const openCheckoutHandler = () => {
        modalCtx.showCheckout();
    }

    return <Modal className={styles.cart} open={modalCtx.progress === 'cart'} onClose={modalCtx.progress === 'cart' ? closeCartHandler:null} >
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map((item) => <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price} onDecrement={()=>{cartCtx.removeItem(item.id)}}
        onIncrement={()=>{cartCtx.addItem(item)}} />)}
        </ul>
        <p className={styles.cartTotal}>{currencyFormatter.format(cartTotalPrice)}</p>
        <p className={styles.modalActions}>
            <Button onClick={closeCartHandler} textOnly={true} >Close</Button>
            {cartCtx.items.length > 0 && <Button onClick={openCheckoutHandler} >Go To Checkout</Button>}
        </p>

    </Modal>
}

export default Cart;
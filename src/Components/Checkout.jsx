import React, { useContext } from "react";
import styles from './Checkout.module.css';
import CartContext from "../Store/CartContext";
import ModalContext from "../Store/ModalContext";
import Modal from "./Modal/Modal";
import { currencyFormatter } from "../util/formatter";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHTTP from "../Hooks/useHTTP";

const Checkout = () => {
    const cartCtx = useContext(CartContext);
    const modalCtx = useContext(ModalContext);
    const {isloading,error,sendHttpRequest} = useHTTP();

    const totalAmount = cartCtx.items.reduce((totalPrice,item)=>{return totalPrice + item.quantity * item.price},0);
    const closeCheckoutHandler = () => {
        modalCtx.hideCheckout();
    }
    const printDataAfterPost = (data) =>{
        console.log("posted data",data);
    }
    const submitHandler = (event) => {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        const url = "http://localhost:3000/orders";
        const config = {
            method:'POST',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify({
                order:{

                    items:cartCtx.items,
                    customer:customerData,
                }
            }),
        }
        sendHttpRequest(url,config,printDataAfterPost);
        closeCheckoutHandler();
        cartCtx.clearCart();

      /* fetch("http://localhost:3000/orders",{
            method:'POST',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify({
                order:{

                    items:cartCtx.items,
                    customer:customerData,
                }
            }),
        }).then((data)=>data.json()).then(printDataAfterPost)*/
    }

    return <Modal open={modalCtx.progress === 'checkout'} onClose={closeCheckoutHandler} >
        <h2>Checkout</h2>
        <p>Total Amount : {currencyFormatter.format(totalAmount)}</p>
        <form onSubmit={submitHandler}>
            <Input label='Full Name' id='name' type='text' />
            <Input label='E-Mail Address' id='email' type='email' />
            <Input label='Street' id='street' type='text' />
            <div className={styles.controlRow}>
                <Input label='Postal Code' id='postal-code' type='text' />
                <Input label='City' id='city' type='text' />
            </div>
            <p className={styles.modalActions}>
                <Button textOnly='true' onClick={closeCheckoutHandler} >Close</Button>
            <   Button type='submit' >Submit Order</Button>
            </p>
        </form>
    </Modal>
}

export default Checkout;
import React, {useContext} from "react";
import CartContext from "../Store/CartContext";
import Logo from "../assets/logo.jpg";
import styles from "./Header.module.css";
import Button from "./UI/Button";
import ModalContext from "../Store/ModalContext";

const Header = () =>{
    const cartCtx = useContext(CartContext);
    const modalCtx = useContext(ModalContext);

    const totalQuantity = cartCtx.items.reduce((totalNumberOfItems,item)=>{
        return totalNumberOfItems + item.quantity;
    },0)

    const showCartHandler = () =>{
        modalCtx.showCart();
    }

    return <header className={styles.mainHeader}>
        <div className={styles.title}>
            <img src={Logo} alt="Restaurant Logo"/>
            <h1>Reactfood</h1>
        </div>
        <nav>
            <Button className={styles.pos} onClick={showCartHandler} >Cart({totalQuantity})</Button>
        </nav>

    </header>
}

export default Header;
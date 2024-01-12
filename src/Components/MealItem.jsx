import React, {useContext} from "react";
import CartContext from "../Store/CartContext";
import styles from "./MealItem.module.css";
import { currencyFormatter } from "../util/formatter";
import Button from "./UI/Button";

const MealItem = ({mealData}) =>{
    const cartCtx = useContext(CartContext);

    const addItemHandler = () =>{
        cartCtx.addItem(mealData);
    }

    //const imgSrc =`http://localhost:3000/${mealData.image}`;
    //<img src={imgSrc} alt="Meal Item" />


    return <div className={styles.mealItem}>
        <img src={mealData.imageD} alt="Meal Item" />
        <h3>{mealData.name}</h3>
        <p className={styles.mealItemPrice}>{currencyFormatter.format(mealData.price)}</p>
        <p>{mealData.description}</p>
        <Button onClick={addItemHandler} >Add to cart</Button>
    </div>
}

export default MealItem;
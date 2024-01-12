import React, {createContext,useReducer} from "react";

const CartContext = createContext({
    items:[],
    addItem: (item) =>{},
    removeItem: (id) =>{},
});
export default CartContext;

const reducerFn = (state,action) => {

    if(action.type === "ADD_ITEM")
    {
        const currentItemIndex = state.items.findIndex((mealItem) => mealItem.id === action.value.id);

        const cartItems = [...state.items];
        if(currentItemIndex > -1){
            const currentCartItem = {
                ...cartItems[currentItemIndex],
                quantity: cartItems[currentItemIndex].quantity + 1,
            }
            cartItems[currentItemIndex] = currentCartItem;
        }
        else{
            cartItems.push({...action.value,quantity:1,})
        }
        return {items:cartItems};
    }
    if(action.type ==="REMOVE_ITEM")
    {
       const removeItemIndex = state.items.findIndex((mealItem) => mealItem.id === action.value);
       
       const cartItems = [...state.items];
       if(cartItems[removeItemIndex].quantity > 1){
        const currentCartItem = {
            ...cartItems[removeItemIndex],
            quantity: cartItems[removeItemIndex].quantity - 1,
        }
        cartItems[removeItemIndex] = currentCartItem;
        //return {items:cartItems};
       }
       else{
        //const updatedCartItems = cartItems.filter((mealItem) => mealItem.id !== action.value);
        //return {items:updatedCartItems};
        cartItems.splice(removeItemIndex,1);
       }
       return {items:cartItems};
    }
    if(action.type === 'CLEAR_CART')
    {
        return {...state,items:[]};
    }

    return {...state};
}

export const CartContextProvider = ({children}) =>{
    const [state,dispatchFn] = useReducer(reducerFn,{items:[]});
    const addItemHandler = (item) =>{
        dispatchFn({type:"ADD_ITEM", value:item})
    }
    const removeItemHandler = (id) => {
        dispatchFn({type:"REMOVE_ITEM",value:id});
    }
    const clearCartHandler = () =>{
        dispatchFn({type:'CLEAR_CART'});
    }
    const cartCtxValue = {
        items: state.items,
        addItem:addItemHandler,
        removeItem:removeItemHandler,
        clearCart:clearCartHandler,
        
    }
    console.log(cartCtxValue.items);
    return <CartContext.Provider value={cartCtxValue}>{children}</CartContext.Provider>
}
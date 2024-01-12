import { useState, createContext } from "react";

const ModalContext = createContext({
    progress:'',
    showCart: () =>{},
    hideCart: () =>{},
    showCheckout: () =>{},
    hideCheckout: () =>{},
})

export default ModalContext;

export const ModalContextProvider = ({children}) =>{

    const [progress, setProgress] = useState('');

    const showCart = () =>{
        setProgress('cart');
    }
    const hideCart = () =>{
        setProgress('');
    }

    const showCheckout = () =>{
        setProgress('checkout');
    }

    const hideCheckout = () => {
        setProgress('');
    }

    const modalCtxObj = {
        progress: progress,
        showCart: showCart,
        hideCart: hideCart,
        showCheckout: showCheckout,
        hideCheckout: hideCheckout,
    }
 
    return <ModalContext.Provider value={modalCtxObj}>{children}</ModalContext.Provider>
}
 
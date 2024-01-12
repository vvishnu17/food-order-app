import React from "react";
import Header from "./Components/Header";
import Meals from "./Components/Meals";
import { CartContextProvider } from "./Store/CartContext";
import { ModalContextProvider } from "./Store/ModalContext";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
function App() {

  return (
    <ModalContextProvider >
      <CartContextProvider>
      <Header />
      <Meals />
      <Cart />
      <Checkout />
    </CartContextProvider>
    </ModalContextProvider>
    
  );
}

export default App;

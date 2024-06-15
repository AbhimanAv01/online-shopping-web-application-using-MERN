import React,{useState} from "react";

import CartContext from "./CartContext";


const CartContextProvider=({children})=>{
    const[Cartvaule,setCartvaule]=useState(null)

    return(
        <CartContext.Provider value={{Cartvaule,setCartvaule}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;
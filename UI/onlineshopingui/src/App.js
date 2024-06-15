import React, { useEffect, useState ,useContext} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard.js/dashboard";
import Slide from "./dashboard.js/slides";
import Cart from "./cart/Cart";
import Listlap from "./list-of-lap/Listlap";
import Main from "../src/main/main";
import Chechkout from "./Chechkout/Chechkout";

import Loginsignup from "./Login-signup/Login-signup";
import Footer from "./footer/Footer";

import { ToastContainer, toast } from 'react-toastify';
import CartContext from './Context/CartContext';
import Invoice from "./invoice/invoice";
import Odr_way from "./odr_on_the_way/odr_way"
import Listmob from "./list-of-mob/Listmob";
import Listtv from "./list-of-tv/Listoftv";
import Your_order from "./Your_order/Your_order";
import Listofheadphone from "./list-of-headphone/list-of-headphone"




function App({ currentPath }) {
  const [cart, setCart] = useState([]);
  const handleclk = (card) => {
    // Check if user is logged in before add to cart
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        toast.error("Please log in to add items to your cart");
        return;
    }

    // Check for duplicate
    let isPresent = false;
    cart.forEach((product) => {
        if (card.id === product.id) 
          {isPresent = true;}
    });
    if (isPresent) {
        toast.error("Item is already added to cart");
        return;
    }
    setCart([...cart, card]);
    toast.success("Item added to cart");
};


//quantity or amount of item in cart
  const handleChange = (item, d) => {
    let ind = -1;
    cart.forEach((data, index) => {
      if (data.id === item.id) ind = index;
    });
    const tempArr = cart;
    tempArr[ind].amount += d;

    if (tempArr[ind].amount === 0) tempArr[ind].amount = 1;
    setCart([...tempArr]);
  };
  console.log(cart)
  return (
    <>
     {/* conditonal rendring */}
     <ToastContainer />
    
   
      {currentPath !== "/chechkout" && currentPath !== "/invoice" &&  currentPath !== "/on_the_way" && currentPath !== "/Your_oder" &&  (
        <Dashboard
          cartsize={cart.length}
          cart={cart}
          setCart={setCart}
          handleChange={handleChange}
        />
      )}

      <Routes>
        <Route path="/" element={<Main handleclk={handleclk} />} />
        <Route path="/dashboard" element={<Dashboard cartsize={cart.length}
          cart={cart} setCart={setCart} handleChange={handleChange} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/slide" element={<Slide />} />
        <Route path="/listoflap" element={<Listlap handleclk={handleclk} />} />
        <Route path="/listofheadphone" element={<Listofheadphone handleclk={handleclk} />} />
        <Route path="/listofmob" element={<Listmob handleclk={handleclk} />} />
        <Route path="/listoftv" element={<Listtv handleclk={handleclk} />} />
        <Route path="/chechkout" element={<Chechkout  handleChange={handleChange} cart={cart} />} />
        <Route path="/login" element={<Loginsignup />} />
        <Route path="/invoice" element={<Invoice/>} />
        <Route path="/on_the_way" element={<Odr_way />} />
        <Route path="/Your_oder" element={<Your_order/>} />

      </Routes>
      {currentPath !== "/invoice" &&   currentPath !== "/on_the_way" && currentPath !== "/Your_oder" &&  (
      <Footer />
    )}
      
     
     
    </>
  );
}

export default function RouterWrapper() {
  const currentPath = window.location.pathname;
  return (
    <BrowserRouter>
      <App currentPath={currentPath} />
    </BrowserRouter>
  );
}

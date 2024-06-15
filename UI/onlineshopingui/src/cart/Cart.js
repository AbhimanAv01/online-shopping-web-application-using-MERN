import React, { useEffect, useState ,useContext} from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "../css/Cart.css";
import axios from 'axios';
import Checkout from '../Chechkout/Chechkout';
import CartContext from '../Context/CartContext';
import {  useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart({ show, handleClose, cart, setCart, handleChange }) {
  const [price, setPrice] = useState(0);
  const [rzp1, setRzp1] = useState(null); // Define rzp1 state
  const nav = useNavigate();
  
  const handleprice = () => {   //updating total price
    let ttlprice = 0;
    cart.forEach((card) => (
      ttlprice += card.amount * card.Price
    ));
    setPrice(ttlprice);
    localStorage.setItem('checkout-price',ttlprice);
    
  };

  const handleRemove = (id) => {
    const arr = cart.filter((card) => card._id !== id);
    setCart(arr);
  };

  useEffect(() => {
    handleprice();
  }, [cart]);

  useEffect(() => {
    if (price > 0) { // Ensure price is greater than 0 before initializing Razorpay
      const options = {
        "key": "rzp_test_GZQWsnxfu8f57I",
        "amount": price,
        "currency": "INR",
        // Other options...
      };
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      setRzp1(razorpayInstance); // Set rzp1 state
    }
  }, [price]); // Dependency array ensures this effect runs only when price changes

  
  const checkoutbtn = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      toast.error("Please login");
      return;
    }
    // Navigate to checkout and refresh the page
    nav("/chechkout");
    window.location.reload();
  }


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
   
  }, [cart]);


 

  return (
    <div className='cart-con'>
      <Offcanvas show={show} onHide={handleClose} placement="end" className='c1'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>CART</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='cart-body'>
          {
            cart?.map((card) => (
              <div className='cart-box' key={card._id}>
                <div className='cart-img'>
                  <img src={card.imageSrc} className='img' alt={card.title} />
                  <p className='cart-title'>{card.title}</p>
                </div>
                <div className='cart-count'>
                  <button onClick={() => handleChange(card, +1)} className='count-btn'>+</button>
                  <button className='cart-amount'>{card.amount}</button>
                  <button onClick={() => handleChange(card, -1)} className='count-btn'>-</button>
                </div>
                <div className='cart-price'>
                  <span className='cart-price'>{card.Price}</span>
                  <button onClick={() => handleRemove(card._id)} className='cart-remove'>x</button>
                </div>
              </div>
            ))
          }
          <div className='price-chck-con'>
            <div className='ttlprice-con'>
              <span>Total</span>
              <span>₹{price}/-</span>
            </div>
            <div className='chckout-con'>
              <button className='chckout' onClick={handleClose}>Cancel</button>
              <button className='cancle' onClick={checkoutbtn} >Checkout</button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      
    </div>


  );
}

export default Cart;

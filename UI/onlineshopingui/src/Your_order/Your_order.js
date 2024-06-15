import React, { useEffect, useState, useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "../css/Yourcart.css";
import axios from 'axios';
import Checkout from '../Chechkout/Chechkout';
import CartContext from '../Context/CartContext';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Your_oder({ yourshow, handleyourClose }) {
  
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        // Fetch order details from the server when the component mounts
        axios.get("http://localhost:3010/api/order")
            .then(res => {
                setOrders(res.data);
                console.log(res.data) // Update the state with the fetched orders
            })
            .catch((err) => {
                const errorMsg = err.response?.data?.message || 'An error occurred while fetching the orders';
                toast.error(errorMsg);
            });
    }, []);





    return (
        <div className='cart-con'>
            <Offcanvas show={yourshow} onHide={handleyourClose} placement="end" className='c1'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Your Order</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='cart-body'>
                    {
                        orders?.map((card) => (

                            <div className='yourorder-box' key={card._id}>
                                <div>
                                    <span className='yourorder-ddate'>Delivery Date:{card.order_date} </span>
                                </div>

                                <div className='cart-img'>
                                    <img src={card.imageSrc} className='img' alt={card.title} />
                                    <p className='cart-title'>{card.title}</p>

                                    <div className='yourorder-count'>

                                        <button className='cart-amount'>{card.amount}</button>

                                    </div>

                                    <div className='yourorder-price'>
                                        <span className='cart-price'>{card.Price}</span>

                                    </div>
                                </div>


                                
                            </div>
                        ))
                    }
                    <div className='price-chck-con'>
                        <div className='chckout-con'>

                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

        </div>


    );
}

export default Your_oder;

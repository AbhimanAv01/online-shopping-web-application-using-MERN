import React, { useState, useEffect, useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import "../css/Checkout.css";
import axios from "axios";
import { PaymentContext } from "../Context/Paymentcontext";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <text type="button" onClick={decoratedOnClick}>
      {children}
    </text>
  );
}

function Checkout({ handleChange, cart }) {
  const nav = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionofdate, setSelectedOptionofdate] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [dateSevenDaysAfter, setDateSevenDaysAfter] = useState("");
  const [datethreeDaysLater, setDatethreeDaysAfter] = useState("");
  const [rzp1, setRzp1] = useState(null); // Define rzp1 state
  const [price, setPrice] = useState(0);
  const { setPaymentSuccess } = useContext(PaymentContext);

  
  const checkoutcart = JSON.parse(localStorage.getItem("cart")) || [];    //converted  cart to array for mapping
  const chckpice=(localStorage.getItem("checkout-price"));
  useEffect(() => {
    const currentDate = new Date();
    const dateSevenDaysLater = new Date(currentDate);
    dateSevenDaysLater.setDate(currentDate.getDate() + 7);
    const formattedDate = dateSevenDaysLater.toISOString().slice(0, 10);
    setDateSevenDaysAfter(formattedDate);
    setPrice(chckpice); 
   
  
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const datethreeDaysLater = new Date(currentDate);
    datethreeDaysLater.setDate(currentDate.getDate() + 3);

    const formattedDate = datethreeDaysLater.toISOString().slice(0, 10);
    setDatethreeDaysAfter(formattedDate);
  }, []);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    
  };

  const handleAddAddress = () => {
    if (addressInput.trim() !== "" && addresses.length < 5) {
      setAddresses([...addresses, addressInput]);
      setAddressInput("");
    }
  };

  const handleAddressInputChange = (event) => {
    setAddressInput(event.target.value);
  };
  const handleOptionChangeofdate = (event) => {
    setSelectedOptionofdate(event.target.value);
  };

  useEffect(() => {
    if (price > 0) {
      console.log(selectedOptionofdate);
      // Ensure price is greater than 0 before initializing Razorpay
      const options = {
        key: "rzp_test_GZQWsnxfu8f57I",
        amount: price*100,
        currency: "INR",
        handler: function (response) {
          toast.success("Payment successful!");
          saveOrderDetails();
          setPaymentSuccess(true);
          setTimeout(()=>{        // giving set timeout bcs immediate navigation to the home page ("/") not waiting for toast 
            nav("/invoice", { replace: true });            // replace used for if arrow btn clk it should not go back with login

        },2000)
          
        },
        // Other options...
        
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on("payment.failed", function (response) {
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

  const handlepayment = async () => {
    try {
      const data = {
        amount: price, // Convert to paise for INR
      };
      const res = await axios.post("http://localhost:3010/api/payment", data);
      console.log("Payment initiated successfully:", res.data);
      // Invoke Razorpay payment here
      if (rzp1) {
        rzp1.open();
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      // Handle error appropriately (e.g., show error message to the user)
    }
  };
  localStorage.setItem('address', selectedOption);



  const saveOrderDetails = () => {
    checkoutcart.forEach((card) => {
      const data = {
        imageSrc: card.imageSrc,
        title: card.title,
        Price: card.Price,
        amount: card.amount,
        order_date: selectedOptionofdate
      };

      axios.post("http://localhost:3010/api/order", data)
        .then(res => {
          toast.success('Order saved successfully');
        })
        .catch((err) => {
          const errorMsg = err.response?.data?.message || 'An error occurred while saving the order';
          toast.error(errorMsg);
        });
    });
  };



  return (
    <div className="check-con">
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header className="check-header">
            <CustomToggle eventKey="0">
              <p className="top-tittle">1. Select a delivery address</p>
            </CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="check-card-body">
              <div>
                <h5>Your address:</h5>
                <hr />
                {addresses.map((address, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={`address-${index}`}
                      value={address}
                      checked={selectedOption === address}
                      onChange={handleOptionChange}
                      className="address-radio"
                    />
                    <label className="t2" htmlFor={`address-${index}`}>
                      {address}
                    </label>
                    <hr />
                  </div>
                ))}
              </div>
              <p className="t1">Selected Address: {selectedOption}</p>
              {addresses.length < 5 && (
                <div>
                  <p className="t1">Enter New Your Address:</p>
                  <textarea
                    value={addressInput}
                    onChange={handleAddressInputChange}
                    className="add-textarea"
                    placeholder="Please Enter Your New Address"
                  />
                  <br />
                  <button onClick={handleAddAddress} className="check-add-btn">
                    ADD
                  </button>
                </div>
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card style={{ marginBottom: "10px" }}>
          <Card.Header className="check-header">
            <CustomToggle eventKey="1">
              <p className="top-tittle">2. Delivery</p>
            </CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1" style={{ maxHeight: "auto" }}>
            <Card.Body className="check-card-body">
              <input type="radio" id="dateSevenDaysAfterRadio"  name="date"
                value={dateSevenDaysAfter}
                checked={selectedOptionofdate===dateSevenDaysAfter}
                onChange={handleOptionChangeofdate}
                className="address-radio"
              />
              <label htmlFor="dateSevenDaysAfterRadio">
                <span className="devlivery-span"> Startdard Free Delivery </span>
                <span> ( Est Date {dateSevenDaysAfter})</span>
              </label>
              <br></br>
              <input
                type="radio"
                id="dateSevenDaysAfterRadio"
                name="date"
                value={datethreeDaysLater}
                checked={selectedOptionofdate===datethreeDaysLater}
                onChange={handleOptionChangeofdate}
                className="address-radio"
              />
              <label htmlFor="dateSevenDaysAfterRadio">
                <span className="devlivery-span-d1"> Fast 3 day Delivery at rs-99 </span> 
                <span>( Est Date{datethreeDaysLater})</span>
              </label>
              <p className="t1">Selected Date: {selectedOptionofdate}</p>
              <div></div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card style={{ marginBottom: "10px" }}>
          <Card.Header className="check-header">
            <CustomToggle eventKey="2">
              <p className="top-tittle">3. Payment</p>
            </CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2" style={{ maxHeight: "auto" }}>
            <Card.Body className="check-card-body">
              
              {checkoutcart?.map((card) => (
                <div className="cart-box" key={card._id}>
                  <div className="cart-img">
                    <img src={card.imageSrc} className="payment-img" alt={card.title} />
                    <p className="payment-cart-title">{card.title}</p>
                  </div>
                  <div className="cart-count">
                    <button className="payment-cart-amount">{card.amount}</button>
                  </div>
                  
                  
                    <span className="payment-cart-price">{card.Price}</span>

                    {/* <button onClick={() => handleRemove(card._id)} className='cart-remove'>x</button> */}
                  
                
                </div>
              ))}
              <div className="pay-span-div"><h6>Selected Address: {selectedOption}</h6></div>
            
             <div className="pay-span-div" > <h6>Selected Date: {selectedOptionofdate}</h6></div>

              
                <div className="payment-ttlprice-con">
                  <span>Total</span>
                  <span>₹{price}/-</span>
                
              </div>
              <button onClick={handlepayment} className="payment-btn">pay Now</button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        {/* <Card style={{ marginBottom: "10px" }}>
          <Card.Header>
            <CustomToggle eventKey="3">Click me!</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3" style={{ maxHeight: "auto" }}>
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card> */}
      </Accordion>
    </div>
  );
}

export default Checkout;

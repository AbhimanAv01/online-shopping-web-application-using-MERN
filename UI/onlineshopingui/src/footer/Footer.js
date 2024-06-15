import React from 'react';
import "../css/Footer.css";
import logo from "../images/logo.png";
import care from "../images/careicon.png";
import pcard from "../images/payment-card.png"

const Footer = () => {
  return (
    <div className='main-footer-con'>
        <div className='footer-con'>
      <img src={logo} className="logo-img" alt="Logo"></img><br></br>
      <div className='care-con'>
        <img src={care} className="care-icon" alt="Care Icon"></img>
        <div className='care-text-con'>
        <span className='care-text'>Hotline Free 24/7</span><br></br>
        <span className='care-text2'>(1800-822-900)</span>
      </div>
      </div>
      <div className='address-con'> 
        <span className='address-text'>Addresses:Imarticus Learning, 421, 2nd & 3rd Floor,
             <br></br>opposite Koramangala Indoor Stadium, 6th Block,
             <br></br> Koramangala, Bengaluru, Karnataka 560095</span>
      </div>

      <div className='email-con'>
        <span className='address-text'>Email : </span>
        <span className='care-text2'> abhimanav06@gmail.com</span>
      </div>
      </div>

      <div className='feedback'>
        <span className='feedback-text'>Feedback</span><br></br>
        <span className='address-text'>Tell us more about your experience.</span><br></br>
        <input type='text' className='feedback-input' placeholder=''></input><br></br>
        <button className='feedback-btn'>Send</button><br></br>
     
        <img src={pcard} className='pcard'></img>

      </div>
    </div>
    
  );
}

export default Footer;

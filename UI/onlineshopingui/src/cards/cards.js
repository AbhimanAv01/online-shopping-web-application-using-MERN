import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../css/cards.css";
import shipping from "../images/shipping.png";
import retur from "../images/return.png";
import support from '../images/support.png';
import member from '../images/member.png';
import secure from '../images/payment.png';


function Cards() {
  return (
    <div className="cards-con">
      <Card className="cards">
        <Card.Body className="card-body">
          <div className="title-text-container">
            <img src={shipping} className="shipping-img" alt="Shipping"></img>
            <div>
              <Card.Title>Free Shipping</Card.Title>
              <Card.Text>Free Shipping On All Orders</Card.Text>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="cards">
        <Card.Body className="card-body">
        <div className="title-text-container">
            <img src={retur} className="shipping-img" alt="Shipping"></img>
            <div>
          <Card.Title>Money Guarantee</Card.Title>
          <Card.Text>30 Day Money Back Guarantee</Card.Text>
          </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="cards">
      <Card.Body className="card-body">
        <div className="title-text-container">
            <img src={support} className="shipping-img" alt="Shipping"></img>
            <div>
          <Card.Title>Online Support </Card.Title>
          <Card.Text>Technical Support 24/7</Card.Text>
          </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="cards">
      <Card.Body className="card-body">
        <div className="title-text-container">
            <img src={member} className="shipping-img" alt="Shipping"></img>
            <div>
          <Card.Title>Member Discount</Card.Title>
          <Card.Text>Upto 40% Discount  for All </Card.Text>
          </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="cards">
      <Card.Body className="card-body">
        <div className="title-text-container">
            <img src={secure} className="shipping-img" alt="Shipping"></img>
            <div>
          <Card.Title>Secure Payment</Card.Title>
          <Card.Text>All Cards Accepted</Card.Text>
          </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Cards;

import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "../css/Topmobilesale.css";
import axios from "axios";

function Topmobilesale({handleclk}) {
  const[Mob,setMob]=useState([]);

  const extractmob=async()=>{
    const res = await axios.get("http://localhost:3010/api/topmobiles");
    console.log(res.data);
    setMob(res.data);
  }
useEffect(()=>{
  extractmob();
},[]); 

  return (
    <div className="both">
      <div className="sidemenu">


        <h2>Top Mobiles Brands</h2>
        <ul className="styled-list">
          <li>Apple</li>
          <li>Samsung</li>
          <li>oneplus</li>
          <li>Nothing</li>
        </ul>
      </div>



      <div className="tmscrollable-container">
        {Mob.map((card, index) => (
          <div key={index} className="tmcards-con">
            <Card className=" tmcards">
              
                <img src={card.imageSrc} className="tmshipping-img"/>
                <div className="tmtitle-text-container">
                  
                    <Card.Title className="tmctitle">{card.title}</Card.Title>
                    <Card.Text className="tmprice">{card.Price}</Card.Text>
                    <Card.Text className="tmtxt">{card.description}</Card.Text>
                  
                </div>
                <button className="addcartmbl-btn" onClick={()=>handleclk(card)}>ADD CART</button>
            </Card>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Topmobilesale;

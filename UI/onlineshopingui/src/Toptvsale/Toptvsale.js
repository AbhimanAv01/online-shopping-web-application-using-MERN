import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "../css/Topsaletv.css";
import axios from "axios";

function Toptvsale({handleclk}) {
  const [Lap,setLap]=useState([]);

  const extractlap=async()=>{
    const res = await axios.get("http://localhost:3010/api/tv");
    console.log(res.data);
    setLap(res.data);
  }
useEffect(()=>{
  extractlap();
},[]);

  return (<div className="topsale-main-con">
    <div className="header">
    <span className="best-selling-lap">Top Selling Televisions</span>
  </div>
    <div className="tv-scrollable-container">
  
      {Lap.map((card, index) => (
        <div key={index} className="tscards-con">
          <Card className="tscards">
            <img src={card.imageSrc} className="tv-tsshipping-img"/>
            <div className="tstitle-text-container">

              <Card.Title className="tsctitle">{card.title}</Card.Title>
              <Card.Text className="price">{card.Price}</Card.Text>
              <Card.Text className="txt">{card.description}</Card.Text>
              
            </div>
            <button className="addcart-btn" onClick={()=>handleclk(card)} >ADD CART</button>
          </Card>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Toptvsale;

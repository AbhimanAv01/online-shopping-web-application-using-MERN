import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../dashboard.js/dashboard";
import Slide from "../dashboard.js/slides";
import Cards from "../cards/cards";
import { Add, Addbtm,Addmid,Add4 } from '../add/Add';
import Footer from "../footer/Footer";
import Topmobilesale from "../Topmonbilesale/Topmobilesale";
import TopsaleCards from "../Toplaptopsale/TopsaleCards";
import Categories from "../categories/Categories";



import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Toptvsale from "../Toptvsale/Toptvsale";


function Main({handleclk}){
    
  return (
    <div>
      
      <Slide />
      <Cards />
      <TopsaleCards handleclk={handleclk} />
      <Add />
      <Topmobilesale handleclk={handleclk} />
     
      <Addmid />
      <Toptvsale handleclk={handleclk} />
      <Add4 />
      
      
    </div>
  )
}

export default Main

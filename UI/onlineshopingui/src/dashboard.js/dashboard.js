import "../css/dashboard.css";
import React, { useContext, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/logo.png";
import Categories from "../categories/Categories.js";
import Cart from "../cart/Cart.js";
import { Link, useNavigate, useLocation } from "react-router-dom";
import User_info_context from "../Context/user_info_context.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch,FaRegUser,FaCartArrowDown   } from "react-icons/fa";
import NavDropdown from "react-bootstrap/NavDropdown";
import Your_order from "../Your_order/Your_order";

function Dashboard({ cartsize, cart, setCart, handleChange }) {
  const location = useLocation();
  const userlogin = localStorage.getItem("username");
  const [search, setSearch] = useState("");
  const nav = useNavigate();
  const { user_info, setUser_info } = useContext(User_info_context);

  // Cart show
  const [show, setShow] = useState(false);
  const handleShow = (event) => {
    event.preventDefault();
    setShow(true);
  };
  const handleClose = () => setShow(false);

 //your oder show
const [yourshow, setyourshow] = useState(false);
  const handleyourShow = (event) => {
    event.preventDefault();
    setyourshow(true);
  };
  const handleyourClose = () => setyourshow(false);


  const handleLoginRedirect = () => {
    if (!user_info) {
      nav("/login", { replace: true });
    }
    else{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
     nav("/login", { replace: true }); 
    toast.success("Logout Successful");
    }
    
    
  };

// Search
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    if (search.toLowerCase() === "laptop") {
      nav("/listoflap");
    }

    if (search.toLowerCase() === "mobile") {
      nav("/listofmob");
    }

    if (search.toLowerCase() === "tv") {
      nav("/listoftv");
    }

    if (search.toLowerCase() === "headphone") {
      nav("/Listofheadphone");
    }


    if (location.pathname === "/checkout") {
      return null;
    }
  };



  // Header visibility state
  const [showHeader, setShowHeader] = useState(true);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        // Scrolling up
        setShowHeader(true);
      } else {
        // Scrolling down
        setShowHeader(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div>
      <div className={`container-1 ${showHeader ? 'show' : 'hide'}`}>
        <div className="inner-container-1">
          <Form>
          <Link to="/">
            <img src={logo} className="logo-img" alt="Logo" />
          </Link>
            <input
              type="text"
              className="search-Bar"
              placeholder="Search products"
              onChange={handleSearchChange}
              value={search}
            />
            <button
              type="button"
              value={search}
              onClick={handleSearch}
              className="search-btn"
            >
             

              <FaSearch className="search-icon" /> SEARCH
            </button>
           
            <button className="user-icon"><FaRegUser /></button>
                   <NavDropdown title={`Hello, ${userlogin ? userlogin : "Please login"}`}  className="user-span" >
                    <NavDropdown.Item href="#action/3.1" onClick={handleyourShow }>Your Oder</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4" onClick={handleLoginRedirect}>{`${userlogin? "Logout" : "Login"}`} </NavDropdown.Item>
                </NavDropdown>
        
            



            <button className="cart-icon" onClick={handleShow}>
            <FaCartArrowDown /><span className="cart-size">{cartsize}</span>
            </button>
            <span className="user-span" onClick={handleShow}>
              My Cart
            </span>
            <hr className="hr-container-1"></hr>
          </Form>
          <Categories />
        </div>
      </div>

      <Cart
        show={show}
        handleClose={handleClose}
        cart={cart}
        setCart={setCart}
        handleChange={handleChange}
      />

    <Your_order
    yourshow={yourshow}
    handleyourClose={handleyourClose}
    />
    </div>
  );
}

export default Dashboard;

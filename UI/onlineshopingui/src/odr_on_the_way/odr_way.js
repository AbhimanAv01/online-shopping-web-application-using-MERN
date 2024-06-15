import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/odr_way.css';

const OdrWay = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 8000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="gif-container">
      <h1>Thank you</h1>
      <h1>Your order is on the way</h1>
      <iframe
        className='gif'
        src="https://cdn.dribbble.com/users/2067022/screenshots/4186739/______.gif"
        frameBorder="0"
        allowFullScreen
        title="Order on the way animation"
      ></iframe>
    </div>
  );
};

export default OdrWay;

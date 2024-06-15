import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CartContextProvider from "./Context/CarContextProvider";
import User_info_contextprovider from "./Context/user_info_contextprovider";
import { PaymentProvider } from './Context/Paymentcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartContextProvider>
    <User_info_contextprovider>
    <PaymentProvider>
    <App />
    </PaymentProvider>
    </User_info_contextprovider>
    </CartContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

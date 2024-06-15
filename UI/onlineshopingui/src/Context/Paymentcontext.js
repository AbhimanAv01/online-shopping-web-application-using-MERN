// PaymentContext.js
import React, { createContext, useState } from 'react';

const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  return (
    <PaymentContext.Provider value={{ paymentSuccess, setPaymentSuccess }}>
      {children}
    </PaymentContext.Provider>
  );
};

export { PaymentContext, PaymentProvider };
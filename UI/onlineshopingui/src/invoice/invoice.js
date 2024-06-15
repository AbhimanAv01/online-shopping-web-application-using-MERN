import React, { useContext, useRef, useEffect } from 'react';
import "../css/invoice.css";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../images/logo.png';
import { PaymentContext } from '../Context/Paymentcontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Invoice = () => {
  const { setPaymentSuccess, paymentSuccess } = useContext(PaymentContext);
  const actionsCompletedRef = useRef(false);  // Ref to track if actions are completed

  const userlogin = localStorage.getItem('username');
  const Phoneno = localStorage.getItem('rzp_checkout_user_id');
  const address = localStorage.getItem('address');
  const email = localStorage.getItem('Emailid');
  const checkoutcart = JSON.parse(localStorage.getItem("cart")) || [];
  const chckpice = localStorage.getItem("checkout-price");
  const currentDate = new Date().toISOString().split('T')[0];

  const navigate = useNavigate();
  const pdfRef = useRef();

  useEffect(() => {
    if (paymentSuccess && !actionsCompletedRef.current) {
      actionsCompletedRef.current = true;  // Prevent further executions

      const performActions = async () => {
        downloadPDF();
        handleSendEmail();
        setPaymentSuccess(false);
        setTimeout(()=>{        // giving set timeout bcs immediate navigation to the home page ("/") not waiting for toast 
          navigate("/on_the_way")           // replace used for if arrow btn clk it should not go back with login
        },2)
        ;  // Redirect to another page
      };

      const downloadPDF = () => {
        const input = pdfRef.current;
        return html2canvas(input, { scale: 2 }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4', false);

          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();

          const imgWidth = canvas.width;
          const imgHeight = canvas.height;

          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

          const imgScaledWidth = imgWidth * ratio;
          const imgScaledHeight = imgHeight * ratio;

          const imgX = (pdfWidth - imgScaledWidth) / 2;
          const imgY = (pdfHeight - imgScaledHeight) / 2;

          pdf.addImage(imgData, 'PNG', imgX, imgY, imgScaledWidth, imgScaledHeight);
          pdf.save('invoice.pdf');
        });
      };

      const handleSendEmail = () => {
        const data = { recipientEmail: email };
        return axios.post('http://localhost:3010/api/mail', data)
          .then(response => {
            console.log('Email sent:', response.data);
          })
          .catch(error => {
            console.error('Error sending email:', error);
          });
      };

      performActions();
    }
  }, [paymentSuccess, setPaymentSuccess, navigate, email]);

  return (
    <div className="py-4" ref={pdfRef}>
      <div className="px-14 py-6" id='date'>
        <table className="w-full border-collapse border-spacing-0">
          <tbody>
            <tr>
              <td className="w-full align-top">
                <div>
                  <img src={logo} className="h-12" alt="Logo" />
                </div>
              </td>
              <td className="align-top">
                <div className="text-sm">
                  <table className="border-collapse border-spacing-0">
                    <tbody>
                      <tr>
                        <td className="border-r pr-4">
                          <div>
                            <p className="whitespace-nowrap text-slate-400 text-right">Date</p>
                            <p className="whitespace-nowrap font-bold text-main text-right">{currentDate}</p>
                          </div>
                        </td>
                        <td className="pl-4">
                          <div>
                            <p className="whitespace-nowrap text-slate-400 text-right">Invoice #</p>
                            <p className="whitespace-nowrap font-bold text-main text-right">BRA-00335</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-slate-100 px-14 py-6 text-sm">
        <table className="w-full border-collapse border-spacing-0">
          <tbody>
            <tr>
              <td className="w-1/2 align-top">
                <div className="text-sm text-neutral-600">
                  <p className="font-bold">Supplier Company INC</p>
                  <p>NITROTECH.ORG</p>
                  <p>VAT: 23456789</p>
                  <p> Mangaluru </p>
                  <p>Karnataka 575028</p>
                </div>
              </td>
              <td className="w-1/2 align-top text-right">
                <div className="text-sm text-neutral-600">
                  <p className="font-bold">Customer</p>
                  <p>{userlogin}</p>
                  <p>{Phoneno}</p>
                  <p>{address}</p>
                  <p>KARNATAKA</p>
                  <p>INDIA</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="px-14 py-10 text-sm text-neutral-700">
        <table className="w-full border-collapse border-spacing-0">
          <thead>
            <tr>
              <td className="border-b-2 border-main pb-3 pl-3 font-bold text-main">#</td>
              <td className="border-b-2 border-main pb-3 pl-2 font-bold text-main">Product details</td>
              <td className="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">Price</td>
              <td className="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">Qty.</td>
              <td className="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">Price</td>
            </tr>
          </thead>
          <tbody>
            {checkoutcart?.map((card, index) => (
              <tr key={card._id}>
                <td className="border-b py-3 pl-3">{index + 1}</td>
                <td className="border-b py-3 pl-2">
                  <p className="cart-title">{card.title}</p>
                </td>
                <td className="border-b py-3 pl-2 text-right">{card.Price}</td>
                <td className="border-b py-3 pl-2 text-center">{card.amount}</td>
                <td className="border-b py-3 pl-2 text-right">{(card.Price * card.amount).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="5">
                <table className="w-full border-collapse border-spacing-0">
                  <tbody>
                    <tr>
                      <td className="w-full"></td>
                      <td>
                        <table className="w-full border-collapse border-spacing-0">
                          <tbody>
                            <tr></tr>
                            <tr></tr>
                            <tr>
                              <td className="bg-main p-3">
                                <div className="whitespace-nowrap font-bold text-white">Total:</div>
                              </td>
                              <td className="bg-main p-3 text-right">
                                <div className="whitespace-nowrap font-bold text-white">{chckpice}</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer className="fixed bottom-0 left-0 bg-slate-100 w-full text-neutral-600 text-center text-xs py-3">
        NiTROTECH
        <span className="text-slate-300 px-2">|</span>
        nitrotech.org@gmail.com
        <span className="text-slate-300 px-2">|</span>
        8748028610
      </footer>
    </div>
  );
};

export default Invoice;

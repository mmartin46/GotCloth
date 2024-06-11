// John 3:5
import { useEffect, useState, useRef, useReducer } from 'react';

// For all files
import Header from './components/headers/Header.jsx';
import Footer from './components/footers/Footer.jsx';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './index.css';
import SecondaryHeader from './components/headers/SecondaryHeader.jsx';
import CartLayout from './components/layouts/authentification/CartLayout.jsx';
import RegisterLayout from './components/layouts/authentification/RegisterLayout.jsx';
import LoginLayout from './components/layouts/authentification/LoginLayout.jsx';
import { ShoesLayout, PantsLayout, ShirtsLayout } from './components/layouts/general/MainLayouts.jsx';
import ProductLayout from './components/layouts/general/ProductLayout.jsx';
import { MainLayout } from './components/layouts/general/MainLayout.jsx';
import { useUsername } from './components/UseUsername.jsx';
import Invisible from './components/labels/Invisible.jsx';

const ScreenRoutes = () => {
    return (
       <Routes>
           <Route path="/" element={<MainLayout />} />
           <Route path="pants" element={<PantsLayout />} />
           <Route path="shirts" element={<ShirtsLayout />} />
           <Route path="shoes" element={<ShoesLayout />} />
           <Route path="register" element={<RegisterLayout />} />
           <Route path="login" element={<LoginLayout />} />
           <Route path="product" element={<ProductLayout />} />
           <Route path="cart" element={<CartLayout />} />
           <Route path="payment" element={<PaymentLayout />} />
        </Routes>
    );
};

const PaymentLayout = () => {
    const { username } = useUsername();

    const [paymentModel, setPaymentModel] = useState({
        username: username,
        owner: '',
        cardNumber: '',
        expirationDate: '',
        cvc: ''
    });


    const setChanges = (e) => {
        setPaymentModel({
            ...paymentModel,
            [e.target.name]: e.target.value,
        });
    };



    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("https://localhost:7269/payment", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentModel)
        });

        if (response.ok) {
            console.log('Paid successfully');
        } else {
            const errorMessage = await response.text();
            console.log(`Error submitting payment -> ${errorMessage}`);
        }
    }


    return (
        <div>
            <form onSubmit={onSubmit}>

                <div className="paymentFrame">
                    <h4>Payment Information</h4>
                    <div className="pay-inputs debug-border">
                        <label htmlFor="owner">Owner</label>
                        <input onChange={setChanges} type="text" name="owner" id="owner" value={paymentModel.owner}></input>
                        <label htmlFor="cardNumber">Card Number</label>
                        <input onChange={setChanges} type="text" name="cardNumber" id="cardNumber" value={paymentModel.cardNumber}></input>
                        <label htmlFor="expirationDate">Expiration Date</label>
                        <input onChange={setChanges} type="text" name="expirationDate" id="expirationDate" value={paymentModel.expirationDate}></input>
                        <label htmlFor="cvc">CVC</label>
                        <input onChange={setChanges} type="text" name="cvc" id="cvc" value={paymentModel.cvc}></input>
                        <br />
                        <div className="total">
                            <h6>Tax: $6.00</h6>
                            <h6>Subtotal: $6.00</h6>
                            <h4>Total: $150.00</h4>

                        </div>
                        <button className="buyBtn" style={{ color: 'white' }} type="submit">
                            Purchase
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
};

function App() {

    return (
        <BrowserRouter>
            <div className="fullscreen">
                <Header />
                <SecondaryHeader />
                <ScreenRoutes />
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
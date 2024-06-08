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
       </Routes>
    );
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
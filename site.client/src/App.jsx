// John 3:5
import { useEffect, useState } from 'react';

// For all files
import Header from './components/Header.jsx';
import SecondaryHeader from './components/SecondaryHeader.jsx';
import Footer from './components/Footer.jsx';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom"


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LinkButton from './components/LinkButton.jsx';

import './index.css';
import headImage from 'C:\\Users\\mitch\\Downloads\\WebApp\\Site\\site.client\\src\\images\\headimage.jpg';
import shutterImage from 'C:\\Users\\mitch\\Downloads\\shutterstock_266498825.jpg';
import PageCarousel from './components/PageCarousel.jsx';
import BigLabel from './components/BigLabel.jsx'; 
import PantsColumns from './components/PantsColumns.jsx';


const ScreenRoutes = () => {
    return (
        <div className="">
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<MainLayout />} />
                        <Route path="pants" element={<PantsLayout />} />
                        <Route path="shirts" element={<ShirtsLayout />} />
                        <Route path="shoes" element={<ShoesLayout/> } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

const ShoesLayout = () => {
    return (
        <div>
            <BigLabel header="SHOES" subheader="You may wanna wear more than socks today."/>
        </div>
    );
};



const PantsLayout = () => {

    return (
        <>
            <BigLabel header="PANTS" subheader="Not in the mood to wear shorts, wear these instead"/>
            <div className="my-container">
                <PantsColumns />
            </div>
        </>
    );
};


const ShirtsLayout = () => {
    return (
        <div>
            <BigLabel header="SHIRTS" subheader="Getting hot? You may not wanna wear a sweater." />
        </div>
    )
};



const HeaderProducts = () => {
    return (
        <div className="sections row text-center">
            <div id="shirt" className="col">
                <Link to="/shirts" style={{ textDecoration: 'none', color: 'black' }}>
                    <h2 className="display-4">SHIRTS</h2>
                </Link>
            </div>
            <div id="jeans" className="col">
                <Link to="/pants" style={{ textDecoration: 'none', color: 'black' }}>
                    <h2 className="display-4">JEANS</h2>
                </Link>
            </div>
            <div id="shoes" className="col">
                <Link to="/shoes" style={{ textDecoration: 'none', color: 'black' }}>
                    <h2 className="display-4">SHOES</h2>
                </Link>
            </div>
        </div>
    );
};



const MainLayout = () => {
    return (
        <div>
            <PageCarousel/>
            <HeaderProducts/>
        </div>
    );
};

function App() {
    return (
        <>
            <Header />
            <SecondaryHeader/>
            <ScreenRoutes />
            <Footer />
        </>
    )
}

export default App;
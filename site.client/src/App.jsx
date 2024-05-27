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

const PantsColumns = (props) => {
    const [pantsImages, setPantsImages] = useState([]);

    const pantsUrl = 'https://localhost:7269/Images';

    useEffect(() => {
        const fetchPantsImages = async () => {
            try {
                const response = await fetch(pantsUrl);
                if (!response.ok) {
                    throw new Error('Error getting pants data');
                }
                const data = await response.json();
                console.log(data);
                setPantsImages(data);
            } catch (error) {
                console.error('Couldn\'t fetch images');
            }
        };

        fetchPantsImages();

        console.log(pantsImages);
    }, [pantsUrl]);

    return (
        <div className="container">
            <div className="my-row">
                {pantsImages && (
                    pantsImages.map((pants, index) => (
                        <div key={index} className="col my-col">
                            <img className="btn-for-image" src={pants.link} />
                            <h5 style={{
                                fontWeight: '300',
                                color: 'rgba(0,0,0,.8)'
                            }}>{pants.title.substring(0, 29) + '...'}</h5>
                            <h5>$10.99</h5>
                            <div className="btn-block">
                                <span className="add-to-cart">Add to Cart</span>
                                <span className="buy-now">Buy Now</span>
                            </div>
                        </div>
                    ))
                )}
                {!pantsImages && <h4>No products available. :(</h4>}
            </div>
        </div>
    );
}

const BigLabel = (props) => {
    const { header, subheader, color } = props;

    let chosenColor = 'rgba(200, 0, 0, 1)';
    switch (color) {
        case 'red':
            chosenColor = 'rgba(200, 0, 0, 1)';
            break;
        case 'blue':
            chosenColor = 'rgba(0, 0, 200, 1)';
            break;
        case 'green':
            chosenColor = 'rgba(0, 200, 0, 1)';
            break;
    }



    return (
        <>
            <div className="big-label" style={{ backgroundColor: chosenColor }}>
                <h1 className="text-center">{header.toUpperCase()}</h1>
                <h4 className="text-center">{subheader}</h4>
            </div>
            <div className="my-container">
                <PantsColumns />
            </div>
        </>
    );
}


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
            </div>g
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
// John 3:5
import { useEffect, useState } from 'react';

// For all files
import Header from './components/Header.jsx';
import SecondaryHeader from './components/SecondaryHeader.jsx';
import Footer from './components/Footer.jsx';
import axios from 'axios';


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
                        <Route path="shirts" element={<ShirtsLayout/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

const PantsLayout = () => {
    const [pantsImages, setPantsImages] = useState([]);

    const pantsUrl = '/Home/Index';

    useEffect(() => {
        const fetchPantsImages = async () => {
            try {
                const response = await axios.get(pantsUrl);
                setPantsImages(response.data);
            } catch (error) {
                console.error('Couldn\'t fetch images');
            }
        };

        fetchPantsImages();
    }, []);

    return (
        <div className="my-container">
            <h4 className="text-center">PANTS</h4>
        </div>
    );
};

const ShirtsLayout = () => {
    return (
        <div>
        </div>
    )
}



const HeaderProducts = () => {
    return (
        <div className="sections row text-center">
            <div id="shirt" className="col">
                <h2 className="display-4">SHIRTS</h2>
            </div>
            <div id="jeans" className="col">
                <h2 className="display-4">JEANS</h2>
            </div>
            <div id="shoes" className="col">
                <h2 className="display-4">SHOES</h2>
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
// John 3:5
import { useEffect, useState } from 'react';

// For all files
import Header from './components/Header.jsx';
/*import SecondaryHeader from './components/SecondaryHeader.jsx';*/
import Footer from './components/Footer.jsx';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";

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
import ImageColumns from './components/ImageColumns.jsx';
import SecondaryHeader from './components/SecondaryHeader.jsx';
import PlainLink from './components/PlainLink.jsx';


const ShoesLayout = () => {
    return (
        <>
            <div>
                <BigLabel header="SHOES" subheader="You may wanna wear more than socks today." />
                <div className="my-container">
                    <ImageColumns name="shoe" />
                </div>
            </div>
            <BodySection title="LOW-PRICE PANTS"
                    description="Looking for low-priced pants, feel free to look. Check here!"
                    route="pants"
                    color="antiquewhite" />
        </>
    );
};



const PantsLayout = () => {

    return (
        <>
            <BigLabel header="PANTS" subheader="Not in the mood to wear shorts, wear these instead"/>
            <div className="my-container">
                <ImageColumns name="pants" />
            </div>
            <BodySection title="LOW-PRICE SHOES"
                description="Looking for low-priced shoes, feel free to look. Check here!"
                route="shoes"
                color="antiquewhite" />
        </>
    );
};


const ShirtsLayout = () => {
    return (
        <>
            <div>
                <BigLabel header="SHIRTS" subheader="Getting hot? You may not wanna wear a sweater." />
                <div className="my-container">
                    <ImageColumns name="shirt" />
                </div>
            </div>
                        <BodySection title="LOW-PRICE SHOES"
                    description="Looking for low-priced shoes, feel free to look. Check here!"
                    route="shoes"
                    color="antiquewhite" />
        </>
    )
};



const HeaderProducts = () => {
    return (
        <div className="sections row text-center">
            <div id="shirt" className="sec col">
                <PlainLink to="/shirts" fontColor='black'>
                    <h2 className="display-4">SHIRTS</h2>
                </PlainLink>
            </div>
            <div id="jeans" className="sec col">
                <Link to="/pants" style={{ textDecoration: 'none', color: 'black' }}>
                    <h2 className="display-4">JEANS</h2>
                </Link>
            </div>
            <div id="shoes" className="sec col">
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
            <PageCarousel />
            <HeaderProducts />
            <BodySection title="CHEAP SHOES"
                description="Need some solid deals for shoes as low as $10.99. Check here!"
                route="shoe"
                color="antiquewhite" />
            <BodySection title="LOW-PRICE DEALS"
                description="Looking for low-price pants, feel free to look. Check here!"
                route="pants"
                color="white" />
        </div>
    );
};


const BodySection = (props) => {
    const { title, description, route, color } = props;
    
    const [images, setImages] = useState([]);
    const url = `https://localhost:7269/Images/${route}`;

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error getting ${route} data`);
                }
                const data = await response.json();
                console.log(data);
                setImages(data);
            } catch (error) {
                console.error('Couldn\'t fetch images');
            }
        }

        fetchImages();
    }, [url]);

    return (
        <div className="body-section" style={{ backgroundColor: `${color}` } }>
            <div className="text-center">
                <h1>
                    {title}
                </h1>
                <h6>{description}</h6>
            </div>

            <div className="my-row row">
                {images && (
                    images.slice(0, 4).map((image, index) => (
                        <div key={index} className="col">
                            <div className="sec my-col card">
                                <img className="btn-for-image" src={image.link} />
                                <h6>{image.title.substring(0, 29) + '...'}</h6>
                                <h5>$10.99</h5>
                                <div className="btn-block">
                                    <span className="add-to-cart">Add to Cart</span>
                                    <span className="buy-now">Buy Now</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                {!images && (<div className="text-center"><h6>No products found :(</h6></div>)}
            </div>
            <PlainLink to="/shoes" fontColor='black'>
                {images && (<h4 className="sec text-center add-pad">View More</h4>)}
            </PlainLink>

        </div>
    )
}


const ScreenRoutes = () => {
    return (
       <Routes>
           <Route path="/" element={<MainLayout />} />
           <Route path="pants" element={<PantsLayout />} />
           <Route path="shirts" element={<ShirtsLayout />} />
           <Route path="shoes" element={<ShoesLayout />} />
       </Routes>
    );
};

function App() {
    return (
        <BrowserRouter>
            <Header />
            <SecondaryHeader/>
            <ScreenRoutes />
            <Footer />
        </BrowserRouter>
    )
}

export default App;
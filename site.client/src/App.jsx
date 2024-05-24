import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './index.css'
import headImage from 'C:\\Users\\mitch\\Downloads\\WebApp\\Site\\site.client\\src\\images\\headimage.jpg';
import shutterImage from 'C:\\Users\\mitch\\Downloads\\shutterstock_266498825.jpg';
 
const Header = () => {
    // FIXME: Not fully implemented
    return (
        <div className="header">
            <ul>
            </ul>
        </div>
    );
};

const SecondaryHeader = () => {
    // FIXME: Not fully implemented
    return (
        <div className="secondaryHeader">
        </div>
    );
}

const ScreenDisplay = () => {
    return (
        <div className="">
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<MainLayout />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}


const Footer = () => {
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    return (
        <div className="footer text-center">
            <h3>&copy;Copyright {year} Mitchell Martin</h3>
        </div>
    );
};

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

const LinkButton = (props) => {
    const { title, caption, buttonTitle } = props;

    return (
        <div className="make-big text-center">
            <h2>{title}</h2>
            <p>{caption}</p>

            <div className="typicalButton">
                <h3>{buttonTitle.toUpperCase()}</h3>
            </div>
        </div>
    );
};


const MainLayout = () => {
    return (
        <div>
            <Carousel>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src={headImage}
                    />
                    <Carousel.Caption>
                        <LinkButton title="40% Off Shirts" caption="With a purchase over $25.00" buttonTitle="Shop Now" />
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        id="carousel-img"
                        className="d-block w-100"
                        src={shutterImage}
                    />
                    <Carousel.Caption interval={2000}>
                        <LinkButton title="30% Off Pants" caption="With a purchase over $15.00" buttonTitle="Shop Now"/>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <HeaderProducts/>
        </div>
    );
};

function App() {
    return (
        <>
            <Header />
            <SecondaryHeader/>
            <ScreenDisplay />
            <Footer />
        </>
    )
}

export default App;
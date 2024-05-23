import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

import './index.css'
import headImage from 'C:\\Users\\mitch\\Downloads\\WebApp\\Site\\site.client\\src\\images\\headimage.jpg';
import shutterImage from 'C:\\Users\\mitch\\Downloads\\shutterstock_266498825.jpg';
 
const Header = () => {

    return (
        <div className="header">
            <ul>
            </ul>
        </div>
    );
};


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
}

const LinkButton = (props) => {
    const { title } = props;

    return (
        <div className="make-big text-center">
            <h2>40% Off On Jeans</h2>
            <p>With a purchase over $45.00</p>

            <div className="typicalButton">
                <h3>{title.toUpperCase()}</h3>
            </div>
        </div>
    );
}


function App() {
    return (
        <>
            <Header />
            <Carousel>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src={headImage}
                    />
                    <Carousel.Caption>
                        <div className="make-big">
                            <h2>30% Off On Shorts</h2>
                            <p>With a purchase over $15.00</p>
                            <div className="typicalButton">
                                <h3>SHOP NOW</h3>
                            </div>
                        </div>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={shutterImage}
                    />
                    <Carousel.Caption interval={2000}>
                        <LinkButton title="Shop Now"/>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <HeaderProducts/>
            <Footer />
        </>
    )
}

export default App;
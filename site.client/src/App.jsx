import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import headImage from 'C:\\Users\\mitch\\Downloads\\WebApp\\Site\\site.client\\src\\images\\headimage.jpg';

const Header = () => {

    return (
        <div className="header">
            <ul>
            </ul>
        </div>
    );
};


const Footer = () => {
    return (
        <div className="footer">
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


function App() {
    return (
        <>
            <Header />
            <div>
                {/*
                <div id="carouselIndicators" className="carousel slide">
                    <div className="carousel-indicators">
                        <button type="button" className="active" data-bs-target="#carouselIndicators" data-bs-slide-to="0" aria-current="true"></button>
                    </div>
                </div>*/}
                <div className="carousel-inner">
                    <h3 className="display-4">30% Off On Shorts<h6>With a purchase over $15.00</h6></h3>
                    <img src={headImage} className="d-block w-100"></img>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <HeaderProducts/>
            <Footer />
        </>
    )
}

export default App;
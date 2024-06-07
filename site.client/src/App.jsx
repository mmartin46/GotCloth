// John 3:5
import { useEffect, useState, useRef, useReducer } from 'react';

// For all files
import Header from './components/headers/Header.jsx';
/*import SecondaryHeader from './components/SecondaryHeader.jsx';*/
import Footer from './components/footers/Footer.jsx';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LinkButton from './components/buttons/LinkButton.jsx';

import './index.css';
import PageCarousel from './components/PageCarousel.jsx';
import BigLabel from './components/labels/BigLabel.jsx'; 
import ImageColumns from './components/ImageColumns.jsx';
import SecondaryHeader from './components/headers/SecondaryHeader.jsx';
import PlainLink from './components/buttons/PlainLink.jsx';
import { UsernameProvider, useUsername } from './components/UseUsername.jsx';
import Product from './components/Product.jsx';
import Invisible from './components/labels/Invisible.jsx';
import CartLayout from './components/layouts/authentification/CartLayout.jsx';
import RegisterLayout from './components/layouts/authentification/RegisterLayout.jsx';
import LoginLayout from './components/layouts/authentification/LoginLayout.jsx';
import HeaderProducts from './components/sections/HeaderProducts.jsx';

import headImage from 'C:\\Users\\mitch\\Downloads\\WebApp\\Site\\site.client\\src\\images\\headimage.jpg';
import shutterImage from 'C:\\Users\\mitch\\Downloads\\shutterstock_266498825.jpg';


const GeneralImageLayout = ({ header, subheader, name, title, description, route, color }) => {
    return (
        <>
            <div>
                <BigLabel header={header} subheader={subheader} />
                <div className="my-container">
                    <ImageColumns name={name} />
                </div>
            </div>
            <BodySection title={title}
                description={description}
                route={route}
                color={color} />
        </>
    )
};

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

class Image {
    constructor(imgSrc, link, title, caption, btnTitle) {
        this.imgSrc = imgSrc;
        this.link = link;
        this.title = title;
        this.caption = caption;
        this.btnTitle = btnTitle;
    }
};


const MainLayout = () => {
    const images = [];
    images.push(new Image(
        headImage,
        '/shirts',
        '40% Off Shirts',
        'With a purchase over $25.00',
        'Shop Now'
    ));
    images.push(new Image(
        shutterImage,
        '/pants',
        '30% Off Pants',
        'With a purchase over $15.00',
        'Shop Now'
    ));


    return (
        <div>
            <PageCarousel images={images} />
            <HeaderProducts />
            <BodySection title="CHEAP SHOES"
                description="Need some solid deals for shoes as low as $10.99. Check here!"
                route="shoe"
                color="antiquewhite" />
            <BodySection title="LOW-PRICE DEALS"
                description="Looking for low-price pants, feel free to look. Check here!"
                croute="pants"
                color="white" />
        </div>
    );
};




const ProductLayout = () => {
    const [imageData, setImageData] = useState([]);

    const { username } = useUsername();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const title = urlParams.get('title');
        const category = urlParams.get('category');
        console.log(title.substring(0, title.length - 4), category);

        let url = `https://localhost:7269/Product?title=${title}&category=${category}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    console.log('Response wasn\'t okay');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setImageData(data);
            })
            .catch(error => { 'Failed fetch', error });

    }, []);


    const addToCart = async (username, title) => {
        try {
            const response = await fetch("https://localhost:7269/AddToCart", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    title: title
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }

    };


    return (
        <div className="prod-bkg">
            {imageData &&
                <div className="row prod-row">
                    <div className="col">
                        <img src={imageData.link} />
                    </div>
                    <div className="col prod-sec">
                        <h2>{imageData.title}</h2>
                        <p>Adiqi ipefi aoata usuzu uzeuw ceqbe ifive akodi ounuf egawu, evufe aneyu uzino usaxi utden eiret awogo izalo ufole ipedi, upoir oibob usidu iqaqe avage okozi odaxi ozoxk evata iwuve, pievo uxoye wabea esiro avaxy uqayo ezovp ecife uiowi ucicu.</p>
                        <h6>$10.00</h6>

                        <div className="add-cart-btn" onClick={() => addToCart(username, imageData.title)}>
                            Add To Cart
                        </div>
                    </div>
                </div>
            }
            {!imageData && <h3>Product Not Found :(</h3>}
        </div>
    );
};



const BodySection = (props) => {
    const { title, description, route, color } = props;

    const [images, setImages] = useState([]);
    const url = `https://localhost:7269/Images/${route}`;

    let linkRoute = `/${route}`;

    if (linkRoute === '/shoe') {
        linkRoute += 's';
    }


    let cartLink = '/login';

    const { username } = useUsername();
    if (username !== 'Guest') {
        cartLink = '/cart';
    }
    console.log(cartLink);
    console.log(username);

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
        if (!images || images.length <= 0) {
            fetchImages();
        }
    }, [url]);

    return (
        <div className="body-section" style={{ backgroundColor: `${color}` }}>
            <div className="text-center">
                <h1>
                    {title}
                </h1>
                <h6>{description}</h6>
            </div>

            <div className="my-row row">
                {images && (
                    images.slice(0, 4).map((image, index) => {
                        const link = `/product?title=${image.title}&category=${route}`;
                        return (
                            <div key={index} className="col">
                                <PlainLink to={link} >
                                    <div className="sec my-col card">
                                        <img className="btn-for-image" src={image.link} />
                                        <h6>{image.title.substring(0, 29) + '...'}</h6>
                                        <h5>$10.99</h5>
                                        <div className="btn-block">
                                            <span className="add-to-cart">Add to Cart</span>
                                            <PlainLink to={cartLink} fontColor='black'>
                                                <span className="buy-now">Buy Now</span>
                                            </PlainLink>
                                        </div>
                                    </div>
                                </PlainLink>
                            </div>
                        );
                    })
                )}
                {!images && (<div className="text-center"><h6>No products found :(</h6></div>)}
            </div>
            <PlainLink to={linkRoute} fontColor='black'>
                {images && (<h4 className="sec text-center add-pad">View More</h4>)}
            </PlainLink>

        </div>
    )
};


const ScreenRoutes = (props) => {
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
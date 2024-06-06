// John 3:5
import { useEffect, useState, useRef } from 'react';

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
import { UsernameProvider, useUsername } from './components/UseUsername.jsx';
import Product from './components/Product.jsx';
import Invisible from './components/Invisible.jsx';

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
                croute="pants"
                color="white" />
        </div>
    );
};

const CartLayout = () => {

    const [cartItems, setCartItems] = useState([]);
    const taxRate = 0.05;
    const { username, setUsername } = useUsername();


    const [cartInfo, setCartInfo] = useState({
        "subtotal": 0,
        "tax": 0,
        "total": 0
    });

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            if (username !== 'Guest') {
                const savedUsername = localStorage.getItem('username');
                if (savedUsername) {
                    setUsername(savedUsername);
                }
                fetch(`https://localhost:7269/GetCart?username=${username}`)
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json);
                        setCartItems(json);
                    });
            }

        };
        fetchProducts();

        return () => {

        };
    }, [username]);

    
    const recalculateTotal = () => {
        const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * taxRate;
        const total = subtotal + tax;

        setCartInfo(prevCartInfo => ({
            ...prevCartInfo,
            subtotal: subtotal,
            tax: tax,
            total: total,
            items: cartItems
        }));
    };


    useEffect(() => {
        recalculateTotal();
    }, [cartItems, taxRate]);


    return (
        <div>
            <div className="row">
                <div className="shop-col col">
                    <div className="col">
                        <div className="shop-pg">
                            <h1>Shopping Cart</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac tortor vitae purus faucibus ornare.</p>
                        </div>
                    </div>
                </div>
                <div className="price-col col">
                    <div className="total-div">
                        <div className="row">
                            <div className="products">
                                {/* fixme: fill with database entries */}

                                {cartItems.map((item, index) => (
                                    <Product
                                        key={index}
                                        name={item.title}
                                        defaultValue={item.quantity}
                                        price={(item.quantity * 10.00).toFixed(2) }
                                        onQuantityChange={() => item.quantity}
                                    />
                                ))}
                            </div>

                            <div className="total-pricing">
                                <h3>Subtotal: ${cartInfo["subtotal"].toFixed(2)}</h3>
                                <p>Tax: ${cartInfo["tax"].toFixed(2)}</p>
                                <h3 className="total-price">Total: ${cartInfo["total"].toFixed(2)}</h3>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const RegisterLayout = () => {
    const [registrationProps, setRegistrationProps] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        confirmEmail: ""
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegistrationProps(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("https://localhost:7269/api/User/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationProps)
        });

        if (response.ok) {
            const result = await response.json();
            setSuccessMessage("Account Created!");
            console.log("Registration submitted successfully:", result);
        } else {
            const errorMessage = await response.text();
            console.error("Registration submission failed");
            setError(errorMessage);
        }
    };

    return (
        <div className="whole-reg">

            <div className="frame">
                <form className="regForm" onSubmit={onSubmit}>
                    <br />
                    <h1 className="text-center">Sign Up</h1>
                    <br />
                    <div>
                        {error && !successMessage && < h6 style={{ color: 'white', opacity: '0.7' }}>{error}</h6>}
                        {successMessage && <h6 style={{ color: 'white', opacity: '0.7' }}>Account Created</h6>}
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username"
                            value={registrationProps.username}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password"
                            value={registrationProps.password}
                            onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword"
                            value={registrationProps.confirmPassword}
                            onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email"
                            value={registrationProps.email}
                            onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="confirmEmail">Confirm Email</label>
                        <input type="email" name="confirmEmail" id="confirmEmail"
                            value={registrationProps.confirmEmail}
                            onChange={handleChange}/>
                    </div>
                    <div className="pad">
                        <button className="register" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>

    )
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


const LoginLayout = () => {
    const [registrationProps, setRegistrationProps] = useState({
        username: "",
        password: ""
    });

    const { setUsername } = useUsername();

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegistrationProps(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = async (e) => {

        e.preventDefault();

        const response = await fetch("https://localhost:7269/api/User/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationProps)
        });

        if (response.ok) {
            const result = await response.json();
            setSuccessMessage("Sucessfully Logged In!");
            console.log("Logged in successfully:", result);

            localStorage.setItem('username', result.username);
            setUsername(result.username);
        } else {
            const errorMessage = await response.text();
            console.error("Login failed");
            setError(errorMessage);
        }
    };

    return (
        <div className="whole-reg">

            <div className="frame">
                <form className="regForm" onSubmit={onSubmit}>
                    <br />
                    <h1 className="text-center">Login Page</h1>
                    <br />
                    <div>
                        {error && !successMessage && < h6 style={{ color: 'white', opacity: '0.7' }}>{error}</h6>}
                        {successMessage && <h6 style={{ color: 'white', opacity: '0.7' }}>Sucessfully Logged In</h6>}
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username"
                            value={registrationProps.username}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password"
                            value={registrationProps.password}
                            onChange={handleChange} />
                    </div>
                    <div className="pad">
                        <button className="register" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>

    )
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
            <Header />
            <SecondaryHeader />
            <ScreenRoutes />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
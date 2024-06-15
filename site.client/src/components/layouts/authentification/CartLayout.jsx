
import { useEffect, useState } from 'react';
import { useUsername } from '../../UseUsername.jsx';
import Product from '../../general/Product.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../index.css';
import '../../../App.css';
import LinkButton from '../../buttons/LinkButton.jsx';
import PlainLink from '../../buttons/PlainLink.jsx';


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
                        let filteredItems = json.filter(item => item.quantity > 0);
                        setCartItems(filteredItems);
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

    const appendTotal = async () => {

        const response = await fetch("https://localhost:7269/appendTotal", {
            method: 'PATCH',
            body: JSON.stringify({
                Name: username,
                Price: cartInfo["total"].toFixed(2)
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        if (!response.ok) {
            console.log('Error occurred appending total');
        }
    };


    useEffect(() => {
        recalculateTotal();
    }, [cartItems, taxRate]);

    const handleQuantityChange = (index, newQuantity) => {
        setCartItems(prevItems => {
            const newItems = [...prevItems];
            newItems[index].quantity = newQuantity;
            return newItems;
        });
    };

    const handleRemoveProduct = (name) => {
        setCartItems(prevItems => prevItems.filter(item => item.title.includes(name)));
    };

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
                                        username={String(username)}
                                        key={index}
                                        name={item.title}
                                        link={item.link}
                                        defaultValue={item.quantity}
                                        onRemove={() => handleRemoveProduct(item.title)}
                                        price={(item.quantity * 10.00).toFixed(2)}
                                        onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)}
                                    />

                                ))}
                            </div>

                            <div className="total-pricing">
                                <h3>Subtotal: ${cartInfo["subtotal"].toFixed(2)}</h3>
                                <p>Tax: ${cartInfo["tax"].toFixed(2)}</p>
                                <h3 className="total-price">Total: ${cartInfo["total"].toFixed(2)}</h3>

                                <PlainLink to="/payment" fontColor="white">
                                    <div className="buyBtn" onClick={appendTotal}>
                                        Buy Now
                                    </div>
                                </PlainLink>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartLayout;
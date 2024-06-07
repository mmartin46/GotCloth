// John 3:5
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import '../App.css';
import { useEffect, useState, useRef } from 'react';


const Product = (props) => {
    const { username, name, link, defaultValue, price, onQuantityChange } = props;
    const [quantity, setQuantity] = useState(defaultValue);

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        console.log(newQuantity);
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
        updateCart();
    }


    const updateCart = async () => {
        const response = await fetch("https://localhost:7269/PatchCart", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                title: name,
                price: price,
                quantity: quantity,
                link: link
            })
        });

        if (response.ok) {
            console.log('Sucess', response);
        } else {
            console.log("Failed to put ", await response.text());
        }
    };

    return (
        <div className="row">
            <div className="col">
                <div className="product-purchase">
                    <span>
                        <input min="1"
                            placeholder={defaultValue}
                            className="counter"
                            type="number"
                            onChange={handleQuantityChange}>
                        </input>
                    </span>
                    <span>
                        {name}
                    </span>
                    <span>${price}</span>
                </div>
            </div>
        </div>
    );
};

export default Product;
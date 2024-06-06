// John 3:5
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import '../App.css';
import { useEffect, useState, useRef } from 'react';


const Product = (props) => {
    const { name, price, defaultValue, onQuantityChange } = props;
    const [quantity, setQuantity] = useState(defaultValue);

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        console.log(newQuantity);
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    }

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
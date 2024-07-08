// John 3:5
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import '../../App.css';
import { useEffect, useState, useCallback } from 'react';


const Product = (props) => {
    const { username, name, link, defaultValue, price, onQuantityChange, onRemove } = props;
    const [quantity, setQuantity] = useState(defaultValue);
    const [, updateState] = useState();
    const rerender = useCallback(() => updateState({}), []);
    

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        console.log(newQuantity);
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
        updateCart(newQuantity);
        rerender();
    }

    useEffect(() => {
        filterCart();
    }, []);




    const filterCart = async () => {
        const response = await fetch("https://localhost:7269/FilterCart", {
            method: 'DELETE'
        })
        if (response.ok) {
            console.log('filtered carts successfully');
        } else {
            console.log('problem filtering carts', await response.text())
        }
    };

    const removeFromCart = async () => {
        const response = await fetch("https://localhost:7269/RemoveProduct", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                title: name,
                price: 10.00,
                quantity: quantity,
                link: link
            })
        });

        if (response.ok) {
            console.log('successfully deleted!');
            updateState({});
            onRemove();
        } else {
            console.log('Failed to delete ', await response.text());
        }
    }


    const updateCart = async (quantityToUpdate) => {
        const response = await fetch("https://localhost:7269/PatchCart", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                title: name,
                price: 10.00,
                quantity: quantityToUpdate,
                link: link
            })
        });

        if (response.ok) {
            console.log('Success', response);
        } else {
            console.log("Failed to put ", await response.text());
        }
    };

    return (
        <div className="row">
            <div className="col">
                <div className="product-purchase">
                    <span style={{ paddingRight: '30px', color: 'rgba(0,0,0, 0.5)' }}
                        onClick={removeFromCart}>x</span>
                    <span>
                        <input min="1"
                            placeholder={defaultValue}
                            className="counter"
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}>
                        </input>
                    </span>
                    <span className="product-title">
                        {name}
                    </span>
                    <span>${price}</span>
                </div>
            </div>
        </div>
    );
};

export default Product;
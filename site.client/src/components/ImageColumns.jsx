import '../App.css';
import { useEffect, useState } from 'react';
import PlainLink from './buttons/PlainLink.jsx';
import Invisible from './labels/Invisible';
import { useUsername } from './UseUsername';

const ImageColumns = (props) => {
    const { name } = props;

    const [pantsImages, setPantsImages] = useState([]);

    const pantsUrl = `https://localhost:7269/Images/${name}`;
    let link = "";
    const { username } = useUsername();

    let cartLink = '/login';

    if (username !== 'Guest') {
        cartLink = '/cart';
    }

    console.log(cartLink);
    console.log(username);

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

    useEffect(() => {
        const fetchPantsImages = async () => {
            try {
                const response = await fetch(pantsUrl);
                if (!response.ok) {
                    throw new Error(`Error getting ${name} data`);
                }
                const data = await response.json();
                console.log(data);
                setPantsImages(data);
            } catch (error) {
                console.error('Couldn\'t fetch images');
            }
        };

        if (pantsImages.length <= 0 || !pantsImages) {
            fetchPantsImages();
        }
    }, [pantsUrl]);

    return (
        <div className="container">
            <div className="row my-row">
                {pantsImages && (
                    pantsImages.map((pants, index) => (
                        <div key={index} className="sec col my-col">
                            <Invisible>
                                {link = `/product?title=${pants.title}&category=${name}`}
                            </Invisible>
                            <PlainLink to={link} fontColor='black'>
                                <img className="btn-for-image" src={pants.link} />
                                <h5 style={{
                                    fontWeight: '300',
                                    color: 'rgba(0,0,0,.8)'
                                }}>{pants.title.substring(0, 29) + '...'}</h5>
                                <h5>$10.99</h5>
                                <div className="btn-block">
                                    <span className="add-to-cart" onClick={() => addToCart(username, pants.title)}>Add to Cart</span>
                                    <PlainLink to={cartLink} fontColor='black'>
                                        <span className="buy-now">Buy Now</span>
                                    </PlainLink>
                                </div>
                            </PlainLink>
                        </div>
                    ))
                )}
                {!pantsImages && 
                    <h4 id="#error-message">Sorry, no products available :(</h4>
                }
            </div>
        </div>
    );
}


export default ImageColumns;
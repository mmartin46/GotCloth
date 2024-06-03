import '../App.css';
import { useEffect, useState } from 'react';
import PlainLink from './PlainLink.jsx';


const ImageColumns = (props) => {
    const { name } = props;

    const [pantsImages, setPantsImages] = useState([]);

    const pantsUrl = `https://localhost:7269/Images/${name}`;

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
                            <PlainLink to="/product?p=1" fontColor='black'>
                                <img className="btn-for-image" src={pants.link} />
                                <h5 style={{
                                    fontWeight: '300',
                                    color: 'rgba(0,0,0,.8)'
                                }}>{pants.title.substring(0, 29) + '...'}</h5>
                                <h5>$10.99</h5>
                                <div className="btn-block">
                                    <span className="add-to-cart">Add to Cart</span>
                                    <span className="buy-now">Buy Now</span>
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
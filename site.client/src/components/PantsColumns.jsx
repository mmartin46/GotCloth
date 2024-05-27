import '../App.css';
import { useEffect, useState } from 'react';


const PantsColumns = (props) => {
    const [pantsImages, setPantsImages] = useState([]);

    const pantsUrl = 'https://localhost:7269/Images';

    useEffect(() => {
        const fetchPantsImages = async () => {
            try {
                const response = await fetch(pantsUrl);
                if (!response.ok) {
                    throw new Error('Error getting pants data');
                }
                const data = await response.json();
                console.log(data);
                setPantsImages(data);
            } catch (error) {
                console.error('Couldn\'t fetch images');
            }
        };

        fetchPantsImages();
    }, [pantsUrl]);

    return (
        <div className="container">
            <div className="my-row">
                {pantsImages && (
                    pantsImages.map((pants, index) => (
                        <div key={index} className="col my-col">
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
                        </div>
                    ))
                )}
                {!pantsImages && 
                    <h1 id="#error-message">Sorry, no products available :(</h1>
                }
            </div>
        </div>
    );
}


export default PantsColumns;
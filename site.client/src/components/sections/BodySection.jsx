import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import '../../App.css';
import {  useUsername } from '../UseUsername.jsx';
import { useEffect, useState } from 'react';
import PlainLink from '../buttons/PlainLink';

const BodySection = (props) => {
    const { title, description, route, color, textColor } = props;

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


    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error getting ${route} data`);
                }
                const data = await response.json();
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
        <div className="body-section" style={{ backgroundColor: `${color}`, color: `${textColor}` }}>
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
                {images && (<h4 style={{ color: `${textColor}` }} className="sec text-center add-pad">View More</h4>)}
            </PlainLink>

        </div>
    )
};

export default BodySection;
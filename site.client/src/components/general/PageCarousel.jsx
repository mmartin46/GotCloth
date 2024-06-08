
import '../../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import LinkButton from '../buttons/LinkButton.jsx';


const PageCarousel = ({ images }) => {


    return (
        <>
            <Carousel>
                {images.map((image, index) => (
                    <Carousel.Item interval={2000} key={index}>
                        <img
                            className="d-block w-100"
                            src={image.imgSrc}
                        />
                        <Carousel.Caption>
                            <LinkButton to={image.link} title={image.title} caption={image.caption} buttonTitle={image.btnTitle} />
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
};

export default PageCarousel;

import '../index.css';
import headImage from 'C:\\Users\\mitch\\Downloads\\WebApp\\Site\\site.client\\src\\images\\headimage.jpg';
import shutterImage from 'C:\\Users\\mitch\\Downloads\\shutterstock_266498825.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import LinkButton from './buttons/LinkButton.jsx';


const PageCarousel = () => {


    return (
        <>
            <Carousel>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src={headImage}
                    />
                    <Carousel.Caption>
                        <LinkButton to="/shirts" title="40% Off Shirts" caption="With a purchase over $25.00" buttonTitle="Shop Now" />
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        id="carousel-img"
                        className="d-block w-100"
                        src={shutterImage}
                    />
                    <Carousel.Caption interval={2000}>
                        <LinkButton to="/pants" title="30% Off Pants" caption="With a purchase over $15.00" buttonTitle="Shop Now" />
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    );
};

export default PageCarousel;

import PageCarousel from '../../general/PageCarousel';
import HeaderProducts from '../../sections/HeaderProducts';
import BodySection from '../../sections/BodySection';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../index.css';
import '../../../App.css';

class Image {
    constructor(imgSrc, link, title, caption, btnTitle) {
        this.imgSrc = imgSrc;
        this.link = link;
        this.title = title;
        this.caption = caption;
        this.btnTitle = btnTitle;
    }
}


const MainLayout = () => {
    const images = [];
    images.push(new Image(
        '/headimage.jpg',
        '/shirts',
        '40% Off Shirts',
        'With a purchase over $25.00',
        'Shop Now'
    ));
    images.push(new Image(
        '/shutterstock_266498825.jpg',
        '/pants',
        '30% Off Pants',
        'With a purchase over $15.00',
        'Shop Now'
    ));


    return (
        <div>
            <PageCarousel images={images} />

            <div className="animate-up">
                <HeaderProducts />
            </div>

            <div className="animate-up">
                <BodySection title="CHEAP SHOES"
                    description="Need some solid deals for shoes as low as $10.99. Check here!"
                    route="shoes"
                    color="rgb(200, 0,0)"
                    textColor="white" />
                <BodySection title="LOW-PRICE DEALS"
                    description="Looking for low-price pants, feel free to look. Check here!"
                    route="pants"
                    color="white"
                    textColor="red"                />
            </div>
        </div>
    );
};

export { Image, MainLayout };
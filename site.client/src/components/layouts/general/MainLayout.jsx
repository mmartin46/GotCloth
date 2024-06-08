import headImage from 'C:\\Users\\mitch\\Downloads\\WebApp\\Site\\site.client\\src\\images\\headimage.jpg';
import shutterImage from 'C:\\Users\\mitch\\Downloads\\shutterstock_266498825.jpg';
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
        headImage,
        '/shirts',
        '40% Off Shirts',
        'With a purchase over $25.00',
        'Shop Now'
    ));
    images.push(new Image(
        shutterImage,
        '/pants',
        '30% Off Pants',
        'With a purchase over $15.00',
        'Shop Now'
    ));


    return (
        <div>
            <PageCarousel images={images} />
            <HeaderProducts />
            <BodySection title="CHEAP SHOES"
                description="Need some solid deals for shoes as low as $10.99. Check here!"
                route="shoe"
                color="antiquewhite" />
            <BodySection title="LOW-PRICE DEALS"
                description="Looking for low-price pants, feel free to look. Check here!"
                croute="pants"
                color="white" />
        </div>
    );
};

export { Image, MainLayout };
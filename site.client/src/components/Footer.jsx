import '../index.css';
import '../App.css';

const Footer = () => {
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    return (
        <div className="footer text-center">
            <h6>&copy;Copyright {year} Mitchell Martin</h6>
        </div>
    );
};

export default Footer;
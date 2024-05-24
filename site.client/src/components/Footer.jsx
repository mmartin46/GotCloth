import '../index.css';
import '../App.css';

const Footer = () => {
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    return (
        <div className="footer text-center">
            <h3>&copy;Copyright {year} Mitchell Martin</h3>
        </div>
    );
};

export default Footer;
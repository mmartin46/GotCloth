import '../index.css';
import '../App.css';
import PlainLink from './PlainLink';


const Header = () => {
    // FIXME: Not fully implemented
    return (
        <div className="header">
            <ul>
                <li><h6>$1.00 SHIPPING ON ALL ORDERS OVER $16.00</h6></li>
            </ul>
            <div className="lowerHeader">
                <div className="row">
                    <div className="col">
                        <PlainLink to="/" fontColor="white">
                            <h5>GOTCLOTH.NET</h5>
                        </PlainLink>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col end-col">
                                <PlainLink to="/login" fontColor="white">
                                    <span>Login</span>&nbsp;
                                </PlainLink>
                                <PlainLink to="/register" fontColor="white">
                                    <span>Register</span>
                                </PlainLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
import '../../index.css';
import '../../App.css';
import PlainLink from '../buttons/PlainLink';
import { useUsername } from '../UseUsername';

const Header = () => {
    // FIXME: Not fully implemented
    const { username } = useUsername();
    let cartLink = username !== 'Guest' ? '/cart' : '/login';


    console.log(`Header() => ${cartLink} ${username}`);

    return (
        <div className="header">
            <ul>
                <li><h6>$1.00 SHIPPING ON ALL ORDERS OVER $16.00</h6></li>
            </ul>
            <div className="lowerHeader">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col end-col">
                                <div>
                                    <PlainLink to="/" fontColor="white">
                                        <h5>GOTCLOTH.NET</h5>
                                    </PlainLink>
                                </div>
                                <div>
                                    <PlainLink to="/login" fontColor="white">
                                        <span>Login</span>&nbsp;
                                    </PlainLink>
                                    <PlainLink to="/register" fontColor="white">
                                        <span>Register</span>&nbsp;
                                    </PlainLink>
                                    <PlainLink to={cartLink} fontColor="white">
                                        <span>Cart</span>
                                    </PlainLink>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
import { Link } from 'react-router-dom';
import '../index.css';
import '../App.css';
import PlainLink from './PlainLink';

const SecondaryHeader = () => {
    // FIXME: Not fully implemented
    return (
        <div className="secondaryHeader">
            <PlainLink to="/" fontColor="red">
                <h2 className="click-link">GOTCLOTH.NET</h2>
            </PlainLink>

            <div className="otherSecondaryHeaders">
                <PlainLink to="/pants" fontColor="black"><h4 className="click-link">PANTS</h4></PlainLink>
                <PlainLink to="/shirts" fontColor="black"><h4 className="click-link">SHIRTS</h4></PlainLink>
                <PlainLink to="/shoes" fontColor="black"><h4 className="click-link">SHOES</h4></PlainLink>
                <PlainLink to="/" fontColor="black"><h4 className="click-link" style={{ color: 'red' }}>CART</h4></PlainLink>
            </div>
        </div>
    );
}

export default SecondaryHeader;
import { Link } from 'react-router-dom';
import '../index.css';
import '../App.css';
import PlainLink from './PlainLink';
import { UsernameProvider, useUsername } from './UseUsername.jsx';


const SecondaryHeader = () => {
    // FIXME: Not fully implemented
    let username = useUsername();
    return (
        <div className="secondaryHeader ">
            <div className="row">
                <PlainLink to="/" fontColor="red">
                    <h2 className="click-link">Hello, {username.current}</h2>
                </PlainLink>
            </div>
            <div className="innerLinkHeader row">
                <div className="col">
                    <PlainLink to="/pants" fontColor="black"><h4 className="click-link">PANTS</h4></PlainLink>
                </div>
                <div className="col">
                    <PlainLink to="/shirts" fontColor="black"><h4 className="click-link">SHIRTS</h4></PlainLink>
                </div>
                <div className="col">
                    <PlainLink to="/shoes" fontColor="black"><h4 className="click-link">SHOES</h4></PlainLink>
                </div>
            </div>

        </div>
    );
};

export default SecondaryHeader;
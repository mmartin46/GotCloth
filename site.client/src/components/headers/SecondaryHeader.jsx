import { Link } from 'react-router-dom';
import '../../index.css';
import '../../App.css';
import PlainLink from '../buttons/PlainLink';
import { UsernameProvider, useUsername } from '../UseUsername.jsx';
import { useEffect } from 'react';


const SecondaryHeader = () => {
    // FIXME: Not fully implemented
    const { username }  = useUsername();


    return (
        <div className="secondaryHeader ">
            <div className="row">
                <PlainLink to="/" fontColor="red">
                    <h5 className="click-link">Hello, {username}</h5>
                </PlainLink>
            </div>
            <div className="innerLinkHeader row">
                <div className="col">
                    <PlainLink to="/pants" fontColor="red"><h5 className="click-link">Pants</h5></PlainLink>
                </div>
                <div className="col">
                    <PlainLink to="/shirts" fontColor="red"><h5 className="click-link">Shirts</h5></PlainLink>
                </div>
                <div className="col">
                    <PlainLink to="/shoes" fontColor="red"><h5 className="click-link">Shoes</h5></PlainLink>
                </div>
            </div>

        </div>
    );
};

export default SecondaryHeader;
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
                    <h2 className="click-link">Hello, {username}</h2>
                </PlainLink>
            </div>
            <div className="innerLinkHeader row">
                <div className="col">
                    <PlainLink to="/pants" fontColor="red"><h4 className="click-link">Pants</h4></PlainLink>
                </div>
                <div className="col">
                    <PlainLink to="/shirts" fontColor="red"><h4 className="click-link">Shirts</h4></PlainLink>
                </div>
                <div className="col">
                    <PlainLink to="/shoes" fontColor="red"><h4 className="click-link">Shoes</h4></PlainLink>
                </div>
            </div>

        </div>
    );
};

export default SecondaryHeader;
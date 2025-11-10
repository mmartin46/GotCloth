import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import '../../App.css';
import { Link } from "react-router-dom";
import PlainLink from '../buttons/PlainLink';

const HeaderProducts = () => {
    return (
        <div className="sections row text-center">
            <div id="shirt" className="sec col">
                <PlainLink to="/shirts" fontColor='black'>
                    <h2 className="display-4">SHIRTS</h2>
                </PlainLink>
            </div>
            <div id="jeans" className="sec col">
                <Link to="/pants" style={{ textDecoration: 'none', color: 'black' }}>
                    <h2 className="display-4">JEANS</h2>
                </Link>
            </div>
            <div id="shoes" className="sec col">
                <Link to="/shoes" style={{ textDecoration: 'none', color: 'black' }}>
                    <h2 className="display-4">SHOES</h2>
                </Link>
            </div>
        </div>
    );
};

export default HeaderProducts;
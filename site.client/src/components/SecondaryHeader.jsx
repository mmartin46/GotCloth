import '../index.css';
import '../App.css';

const SecondaryHeader = () => {
    // FIXME: Not fully implemented
    return (
        <div className="secondaryHeader">
            <div>
                <h2>GOTCLOTH.NET</h2>
            </div>

            <div className="otherSecondaryHeaders">
                <h4>PANTS</h4>
                <h4>SHIRTS</h4>
                <h4>SHOES</h4>
                <h4 style={{ color: 'red' }}>CART</h4>
            </div>
        </div>
    );
}

export default SecondaryHeader;
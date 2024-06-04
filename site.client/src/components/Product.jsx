// John 3:5
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import '../App.css';


const Product = (props) => {
    const { name, price, defaultValue } = props;
    return (
        <div className="row">
            <div className="col">
                <div className="product-purchase">
                    <span>
                        <input placeholder={defaultValue} className="counter" type="number"></input>
                    </span>
                    <span>
                        {name}
                    </span>
                    <span>${price}</span>
                </div>
            </div>
        </div>
    );
};

export default Product;

import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../index.css';
import '../../../App.css';
import { useUsername } from '../../UseUsername';


const ProductLayout = () => {
    const [imageData, setImageData] = useState([]);

    const { username } = useUsername();
    const [message, setMessage] = useState(null);
    const [currentQuantity, setCurrrentQuantity] = useState(0);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const title = urlParams.get('title');
        const category = urlParams.get('category');
        console.log(title.substring(0, title.length - 4), category);

        let url = `https://localhost:7269/Product?title=${title}&category=${category}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    console.log('Response wasn\'t okay');
                }
                return response.json();
            })
            .then(data => {
                setImageData(data);
            });

    }, []);

    useEffect(() => {

        const getUserDetails = async () => {
            try {
                const response = await fetch(`https://localhost:7269/api/User?username=${username}`, {
                    method: "POST",
                    body: JSON.stringify({
                        username: username
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });
                if (response.ok) {
                    setCurrrentQuantity(response.amountDue);
                    console.log(currentQuantity);
                } else {
                    console.log("Couldn't retrieve user details");
                }

            } catch (error) {
                console.log("Problem fetching user details");
            }
        };

        getUserDetails();
    }, [username, currentQuantity])


    const addToCart = async (username, title) => {
        try {
            const response = await fetch("https://localhost:7269/AddToCart", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    title: title
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            if (!response.ok) {
                const error = await response.text();
                console.log('A problem occurred with loading the cart');
            } else {

                setMessage(`Product added to cart x${currentQuantity}`);
            }

        } catch (error) {
            console.error('Error adding to cart:');
        }

    };


    return (
        <div className="animate-up prod-bkg">
            {imageData &&
                <div className="row prod-row">
                    <div className="col">
                        <img src={imageData.link} />
                    </div>
                    <div className="col prod-sec">
                        <h2>{imageData.title}</h2>
                        <p>Adiqi ipefi aoata usuzu uzeuw ceqbe ifive akodi ounuf egawu, evufe aneyu uzino usaxi utden eiret awogo izalo ufole ipedi, upoir oibob usidu iqaqe avage okozi odaxi ozoxk evata iwuve, pievo uxoye wabea esiro avaxy uqayo ezovp ecife uiowi ucicu.</p>
                        <h6>$10.00</h6>

                        <div className="add-cart-btn" onClick={() => addToCart(username, imageData.title)}>
                            Add To Cart
                        </div>

                        {message && <h6 style={{ color: 'red' }}>{message}</h6>}
                    </div>
                </div>
            }
            {!imageData && <h3>Product Not Found :(</h3>}
        </div>
    );
};

export default ProductLayout;
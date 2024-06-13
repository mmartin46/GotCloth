import { useState, useEffect } from 'react';
import { useUsername } from '../../UseUsername.jsx';

const PaymentLayout = () => {
    const [total, setTotal] = useState(0);

    const { username } = useUsername();

    const [paymentModel, setPaymentModel] = useState({
        username: username,
        owner: '',
        cardNumber: '',
        expirationDate: '',
        cvc: ''
    });


    const setChanges = (e) => {
        setPaymentModel({
            ...paymentModel,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        const getTotal = async () => {

            const response = await fetch("https://localhost:7269/getTotal", {
                method: "GET",
                body: JSON.stringify({
                    username: username
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const result = await response.json();
                setTotal(result);
            } else {
                const errorMessage = await response.text();
                console.log('Username fetch failed: ', errorMessage);
            }
        };

        getTotal();

        return () => {

        };
    }, [username]);




    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("https://localhost:7269/payment", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentModel)
        });

        if (response.ok) {
            console.log('Paid successfully');
        } else {
            const errorMessage = await response.text();
            console.log(`Error submitting payment -> ${errorMessage}`);
        }
    }


    return (
        <div>
            <form onSubmit={onSubmit}>

                <div className="paymentFrame">
                    <h4>Payment Information</h4>
                    <div className="pay-inputs debug-border">
                        <label htmlFor="owner">Owner</label>
                        <input onChange={setChanges} type="text" name="owner" id="owner" value={paymentModel.owner}></input>
                        <label htmlFor="cardNumber">Card Number</label>
                        <input onChange={setChanges} type="text" name="cardNumber" id="cardNumber" value={paymentModel.cardNumber}></input>
                        <label htmlFor="expirationDate">Expiration Date</label>
                        <input onChange={setChanges} type="text" name="expirationDate" id="expirationDate" value={paymentModel.expirationDate}></input>
                        <label htmlFor="cvc">CVC</label>
                        <input onChange={setChanges} type="text" name="cvc" id="cvc" value={paymentModel.cvc}></input>
                        <br />
                        <div className="total">
                            <h4>Total: $1{total.toFixed(2)}</h4>
                        </div>
                        <button className="buyBtn" style={{ color: 'white' }} type="submit">
                            Purchase
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default PaymentLayout;
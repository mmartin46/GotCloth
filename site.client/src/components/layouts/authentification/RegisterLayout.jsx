
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../index.css';
import '../../../App.css';

const RegisterLayout = () => {
    const [registrationProps, setRegistrationProps] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        confirmEmail: ""
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegistrationProps(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("https://localhost:7269/api/User/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationProps)
        });

        if (response.ok) {
            const result = await response.json();
            setSuccessMessage("Account Created!");
            console.log("Registration submitted successfully:", result);
        } else {
            const errorMessage = await response.text();
            console.error("Registration submission failed");
            setError(errorMessage);
        }
    };

    return (
        <div className="whole-reg ">

            <div className="frame">
                <form className="regForm" onSubmit={onSubmit}>
                    <br />
                    <h1 className="text-center">Sign Up</h1>
                    <br />
                    <div>
                        {error && !successMessage && < h6 style={{ color: 'white', opacity: '0.7' }}>{error}</h6>}
                        {successMessage && <h6 style={{ color: 'white', opacity: '0.7' }}>Account Created</h6>}
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username"
                            value={registrationProps.username}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password"
                            value={registrationProps.password}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword"
                            value={registrationProps.confirmPassword}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email"
                            value={registrationProps.email}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="confirmEmail">Confirm Email</label>
                        <input type="email" name="confirmEmail" id="confirmEmail"
                            value={registrationProps.confirmEmail}
                            onChange={handleChange} />
                    </div>
                    <div className="pad">
                        <button className="register" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>

    )
};

export default RegisterLayout;
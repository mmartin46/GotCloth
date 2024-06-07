
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../index.css';
import '../../../App.css';
import { useUsername } from '../../UseUsername.jsx';

const LoginLayout = () => {
    const [registrationProps, setRegistrationProps] = useState({
        username: "",
        password: ""
    });

    const { setUsername } = useUsername();

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegistrationProps(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = async (e) => {

        e.preventDefault();

        const response = await fetch("https://localhost:7269/api/User/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationProps)
        });

        if (response.ok) {
            const result = await response.json();
            setSuccessMessage("Sucessfully Logged In!");
            console.log("Logged in successfully:", result);

            localStorage.setItem('username', result.username);
            setUsername(result.username);
        } else {
            const errorMessage = await response.text();
            console.error("Login failed");
            setError(errorMessage);
        }
    };

    return (
        <div className="whole-reg">

            <div className="frame">
                <form className="regForm" onSubmit={onSubmit}>
                    <br />
                    <h1 className="text-center">Login Page</h1>
                    <br />
                    <div>
                        {error && !successMessage && < h6 style={{ color: 'white', opacity: '0.7' }}>{error}</h6>}
                        {successMessage && <h6 style={{ color: 'white', opacity: '0.7' }}>Sucessfully Logged In</h6>}
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
                    <div className="pad">
                        <button className="register" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>

    )
};

export default LoginLayout;
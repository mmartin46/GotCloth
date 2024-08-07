
import { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../index.css';
import '../../../App.css';
import { useUsername } from '../../UseUsername.jsx';
import { useNavigate } from 'react-router-dom';

const LoginLayout = () => {
    const errorCode = "400";
    const navigate = useNavigate();
    const usernameRef = useRef();

    const [registrationProps, setRegistrationProps] = useState({
        username: "",
        password: ""
    });

    const { setUsername } = useUsername();

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


            let token = Math.random().toString(36).substring(2);
            localStorage.setItem('token', token);
            localStorage.setItem('username', result.username);


            setUsername(result.username);
            navigate("/loginSuccess");
        } else {
            const errorMessage = await response.text();
            console.error("Login failed");
            if (errorMessage.includes(errorCode)) {
                setError("Please fill in all fields");
                usernameRef.current.focus();
            } else {
                setError(errorMessage);
            }
        }
    };

    return (
        <div className="whole-reg">

            <div className="animate-up frame">
                <form className="regForm" onSubmit={onSubmit}>
                    <br />
                    <h1 className="text-center">Login Page</h1>
                    <br />
                    <div>
                        {error && !successMessage && < h6 style={{ color: 'white', opacity: '0.7' }}>{error}</h6>}
                        {successMessage && <h6 style={{ color: 'white', opacity: '0.7' }}>Sucessfully Logged In</h6>}
                        <label htmlFor="username">Username</label>
                        <input ref={usernameRef} type="text" name="username" id="username"
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
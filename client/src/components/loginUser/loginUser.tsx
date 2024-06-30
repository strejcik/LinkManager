import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './loginUser.css';
import AuthContext from "../../context/AuthContext.tsx";
import { LoginUser } from "../../services/auth/authService.tsx";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { auth, setAuth } = useContext(AuthContext);



    const handleLogin = async (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        try {
            //Login user
            await LoginUser(userData, setAuth);
        } catch (error) {
            alert(error.message);
            console.error(error.message || 'An error occurred during sign-in');
        }
    };

    useEffect(() => {


        if (auth) {
            navigate('/panel');
        }

    }, [auth, navigate])

    return (
        <div className="wrapper">
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    {/* <MdEmail className="icon" /> */}
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {/* <FaLock className="icon" /> */}
                </div>


                <button type="submit">Login</button>

                <div className="register-link">
                    <p>Don't have an account? <a onClick={() => navigate("/register")}>Register</a></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
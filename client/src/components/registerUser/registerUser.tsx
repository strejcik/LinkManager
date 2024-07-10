/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authContext from "../../context/authContext.tsx";
import { registerUser } from "../../services/auth/authService.tsx";


const Register = () => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const navigate = useNavigate();

    const {  setAccountCreated, accountCreated } = useContext(authContext);

    const validateEmail = (email:string) => {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      };

    const handleRegistration = async (event) => {
        event.preventDefault();
        try {

            if (password !== confirmPassword) {
                setError('Passwords do not match');
                throw new Error('Passwords do not match, Please try again')
            }
            if (!validateEmail(email)) {
                setError('Invalid Email');
                throw new Error('Invalid Email, Please try again')
            }
            if (password.length < 8) {
                setError('Password must be at least 8 chars long');
                throw new Error('Password must be at least 8 chars long, Please try again')
            }
            registerUser(email, password, setAccountCreated);

        } catch (error) {
            // Handle any errors that occur during registration
            console.error("Registration error:", error.message);
            alert(error.message);
        }
    };

    useEffect(() => {
        if(accountCreated) {
            navigate("/login")
        }
    },[accountCreated])

    return (
        <div className="wrapper">
            <form onSubmit={handleRegistration}>
                <h1>Register</h1>
                <div className="input-box">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

              
                    <div className="input-box">
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>

                <button type="submit">Register</button>

                <div className="register-link">
                    <p>Already have an account? <a onClick={() => navigate("/login")}>Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default Register;
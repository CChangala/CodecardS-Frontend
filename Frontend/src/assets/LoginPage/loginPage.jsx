import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../main.jsx';
import styles from './LoginPage.module.css';
import login from '../../images/login.png';
import validator from "validator";
import Footer from "../Footer/Footer.jsx";

function LoginPage() {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUsername } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const validateEmail = (email) => {
        return validator.isEmail(email); 
    };

    const handleSubmit = () => {
        setError("");
        setSuccessMessage("");
        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (!email) {
            setError("Email cannot be empty.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Invalid email format! Please enter a valid email (e.g., user@gmail.com).");
            return;
        }

        if (isForgotPassword) {
            // Handle Forgot Password
            const userIndex = users.findIndex(user => user.email === email);
            if (userIndex === -1) {
                setError("Email not found.");
                return;
            }

            
        

            if (!password || !confirmPassword) {
                setError("Please enter and confirm your new password.");
                return;
            }

            if (password !== confirmPassword) {
                setError("Passwords do not match!");
                return;
            }

            users[userIndex].password = password;
            localStorage.setItem("users", JSON.stringify(users));
            setSuccessMessage("Password reset successful! You can now log in.");
            setIsForgotPassword(false);
            return;
        }

        if (isLogin) {
            // Login validation
            const user = users.find(user => user.email === email && user.password === password);
            if (user) {
                setUsername(email);
                setIsAuthenticated(true);
                setIsAuthenticated(true);
                navigate('/');
            } else {
                setError("Invalid email or password!");
            }
        } else {
            // Signup validation
            if (!password || !confirmPassword) {
                setError("Please enter and confirm your password.");
                return;
            }

            if (password !== confirmPassword) {
                setError("Passwords do not match!");
                return;
            }

            if (users.find(user => user.email === email)) {
                setError("Email already registered. Please log in.");
                return;
            }

            users.push({ email, password });
            localStorage.setItem("users", JSON.stringify(users));
            setIsLogin(true);
            setSuccessMessage("Signup successful! Please log in.");
        }
    };

    return (
        <>
        <div className={styles.container}>
            <div className={styles.ImgContainer}>
                <img src={login} alt="studying girl"/>
            </div>
            <div className={styles.signUp_container}>
                <h2 className={styles.title}>
                    {isForgotPassword ? "Reset Password" : isLogin ? "Login" : "Sign Up"}
                </h2>
                
                <input className={styles.input}
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {!isForgotPassword && (
                    <input className={styles.input}
                        type="password"
                        placeholder={isLogin ? "Enter Password" : "Create Password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                )}

                {!isLogin && !isForgotPassword && (
                    <input className={styles.input}
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                )}

                {isForgotPassword && (
                    <>
                        <input className={styles.input}
                            type="password"
                            placeholder="Enter New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input className={styles.input}
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </>
                )}

                <div className={styles.buttons}>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

                    <button type="submit" onClick={handleSubmit}>
                        {isForgotPassword ? "Reset Password" : isLogin ? "Login" : "Sign Up"}
                    </button>

                    {!isForgotPassword && (
                        <p className={styles.switchForm} onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                        </p>
                    )}

                    {isLogin && (
                        <p className={styles.forgotPassword} onClick={() => setIsForgotPassword(true)}>
                            Forgot Password?
                        </p>
                    )}

                    {isForgotPassword && (
                        <p className={styles.backToLogin} onClick={() => setIsForgotPassword(false)}>
                            Back to Login
                        </p>
                    )}
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default LoginPage;

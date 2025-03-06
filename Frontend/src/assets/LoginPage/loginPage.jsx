import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../main.jsx';
import styles from './LoginPage.module.css';
import login from '../../images/login.png';
import validator from "validator";

const LoginCall = async (email, password) => {
    const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        throw new Error('Login failed');
    }
    return await response.json();
    };

const SignUpCall = async (email, password, confrimPassword) => {
        const response = await fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, confrimPassword }),
        });
        if (!response.ok) {
            // If the response status is not OK (e.g., 406), throw an error with the status
            const error = await response.json();
            throw new Error(error.error || response.statusText);
        }
    
        const data = await response.text();
        return data;

        };
    

function LoginPage() {
    const navigate = useNavigate();
    const { setIsAuthenticated,setUserId } = useContext(AuthContext);
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

    const handleSubmit = async() => {
        setError("");
        setSuccessMessage("");

        if (!email) {
            setError("Email cannot be empty.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Invalid email format! Please enter a valid email (e.g., user@gmail.com).");
            return;
        }

        //can do it later.
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
            const user = await LoginCall(email,password);
            console.log(user);
            if (user.response === "Login Successful") {
                console.log("Logged in");
                setIsAuthenticated(true);
                setUserId(user.userId);
                navigate('/');
            } else {
                setError("Unable to login - Invalid email or password!");
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

            try {
                const response = await SignUpCall(email, password, confirmPassword);
                setIsLogin(true);
                setSuccessMessage("Signup successful! Please log in.");
                setEmail("");
                setPassword("");
            } catch (error) {
                if (error.message === "Not Acceptable") {
                    setError("Email already exists. Use a different email to Sign Up!");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                } else {
                    setError("An error occurred during signup. Please try again.");
                }
            }
        }
    };

    return (
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
    );
}

export default LoginPage;
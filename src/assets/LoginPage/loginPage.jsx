import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../main.jsx';
import styles from './LoginPage.module.css';
import login from '../../images/login.png';

function LoginPage() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const validEmail = "tanyy@email.com";
    const validPassword = "applebeauty";

    const handleSubmit = () => {
        if (isLogin) {
            // Login validation
            if (email === validEmail && password === validPassword) {
                setIsAuthenticated(true);
                navigate('/');
            } else {
                setError("Invalid email or password!");
            }
        } else {
            // Signup validation
            if (email === validEmail && password === validPassword && password === confirmPassword) {
                setIsLogin(true); 
                setError("Signup successful! Please log in.");
            } else {
                setError("You can only sign up with the given credentials.");
            }
        }
    };

    return (

        <div className={styles.container}>
            <div className={styles.ImgContainer}><img src={login} alt="studying girl"/></div>
            <div className={styles.signUp_container}>
                <h2 className={styles.title}>{isLogin ? "Login" : "Sign Up"}</h2>
                    <input className={styles.input}
                        type="text"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input className={styles.input}
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {!isLogin && (
                    <input className={styles.input}
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                )}
                <div className={styles.buttons}>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <button type="submit" onClick={handleSubmit}>{isLogin ? "Login" : "Sign Up"}</button>
                    <p className={styles.switchForm} onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
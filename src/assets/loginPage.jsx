import React from 'react';
import styles from './LoginPage.module.css';
import login from '../images/login.png';

function LoginPage() {
    return (
        <div className={styles.container}>
            <div className={styles.ImgContainer}><img src={login} alt="studying girl"/></div>
            <div className={styles.signUp_container}>
                <h2 className={styles.title}>Sign Up</h2>
                    <input className={styles.input}
                        type="text"
                        placeholder="Enter Email"
                        name="email"
                        required
                    />
                    <input className={styles.input}
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        required
                    />
                    <input className={styles.input}
                        type="password"
                        placeholder="Confrim Password"
                        name="re-password"
                        required
                    />
                <div className={styles.buttons}>
                <button type="submit" >Sign Up</button>
                <button type="button">Login</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
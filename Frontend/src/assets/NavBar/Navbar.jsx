import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../main.jsx';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  
  
  

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogout(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/home')}>
        CodecardS
      </div>
      <div className="navbar-buttons">
        {isAuthenticated ? (
          <>
            <button className="navbar-button" onClick={() => setShowLogout(!showLogout)}>
              Profile
            </button>
            {showLogout && (
              <button className="navbar-button" onClick={handleLogout}>
                Logout
              </button>
            )}
          </>
        ) : (
          <button className="navbar-button" onClick={() => navigate('/login')}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
import { StrictMode, createContext, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import LoginPage from './assets/LoginPage/LoginPage.jsx'
import MainPage from './assets/MainPage/MainPage.jsx'
import CoursePage from './assets/CoursePage/CoursePage.jsx'


export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const ProtectedRoute = ({ children }) => {
  const auth = localStorage.getItem('isAuthenticated') === 'true';
  return auth ? children : <Navigate to="/login" />;
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            
          <Route path="/" element={<MainPage />} />
        
            
          <Route path="/login" element={<LoginPage />} />
        
        
          <Route path="/profile" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
          
        
        
          <Route path="/topics" element={<MainPage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/course/:id" element={<ProtectedRoute><CoursePage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
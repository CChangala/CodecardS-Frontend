import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../main.jsx';
import './MainPage.css';
import Navbar from '../NavBar/Navbar.jsx';

function MainPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // Sample topics data (you can expand or modify this)
  const topics = [
    {
      id: 1,
      title: "Python",
      description: "Python is a high level programming language"
    },
    {
      id: 2,
      title: "Java",
      description: "Object-oriented programming language"
    },
    {
      id: 3,
      title: "Data Science",
      description: "Analyze and interpret complex data"
    },
    {
      id: 4,
      title: "Full Stack",
      description: "Frontend and backend development"
    },
    {
      id: 5,
      title: "Scala",
      description: "Functional programming for big data"
    },
    {
      id: 6,
      title: "Kotlin",
      description: "Modern programming for Android"
    },
    {
      id: 7,
      title: "C/C++",
      description: "Modern programming for Android"
    },
    {
      id: 8,
      title: "React",
      description: "Modern programming for Android"
    }
  ];

  return (
    <div className="main-container">
      <Navbar />

      <div className="hero-section">
        <h1>A fun way to learn and get knowledge!</h1>
      </div>

      <div className="cards-container">
        {topics.map((topic) => (
          <div key={topic.id} className="topic-card">
            <h2>{topic.title}</h2>
            <p>{topic.description}</p>
            <div className="card-buttons">
              <button 
                className="preview-button"
                onClick={() => !isAuthenticated ? navigate('/login') : null}
              >
                Preview
              </button>
              <button 
                className="start-button"
                onClick={() => !isAuthenticated ? navigate('/login') : null}
              >
                Start
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
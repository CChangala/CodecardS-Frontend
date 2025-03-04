import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../main.jsx";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
 

import Navbar from "../NavBar/Navbar.jsx";
import Preview from "../Preview/Preview.jsx";
import "./MainPage.css";

  

import Footer from "../Footer/Footer.jsx";

export const topics = null;

const getCourses = async()=>{
  const response = await fetch("http://localhost:8080/courses");
  if (!response.ok) { 
    const error = await response.json();
    throw new Error(error.error || response.statusText);
  }
  const data = await response.json();
  return data;
};

function MainPage() {
  const navigate = useNavigate();
  const { isAuthenticated, username } = useContext(AuthContext);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [startedCourses, setStartedCourses] = useState({});
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topics = await getCourses();
        setTopics(topics);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
    if (isAuthenticated && username) {
      const savedStartedCourses = JSON.parse(localStorage.getItem(`${username}-started-courses`)) || {};
      setStartedCourses(savedStartedCourses);
    }
  }, [isAuthenticated, username]);

  useEffect(() => {
    if (isAuthenticated && username) {
      localStorage.setItem(`${username}-started-courses`, JSON.stringify(startedCourses));
    }
  }, [startedCourses, isAuthenticated, username]);

  const handlePreviewClick = (topic) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setSelectedTopic(topic);
    }
  };

  const handleCourseStart = (topicId) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      if (!startedCourses[topicId] || !startedCourses[topicId].started) {
        const updatedStartedCourses = { 
          ...startedCourses, 
          [topicId]: { progress: 0, started: true } 
        };
        setStartedCourses(updatedStartedCourses);
      }
      
      
      navigate(`/course/${topicId}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <>
    <div className="main-container">
      <Navbar />
      <div className="hero-section">
        <h1>A fun way to learn and gain knowledge!</h1>
      </div>

      <div className="cards-container">
        {topics.map((topic) => (
          <div key={topic.id} className="topic-card">
            <h2>{topic.title}</h2>
            <p>{topic.description}</p>
            <div className="card-buttons">
              <button className="preview-button" onClick={() => handlePreviewClick(topic)}>
                Preview
              </button>
              <button 
                className={startedCourses[topic.id] ? "resume-button" : "start-button"}
                onClick={() => handleCourseStart(topic.id)}
              >
                {startedCourses[topic.id] ? "Resume" : "Start"}
              </button>

              
            </div>
            {startedCourses[topic.id] && (
            {startedCourses[topic.id] && (
              <div className="progress-container">
              <MainPageProgressBar progress={startedCourses[topic.id]?.progress || 0} />
            </div>
            )}
          
          </div>
        ))}
      
      </div>
      
      
      {selectedTopic && (
        <Preview
          title={selectedTopic.title}
          description={selectedTopic.description}
          details={selectedTopic.details}
          benefits={selectedTopic.benefits}
          onClose={() => setSelectedTopic(null)}
        />
      )}
    </div>
    <Footer/>
    </>
    
  );
}

export default MainPage;

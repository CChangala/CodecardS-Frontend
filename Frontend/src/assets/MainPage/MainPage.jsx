import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

const getProgress = async(userId) => {
  const response = await fetch(`http://localhost:8080/totalprogress/ace8591e-3e01-4f52-a630-fdd0d620396f`);
  if(!response.ok){
    const error = await response.json();
    throw new Error(error.error || response.statusText);
  }
  const data = await response.json();
  return data;
}

const startCourse = async (courseId, userId) => {
  const url = `http://localhost:8080/${courseId}/start?userId=ace8591e-3e01-4f52-a630-fdd0d620396f`;

  try {
      const response = await fetch(url, {
          method: 'POST', // Specifies the method
          headers: {
              'Content-Type': 'application/json' // Set the headers appropriately if needed
          },
          // If you need to send a JSON body, uncomment and modify the line below
          // body: JSON.stringify({ key: 'value' })
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text(); // Assuming the server responds with JSON-formatted data
      console.log('Success:', data);
      return data;
  } catch (error) {
      console.error('Error:', error);
  }
};


function MainPage() {
  const navigate = useNavigate();
  const { isAuthenticated, username } = useContext(AuthContext);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [startedCourses, setStartedCourses] = useState({});
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { userId } = "ace8591e-3e01-4f52-a630-fdd0d620396f"//location.state || {};

  useEffect(() => {
    async function fetchData() {
      try {
        const [topicsData, progressData] = await Promise.all([
          getCourses(),
          getProgress(userId)
        ]);
        setTopics(topicsData);
        const newstartedCoursesMap = progressData.reduce((acc, { courseId, percentage }) => {
          acc[courseId] = { progress: percentage, started: true };
          return acc;
        }, {});
        if(isAuthenticated){
        setStartedCourses(newstartedCoursesMap);
        }
        else{
          setStartedCourses({});
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  },[userId,isAuthenticated]);


  const handlePreviewClick = (topic) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setSelectedTopic(topic);
    }
  };

  const handleCourseStart = async(topicId) => {
    if (!isAuthenticated) {
      navigate("/login");
    } 
    else{
      await startCourse(topicId,userId);
    }
      navigate(`/course/${topicId}`);
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
            {startedCourses[topic.courseId] && (
              <div className="progress-container">
              <MainPageProgressBar progress={startedCourses[topic.courseId].progress|| 0} />
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

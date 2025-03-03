import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../main.jsx";
import { useLocation } from "react-router-dom";
import "./MainPage.css";
import Navbar from "../NavBar/Navbar.jsx";
import Preview from "../Preview/Preview.jsx";

export const topics = null;
const getCourses = async () => {
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
  const location = useLocation();
  const { userId } = location.state || {};
  const { isAuthenticated } = useContext(AuthContext);
  const [selectedTopic, setSelectedTopic] = useState(null);
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
  }, []);

  const handlePreviewClick = (topic) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setSelectedTopic(topic);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="main-container">
      <Navbar />
      <div className="hero-section">
        <h1>A fun way to learn and gain knowledge!</h1>
      </div>

      <div className="cards-container">
        {topics.map((topic) => (
          <div key={topic.courseId} className="topic-card">
            <h2>{topic.title}</h2>
            <p>{topic.description}</p>
            <div className="card-buttons">
              <button className="preview-button" onClick={() => handlePreviewClick(topic)}>
                Preview
              </button>
              <button className="start-button" onClick={() => (!isAuthenticated ? navigate("/login") : navigate(`/course/${topic.courseId}`))}>
  Start
</button>


            </div>
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
  );
}

export default MainPage;

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../main.jsx";
import "./MainPage.css";
import Navbar from "../NavBar/Navbar.jsx";
import Preview from "../Preview/Preview.jsx";

export const topics = [
  {
    id: 1,
    title: "Python",
    description: "Python is a high-level programming language.",
    details: "Python is used in web development, automation, data science, AI, and more. It is known for its simplicity and readability.",
    benefits: "You will learn to write clean code, build applications, and automate tasks efficiently."
  },
  {
    id: 2,
    title: "Java",
    description: "An object-oriented programming language.",
    details: "Java is widely used in backend development, mobile apps, and enterprise software due to its portability and scalability.",
    benefits: "By completing this course, you'll be able to build scalable applications and understand core OOP concepts."
  },
  {
    id: 3,
    title: "DSA",
    description: "Data Structures and Algorithms.",
    details: "DSA is essential for problem-solving in programming and is widely used in competitive coding and technical interviews.",
    benefits: "You will develop strong algorithmic thinking and problem-solving skills to crack coding interviews."
  },
  {
    id: 4,
    title: "HTML/CSS",
    description: "Frontend technologies for web development.",
    details: "HTML structures web pages, while CSS styles them to make beautiful, responsive websites.",
    benefits: "You will gain hands-on experience in creating responsive and user-friendly websites."
  },
  {
    id: 5,
    title: "JavaScript",
    description: "The language of the web.",
    details: "JavaScript is used for interactive web development, powering dynamic front-end applications.",
    benefits: "You will be able to build interactive websites and understand core JavaScript concepts."
  },
  {
    id: 6,
    title: "React",
    description: "A popular frontend JavaScript library.",
    details: "React is used to build dynamic, component-based user interfaces efficiently.",
    benefits: "You'll gain skills in React hooks, state management, and creating interactive web applications."
  },
  {
    id: 7,
    title: "Machine Learning",
    description: "AI and data-driven learning models.",
    details: "Machine Learning enables computers to learn from data and make predictions.",
    benefits: "By the end of this course, you'll understand ML models, train datasets, and build AI applications."
  },
  {
    id: 8,
    title: "SQL",
    description: "Structured Query Language for databases.",
    details: "SQL is used to store, retrieve, and manage data in relational databases.",
    benefits: "You will master querying, data manipulation, and database management."
  }
];
function MainPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [selectedTopic, setSelectedTopic] = useState(null);

  

  const handlePreviewClick = (topic) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setSelectedTopic(topic);
    }
  };

  return (
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
              <button className="start-button" onClick={() => (!isAuthenticated ? navigate("/login") : navigate(`/course/${topic.id}`))}>
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

import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../main.jsx";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import Navbar from "../NavBar/Navbar.jsx";
import { topics } from "../MainPage/MainPage.jsx"; 
import "./CoursePage.css";
import LinkIcon from "../../images/LinkIcon.svg";

export const courses = {
  1: { 
    title: "Python", 
    subtopics: [
      { name: "Basics", link: "https://www.geeksforgeeks.org/introduction-to-python/" },
      { name: "Libraries", link: "https://www.geeksforgeeks.org/python-packages/" },
      { name: "Numpy", link: "https://www.geeksforgeeks.org/python-numpy/" },
      { name: "Pandas", link: "https://www.geeksforgeeks.org/python-pandas-dataframe/" },
      { name: "Sci-kit Learn", link: "https://www.geeksforgeeks.org/learning-model-building-scikit-learn-python-machine-learning-library/" },
      { name: "Matplotlib", link: "https://www.geeksforgeeks.org/python-introduction-matplotlib/" },
      { name: "Seaborn", link: "https://www.geeksforgeeks.org/python-seaborn-tutorial/" },
      { name: "Keras", link: "https://www.geeksforgeeks.org/python-keras/" }
    ]
  },
  2: { 
    title: "Java", 
    subtopics: [
      { name: "OOP Basics", link: "https://docs.oracle.com/javase/tutorial/java/concepts/index.html" },
      { name: "Collections Framework", link: "https://docs.oracle.com/javase/tutorial/collections/index.html" }
    ]
  },
  3: { 
    title: "DSA", 
    subtopics: [
      { name: "Sorting Algorithms", link: "https://www.geeksforgeeks.org/sorting-algorithms/" },
      { name: "Graph Algorithms", link: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" }
    ]
  },
  4: { 
    title: "HTML/CSS", 
    subtopics: [
      { name: "HTML Basics", link: "https://www.w3schools.com/html/default.asp" },
      { name: "CSS Fundamentals", link: "https://www.w3schools.com/css/default.asp" }
    ]
  },
  5: { 
    title: "JavaScript", 
    subtopics: [
      { name: "JS Basics", link: "https://www.w3schools.com/js/default.asp" },
      { name: "DOM Manipulation", link: "https://www.w3schools.com/js/js_htmldom.asp" }
    ]
  },
  6: { 
    title: "React", 
    subtopics: [
      { name: "React Basics", link: "https://reactjs.org/tutorial/tutorial.html" },
      { name: "Hooks", link: "https://reactjs.org/docs/hooks-intro.html" }
    ]
  },
  7: { 
    title: "Machine Learning", 
    subtopics: [
      { name: "ML Basics", link: "https://www.kaggle.com/learn/intro-to-machine-learning" },
      { name: "Neural Networks", link: "https://www.kaggle.com/learn/deep-learning" }
    ]
  },
  8: { 
    title: "SQL", 
    subtopics: [
      { name: "SQL Basics", link: "https://www.w3schools.com/sql/default.asp" },
      { name: "Advanced Queries", link: "https://www.w3schools.com/sql/sql_join.asp" }
    ]
  }
};

function CoursePage() {
  const { id } = useParams();
  const { username } = useContext(AuthContext);
  const [progress, setProgress] = useState({});
  const [notes, setNotes] = useState({});
  const [activeSubtopic, setActiveSubtopic] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showNotesPopup, setShowNotesPopup] = useState(false);
  const course = courses[id];
  
  
  const currentTopic = topics.find(topic => topic.id === parseInt(id));

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem(username)) || {};
    setProgress(savedProgress[course.title] || {});
    const savedNotes = JSON.parse(localStorage.getItem(`${username}-notes`)) || {};
    setNotes(savedNotes[course.title] || {});
  }, [id, username, course.title]);

  const handleCheckboxChange = (subtopic) => {
    const updatedProgress = { ...progress, [subtopic]: !progress[subtopic] };
    setProgress(updatedProgress);
    
    const savedProgress = JSON.parse(localStorage.getItem(username)) || {};
    savedProgress[course.title] = updatedProgress;
    localStorage.setItem(username, JSON.stringify(savedProgress));
  };

  const handleFlashcardClick = (subtopic) => {
    if (isAuthenticated) {
      navigate(`/flashcards/${id}/${subtopic.name}`);  // Use just the name property
    } else {
      navigate("/login");
    }
  };

  const handleNotesClick = (subtopic) => {
    
    setActiveSubtopic(subtopic);
    setShowNotesPopup(true);
    
  };

  const handleSaveNotes = (newNote) => {
    const updatedNotes = { ...notes, [activeSubtopic]: newNote };
    setNotes(updatedNotes);
    
    const savedNotes = JSON.parse(localStorage.getItem(`${username}-notes`)) || {};
    savedNotes[course.title] = updatedNotes;
    localStorage.setItem(`${username}-notes`, JSON.stringify(savedNotes));

    setShowNotesPopup(false);
  };

  if (!course) return <p>Loading...</p>;

  const completedCount = Object.values(progress).filter(Boolean).length;
  const totalCount = course.subtopics.length;
  const completionRate = (completedCount / totalCount) * 100;

  return (
    <div className="course-page-container">
      <Navbar />
      <div className="course-content">
        <div className="back-button">
          <Link to="/topics">← Back</Link>
        </div>
        
        <h1>{course.title}</h1>
        <div className="progress-section">
          <ProgressBar progress={completionRate} />
          <span className="progress-text">{Math.round(completionRate)}%</span>
        </div>
        
        <p className="course-description">
          {currentTopic?.details || 
           "This course provides in-depth knowledge and practical skills in the subject area."}
        </p>
        
        <table className="course-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Topics</th>
              <th>Links</th>
              <th>Flashcards</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {course.subtopics.map((sub) => (
              <tr key={sub.name} className="course-cells">
                <td className="status-cell">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={progress[sub.name] || false}
                      onChange={() => handleCheckboxChange(sub.name)}
                    />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td>{sub.name}</td>
                <td className="links-cell"> 
                  <a href={sub.link} target="_blank" rel="noopener noreferrer"><img src={LinkIcon} alt="link" className="link-icon" width="30" height="30"/></a> 
                </td>
                <td className="flashcard-cell">
                <button 
  className="flashcard-button" 
  onClick={() => handleFlashcardClick(sub)}  // Make sure "sub" is the subtopic object
></button>
                </td>
                <td className="notes-cell">
                  <button 
                    className="notes-button" 
                    onClick={() => handleNotesClick(sub.name)}
                    aria-label={`Notes for ${sub.name}`}
                  >+</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      {showNotesPopup && (
        <NotesPopup 
          subtopic={activeSubtopic} 
          notes={notes[activeSubtopic] || ""} 
          onClose={() => setShowNotesPopup(false)}
          onSave={handleSaveNotes} 
        />
      )}
    </div>
  );
}

function NotesPopup({ subtopic, notes, onClose, onSave }) {
    const [newNote, setNewNote] = useState(notes);
  
    return (
      <div className="notes-overlay">
        <div className="notes-box">
          <button onClick={onClose} className="close-button">x</button>
          <h2>Notes</h2>
          <textarea 
            value={newNote} 
            onChange={(e) => setNewNote(e.target.value)} 
            placeholder="Write your notes here..."
          />
          <div className="notes-buttons">
            <button className="save-button" onClick={() => onSave(newNote)}>Save</button>
            <button className="close-button" onClick={onClose}>x</button>
          </div>
        </div>
      </div>
    );
  }

export default CoursePage;
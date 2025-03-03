import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../main.jsx";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import Navbar from "../NavBar/Navbar.jsx";
import { topics } from "../MainPage/MainPage.jsx"; 
import "./CoursePage.css";
import LinkIcon from "../../images/LinkIcon.svg";

export const courses = null;

const getTopics = async(courseId)=>{
  const response = await fetch(`http://localhost:8080/topic/${courseId}`)
  if(!response.ok){
    const error = await response.json();
    throw new Error(error.error ||response.statusText);
  }
    const data = await response.json();
    return data;
}

function CoursePage() {
  const { id } = useParams();
  const { username } = useContext(AuthContext);
  const [progress, setProgress] = useState({});
  const [notes, setNotes] = useState({});
  const [activeSubtopic, setActiveSubtopic] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showNotesPopup, setShowNotesPopup] = useState(false);
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  
  const currentTopic = "Java";

  useEffect(() => {
    async function fetchData() {
      try{
        const course = await getTopics(id);
        setCourse(course);
      }
      catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
      const savedProgress = JSON.parse(localStorage.getItem(username)) || {};
      setProgress(savedProgress[course.title] || {});
      const savedNotes = JSON.parse(localStorage.getItem(`${username}-notes`)) || {};
      setNotes(savedNotes[course.title] || {});
    }
    fetchData();
  }, []);

  const handleCheckboxChange = (subtopic) => {
    /**const updatedProgress = { ...progress, [subtopic]: !progress[subtopic] };
    setProgress(updatedProgress);
    
    const savedProgress = JSON.parse(localStorage.getItem(username)) || {};
    savedProgress[course.title] = updatedProgress;
    localStorage.setItem(username, JSON.stringify(savedProgress));**/
  };

  const handleFlashcardClick = (subtopic) => {
   /** if (isAuthenticated) {
      navigate(`/flashcards/${id}/${subtopic.name}`);  // Use just the name property
    } else {
      navigate("/login");
    }**/
  };

  const handleNotesClick = (subtopic) => {
    
    setActiveSubtopic(subtopic);
    setShowNotesPopup(true);
    
  };

  const handleSaveNotes = (newNote) => {
    /**const updatedNotes = { ...notes, [activeSubtopic]: newNote };
    setNotes(updatedNotes);
    
    const savedNotes = JSON.parse(localStorage.getItem(`${username}-notes`)) || {};
    savedNotes[course.title] = updatedNotes;
    localStorage.setItem(`${username}-notes`, JSON.stringify(savedNotes));

    setShowNotesPopup(false);**/
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!course) return <p>Loading...</p>;

  //const completedCount = Object.values(progress).filter(Boolean).length;
  //const totalCount = course.subtopics.length;
  const completionRate = 0;

  return (
    <div className="course-page-container">
      <Navbar />
      <div className="course-content">
        <div className="back-button">
          <Link to="/topics">← Back</Link>
        </div>
        
        <h1>{"Java"}</h1>
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
            {course[0].topic.map((sub) => (
              <tr key={sub.topicId} className="course-cells">
                <td className="status-cell">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={progress[sub.topicId] || false}
                      onChange={() => handleCheckboxChange(sub.topicId)}
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
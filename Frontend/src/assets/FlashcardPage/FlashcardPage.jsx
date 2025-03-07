import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Navbar from "../NavBar/Navbar.jsx";
import "./FlashcardPage.css";
import Footer from "../Footer/Footer.jsx";



const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

  
  function FlashcardPage() {
    const location = useLocation();
    //const {userId} = location.state || {};
    const { subtopic, userId } = location.state || {};
    const { subject, topic } = useParams();
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
  
    // Load flashcards based on URL parameters
    useEffect(() => {
      if(subtopic && subtopic.flashcards){
        setFlashcards(shuffleArray(subtopic.flashcards));
      }
      console.log(userId);
    }, [subtopic,userId]);
  
  
    if (!flashcards.length) {
      console.log(userId);
      return (
        <div className="flashcard-page">
          <Navbar />
          <div className="flashcard-container">
            <Link to={{
  pathname: `/course/${subject}`,
  state: { userId } // This assumes userId is correctly retrieved from the state
}}className="back-button">← Back</Link>
            <h2>No Flashcards Available</h2>
            <p>This topic doesn't have any flashcards yet.</p>
          </div>
        </div>
      );
    }
  
    const handleNext = () => {
      setIsFlipped(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };
  
    const handlePrev = () => {
      setIsFlipped(false);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };
  
    const handleFlip = () => {
      setIsFlipped(!isFlipped);
    };
  
    
  
    return (
      
      <div className="flashcard-page">
        <Navbar />
        <div className="flashcard-container">
          <Link to={{
              pathname: `/course/${subject}`,
              state: { userId }  // Ensuring userId is passed back
              }}className="back-button">← Back</Link>
          <h2>{subtopic.name} Flashcards</h2>
          <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <p>{flashcards[currentIndex]}</p>
              </div>
              <div className="flashcard-back">
                
              </div>
            </div>
          </div>
          <div className="navigation">
            <button onClick={handlePrev} className="nav-button">←</button>
            <span>{currentIndex + 1} / {flashcards.length}</span>
            <button onClick={handleNext} className="nav-button">→</button>
          </div>
        </div>
        <Footer/>
        
      </div>
      
      
    );
  }
  
  export default FlashcardPage;
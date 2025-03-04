import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../NavBar/Navbar.jsx";
import { topics } from "../MainPage/MainPage.jsx";
import { courses } from "../CoursePage/CoursePage.jsx";
import "./FlashcardPage.css";
import Footer from "../Footer/Footer.jsx";


const flashcardsData = {
  
  1: {
    "Basics": [
      "Python is an interpreted, high-level programming language known for its simplicity.",
      "Python uses indentation instead of brackets for block structures.",
      "Variables in Python do not require explicit type declaration.",
      "Python supports multiple programming paradigms including procedural, object-oriented, and functional.",
    ],
    "Libraries": [
      "Matplotlib is used for creating static, animated, and interactive visualizations.",
      "Pandas provides data structures such as DataFrames and Series for easy data manipulation.",
      "NumPy is a fundamental package for numerical computing in Python.",
      "Requests is a popular library for making HTTP requests in Python."
    ],
    "Numpy": [
      "NumPy arrays are faster and more compact than Python lists.",
      "NumPy provides powerful N-dimensional array objects.",
      "Broadcasting in NumPy allows operations on arrays of different shapes.",
      "NumPy provides vectorized mathematical operations for efficiency."
    ],
    "Pandas": [
      "Pandas DataFrame is a 2D labeled data structure with columns of potentially different types.",
      "Pandas Series is a one-dimensional labeled array.",
      "Pandas provides powerful data manipulation capabilities like grouping, merging, and reshaping.",
      "Pandas can handle missing data with NaN values."
    ],
    "Sci-kit Learn": [
      "Scikit-learn provides tools for machine learning and statistical modeling.",
      "It offers various algorithms for classification, regression, clustering, and dimensionality reduction.",
      "Scikit-learn has a consistent API across different algorithms.",
      "It integrates well with NumPy and Pandas."
    ],
    "Matplotlib": [
      "Matplotlib is a comprehensive library for creating static, animated, and interactive visualizations.",
      "It offers both object-oriented and pyplot interfaces.",
      "Matplotlib supports various plot types including line, bar, scatter, histogram, and more.",
      "It allows extensive customization of plots."
    ],
    "Seaborn": [
      "Seaborn is built on top of Matplotlib and provides a higher-level interface.",
      "It comes with beautiful default styles and color palettes.",
      "Seaborn specializes in statistical data visualization.",
      "It integrates well with Pandas DataFrames."
    ],
    "Keras": [
      "Keras is a high-level neural networks API that runs on top of TensorFlow.",
      "It follows best practices for reducing cognitive load with consistent & simple APIs.",
      "Keras makes it easy to build and train deep learning models.",
      "It supports both convolutional networks and recurrent networks."
    ]
  },
  
  2: {
    "OOP Basics": [
      "Object-Oriented Programming (OOP) uses objects and classes to structure programs.",
      "Encapsulation helps protect data by restricting access to variables inside a class.",
      "Inheritance allows a class to inherit attributes and methods from another class.",
      "Polymorphism allows objects to be processed differently depending on their data type or class."
    ],
    "Collections Framework": [
      "Java Collections Framework provides data structures such as ArrayList, HashMap, and LinkedList.",
      "Lists maintain order, whereas Sets do not allow duplicates.",
      "Maps store key-value pairs and do not allow duplicate keys.",
      "The Queue interface follows the FIFO (First-In-First-Out) principle."
    ]
  },
  
  3: {
    "Sorting Algorithms": [
      "Bubble Sort has O(n²) average time complexity.",
      "Quick Sort has O(n log n) average time complexity.",
      "Merge Sort has O(n log n) worst-case time complexity.",
      "Selection Sort finds the minimum element and places it at the beginning."
    ],
    "Graph Algorithms": [
      "Breadth-First Search (BFS) uses a queue data structure.",
      "Depth-First Search (DFS) uses a stack or recursion.",
      "Dijkstra's algorithm finds the shortest path between nodes in a graph.",
      "A* algorithm is an informed search algorithm for finding the shortest path."
    ]
  },
  
  4: {
    "HTML Basics": [
      "HTML (HyperText Markup Language) is the standard markup language for web pages.",
      "HTML elements are represented by tags like <h1>, <p>, and <div>.",
      "The DOCTYPE declaration tells the browser what version of HTML the page is using.",
      "Semantic HTML elements like <header>, <nav>, and <footer> describe their meaning."
    ],
    "CSS Fundamentals": [
      "CSS (Cascading Style Sheets) is used to style and layout web pages.",
      "Selectors target HTML elements to apply styles.",
      "The box model consists of margin, border, padding, and content.",
      "Flexbox and Grid are powerful layout systems in CSS."
    ]
  },
  
  5: {
    "JS Basics": [
      "JavaScript is a high-level, interpreted programming language.",
      "It supports both object-oriented and functional programming styles.",
      "Variables can be declared using var, let, or const.",
      "Functions are first-class citizens in JavaScript."
    ],
    "DOM Manipulation": [
      "The Document Object Model (DOM) represents the page structure.",
      "getElementById and querySelector are methods to select elements.",
      "addEventListener attaches event handlers to elements.",
      "innerHTML, textContent, and appendChild are used to modify the DOM."
    ]
  },
  
  6: {
    "React Basics": [
      "React is a JavaScript library for building user interfaces.",
      "Components are the building blocks of React applications.",
      "JSX is a syntax extension that allows writing HTML-like code in JavaScript.",
      "Virtual DOM improves performance by minimizing direct DOM manipulation."
    ],
    "Hooks": [
      "Hooks let you use state and other React features without writing a class.",
      "useState is used for managing component state.",
      "useEffect handles side effects in functional components.",
      "Custom hooks allow you to extract and reuse component logic."
    ]
  },
  
  7: {
    "ML Basics": [
      "Machine Learning is a field that enables computers to learn without explicit programming.",
      "Supervised learning uses labeled data to train models.",
      "Unsupervised learning finds patterns in unlabeled data.",
      "The training-testing split helps evaluate model performance."
    ],
    "Neural Networks": [
      "Neural networks are inspired by the human brain's structure.",
      "Deep learning uses neural networks with multiple layers.",
      "Activation functions introduce non-linearity into the model.",
      "Backpropagation is used to train neural networks."
    ]
  },
  
  8: {
    "SQL Basics": [
      "SQL (Structured Query Language) is used to communicate with relational databases.",
      "SELECT retrieves data from a database.",
      "INSERT adds new records to a table.",
      "PRIMARY KEY uniquely identifies each record in a table."
    ],
    "Advanced Queries": [
      "JOIN combines rows from two or more tables based on a related column.",
      "Subqueries are queries nested inside another query.",
      "GROUP BY groups rows that have the same values in specified columns.",
      "HAVING filters groups created by GROUP BY."
    ]
  }
};


const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };
  
  function FlashcardPage() {
    const { subject, topic } = useParams();
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
  
    // Load flashcards based on URL parameters
    useEffect(() => {
      console.log("Subject:", subject, "Topic:", topic);
      
      // Handle case where topic is an object instead of a string
      let topicName = topic;
      if (topic && typeof topic === 'object' && topic.name) {
        topicName = topic.name;
        console.log("Topic was an object, using topic.name instead:", topicName);
      }
      
      // Try to find flashcards by course ID and topic
      let cards = [];
      
      // Direct match by course ID and exact topic
      if (flashcardsData[subject] && flashcardsData[subject][topicName]) {
        console.log("Found cards by direct ID and exact topic match");
        cards = flashcardsData[subject][topicName];
      } 
      // Case-insensitive topic matching
      else if (flashcardsData[subject]) {
        const matchingTopic = Object.keys(flashcardsData[subject]).find(
          t => t.toLowerCase() === String(topicName).toLowerCase()
        );
        if (matchingTopic) {
          console.log("Found cards by case-insensitive topic match");
          cards = flashcardsData[subject][matchingTopic];
        }
      }
      
      // Try to find by course title if not found by ID
      if (cards.length === 0) {
        const courseTitle = getCourseTitle(subject);
        const courseId = Object.keys(courses).find(id => courses[id].title === courseTitle);
        
        if (courseId && flashcardsData[courseId]) {
          // Try exact topic match
          if (flashcardsData[courseId][topicName]) {
            console.log("Found cards by course title lookup");
            cards = flashcardsData[courseId][topicName];
          } 
          // Try case-insensitive topic match
          else {
            const matchingTopic = Object.keys(flashcardsData[courseId]).find(
              t => t.toLowerCase() === String(topicName).toLowerCase()
            );
            if (matchingTopic) {
              console.log("Found cards by course title and case-insensitive topic match");
              cards = flashcardsData[courseId][matchingTopic];
            }
          }
        }
      }
      
      if (cards && cards.length > 0) {
        console.log(`Found ${cards.length} flashcards, setting them now`);
        setFlashcards(shuffleArray(cards));
      } else {
        console.warn("No flashcards found for:", subject, topicName);
        setFlashcards([]);
      }
    }, [subject, topic]);
  
    // Helper function to get course title from ID using the topics array
    const getCourseTitle = (id) => {
      // If it's already a title, return it
      const courseIds = Object.keys(courses);
      for (const courseId of courseIds) {
        if (courses[courseId].title === id) {
          return id;
        }
      }
      
      // Otherwise, try to find the title from the ID
      const numericId = parseInt(id);
      const foundTopic = topics.find(topic => topic.id === numericId);
      return foundTopic ? foundTopic.title : id;
    };
  
    if (!flashcards.length) {
      return (
        <div className="flashcard-page">
          <Navbar />
          <div className="flashcard-container">
            <Link to={`/course/${subject}`} className="back-button">← Back</Link>
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
  
    // Get the course title for display
    const displayTitle = () => {
      // If subject is a number (course ID), use the course title from courses
      if (!isNaN(subject) && courses[subject]) {
        return courses[subject].title;
      }
      // Otherwise use the getCourseTitle helper
      return getCourseTitle(subject);
    };
  
    return (
      
      <div className="flashcard-page">
        <Navbar />
        <div className="flashcard-container">
          <Link to={`/course/${subject}`} className="back-button">← Back</Link>
          <h2>{displayTitle()}: {topic}</h2>
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
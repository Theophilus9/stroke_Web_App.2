import React, { useState, useEffect } from 'react';
import './styles/Factsbox.css';

const facts = [
  "Stroke is the second leading cause of death worldwide, claiming millions of lives every year.",
  "About 1 in 4 adults over 25 will experience a stroke in their lifetime, making it a major global health concern.",
  "Strokes can happen at any age, even in children and young adults, not just the elderly.",
  "Early recognition of stroke symptoms and immediate medical attention can drastically reduce long-term disability.",
  "High blood pressure, diabetes, smoking, and poor diet are major risk factors that can often be controlled to prevent stroke.",
  "Innovative technology and AI can help predict stroke risk, enabling preventive care and better patient outcomes."
];


const Factsbox = () => {
    const [currentFact, setCurrentFact] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFact((prevIndex) => (prevIndex + 1) % facts.length);
        }, 5000); // Change fact every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
  <div className="factsbox-container">
    <div className='factsbox-header'>
      <h2>Did You Know...</h2>
    </div>
    <div className="fact-container">
      <p
        className="fact-text"
        key={currentFact}
        style={{ opacity: 0, animation: "fadeIn 0.5s forwards" }}
      >
        {facts[currentFact]}
      </p>
    </div>
    <div className="dots-container">
      {facts.map((_, index) => (
        <span
          key={index}
          className={`dot ${index === currentFact ? 'active' : ''}`}
        ></span>
      ))}
    </div>
  </div>
);

};

export default Factsbox;

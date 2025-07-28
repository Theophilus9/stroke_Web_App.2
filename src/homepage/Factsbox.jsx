import React, { useState, useEffect } from 'react';
import './styles/Factsbox.css';

const facts = [
    "Strokes can happen at any age, even in children.",
    "FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency."
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
            <p className="fact-text">{facts[currentFact]}</p>
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

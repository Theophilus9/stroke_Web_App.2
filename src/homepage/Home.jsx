import React from 'react';
import Navbar from './Navbar';
import Foot from './Foot';
import Body from './Body';
import './styles/Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="body-section">
                <Body />            
            </div>
        </div>
    );
};

export default Home;

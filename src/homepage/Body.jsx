import React from 'react';
import './styles/Body.css'
import Factsbox from  './factsbox';

const Body = () => {
    return (
        <div className="body-container">
            <div className="Left-part">
                <div className="left-section-top">
                    <h1>Do You Have Stroke?</h1>
                    <p>take this quiz now to know if you are likely to get stroke or not, this quz does not guarantee that you will have stoke or not but serves as a cuation to seek medical attention or help from any close medical center. thank you for using our site.</p>
                    <button className="start-button">
                        <a href="predict">Get Started</a>
                    </button>
                </div>
                <div className="left-section-bottom">
                    <Factsbox />
                </div>
            </div>

            {/* right part */}
            <div className="Right-part">
                <div className='image-container'>
                    <img src="/static/pic_1.png" alt="Stroke Risk App Logo" className="logo" />
                </div>
            </div>
        </div>
    );
}

export default Body;
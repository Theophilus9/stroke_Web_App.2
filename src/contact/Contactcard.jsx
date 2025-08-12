import React from 'react';
import './styles/Contactcard.css';

const Contactcard = ({name, email, bgcolor}) => {
    return (
        <div className= "contact-card" style={{backgroundColor: bgcolor}}>
            <div className="contact-img">
                <img src="/static/contact_pic.png" alt="contact-image" />
            </div>
            <div  className="contact-details">
                <h2> {name} </h2>
                <h2> {email} </h2>
                <div className="social-icons">
                <a href="#instagram"><img src="/static/instagram-icon.png" alt="Instagram" /></a>
                <a href="#facebook"><img src="/static/facebook-icon.png" alt="Facebook" /></a>
                <a href="#linkedin"><img src="/static/linkedin-icon.png" alt="LinkedIn" /></a>
            </div>
                <div className="button">
                    <a href="www.gmail.com">Contact Me</a>
                </div>
            </div>
        </div>
    );
}

export default Contactcard;
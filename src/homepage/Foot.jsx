import React from "react";
import "./styles/Foot.css";

const Foot = () => {
    return (
        <div className="footer">
            <div className="footer-left">
                <a href="#instagram"><img src="/static/instagram-icon.png" alt="Instagram" /></a>
                <a href="#facebook"><img src="/static/facebook-icon.png" alt="Facebook" /></a>
                <a href="#linkedin"><img src="/static/linkedin-icon.png" alt="LinkedIn" /></a>
            </div>

            <div className="footer-center">
            <p>&copy; 2025 Stroke Risk App. All rights reserved.</p>
            </div>

            <div className="footer-right">
                <div>
                <a href="contacts">Contact</a>
                </div>
            </div>
        </div>
    );
};

export default Foot;

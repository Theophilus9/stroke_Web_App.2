import React from "react";
import "./styles/support.css";
import ChatBot from "./ChatBot";
import Fungame from "./Fungame";

const Support = () => {
  return (
    <div className="support-container">
      <h1 className="support-title">🩺 Stroke Support & Education</h1>
      <div>
      <Fungame />
      </div>
      <div className="support-sections">
        {/* Symptoms */}
        <div className="support-card">
          <h2>⚠️ Common Stroke Symptoms</h2>
          <ul>
            <li>Sudden numbness or weakness in the face, arm, or leg (especially on one side)</li>
            <li>Confusion, trouble speaking, or difficulty understanding speech</li>
            <li>Sudden trouble seeing in one or both eyes</li>
            <li>Difficulty walking, dizziness, loss of balance or coordination</li>
            <li>Severe headache with no known cause</li>
          </ul>
        </div>

        {/* Prevention */}
        <div className="support-card">
          <h2>🛡️ Stroke Prevention Tips</h2>
          <ul>
            <li>Maintain a healthy diet rich in fruits, vegetables, and whole grains</li>
            <li>Exercise regularly (at least 30 minutes most days)</li>
            <li>Avoid smoking and limit alcohol consumption</li>
            <li>Manage conditions like high blood pressure, diabetes, and cholesterol</li>
            <li>Go for regular medical checkups</li>
          </ul>
        </div>

        {/* After Diagnosis */}
        <div className="support-card">
          <h2>💙 Life After a Stroke Diagnosis</h2>
          <ul>
            <li>Follow your doctor’s advice and treatment plan strictly</li>
            <li>Take prescribed medications consistently</li>
            <li>Consider physical therapy or rehabilitation programs</li>
            <li>Stay socially connected with friends and family</li>
            <li>Monitor your health closely and report new symptoms immediately</li>
          </ul>
        </div>

        {/* Video Section */}
        <div className="support-card video-card">
          <h2>🎥 How to Quickly Identify a Stroke</h2>
          <p>
            Recognizing the signs of a stroke early can save lives. 
            Remember <strong>FAST</strong>: <em>Face, Arms, Speech, Time</em>.  
            Watch this short video to learn how to act quickly.
          </p>
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/kBoKrAILPPo"
              title="How to Quickly Identify a Stroke"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      
      <ChatBot />
    </div>
  );
};

export default Support;

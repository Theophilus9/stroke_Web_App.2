import React from "react";
import "./styles/Support.css";
import Navbar from "../homepage/Navbar";
import ChatBot from "./Chatbot.jsx";

const Support = () => {
  return (
    <div className="support-container">
      <div className="support-content">
        <h1>
          Psychological Care After Stroke: The Virtuous Cycle of a Holistic
          Approach to Recovery
        </h1>
        <p>
          When stroke patients do not receive adequate support for mental
          health, it can hinder recovery and reduce motivation to pursue
          rehabilitation.
        </p>
        <p>
          By treating stroke patients holistically – by taking into account
          mental and social factors, rather than just the physical symptoms of
          stroke – a better outcome can be achieved.
        </p>
        <p>
          You’re about to learn why psychological care is important for stroke
          patients and how you can approach it.
        </p>

        <div className="support-section">
          <h2>The Need for Psychological Care After Stroke</h2>
          <p>
            A stroke is a life-threatening condition that often leaves
            significant aftermath, including but not limited to: impaired
            mobility, impaired speech and/or cognition, difficulty eating, and
            inability to use the bathroom independently.
          </p>
          <p>
            Aside from physical impairments, between 35%-60% of stroke patients
            experience cognitive impairments. More than a third struggle with
            post-stroke depression — the most common psychiatric disorder after
            stroke.
          </p>
          <p>
            With the majority of stroke patients struggling with new cognitive,
            physical, and emotional distress, psychological care should be
            prioritized.
          </p>
        </div>

        <div className="support-section">
          <h2>The Virtuous Cycle of Psychological Care</h2>
          <blockquote>
            “Being able to talk to someone in the early days who really knows
            what you’re going through helps to stop you having to go to a
            psychiatrist six months later.” – A stroke patient with aphasia.
          </blockquote>
          <p>
            Early psychological care can improve confidence, motivation, and
            wellbeing. This creates a virtuous cycle where:
          </p>
          <ul>
            <li>
              More psychological care results in more positive mood and
              confidence.
            </li>
            <li>
              Positive mood and confidence motivate more action towards
              recovery, resulting in more physical improvements.
            </li>
            <li>
              Physical improvements further boost confidence and mood.
            </li>
          </ul>
        </div>

        <div className="support-section">
          <h2>Seeking Psychological Care After Stroke</h2>
          <p>
            If you would like to seek psychological care for yourself or a
            loved one, talk to your doctor or medical team. Your doctor may
            refer you to a psychiatrist or other health specialist.
          </p>
          <p>Common approaches include:</p>
          <ul>
            <li>
              <strong>Psychotherapy:</strong> “Talk therapy” with a trained
              therapist to address psychiatric disorders, including depression.
            </li>
            <li>
              <strong>Positive psychology:</strong> Focuses on mental wellness,
              happiness, and fulfillment.
            </li>
            <li>
              <strong>Mindfulness:</strong> Staying in the present moment to
              reduce anxiety and stress.
            </li>
            <li>
              <strong>Cognitive Behavioral Therapy (CBT):</strong> Challenging
              negative thought patterns to improve emotional wellbeing.
            </li>
          </ul>
        </div>

        <div className="support-section">
          <h2>Improving Psychological Care After Stroke</h2>
          <p>
            The aftermath of a stroke can take a devastating toll on patients’
            psychological health. By experimenting with therapies such as talk
            therapy or positive psychology, recovery can become a virtuous
            cycle of ongoing improvement.
          </p>
        </div>

        <div className="support-section">
          <h2>How to Quickly Identify a Stroke</h2>
          <p>
            Recognizing the signs of a stroke early can save lives. This short
            video explains the key symptoms using the FAST method: Face, Arms,
            Speech, and Time. Learn how to act quickly and get immediate
            medical help if you suspect someone is having a stroke.
          </p>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe
              src="https://www.youtube.com/embed/kBoKrAILPPo"
              title="How to Quickly Identify a Stroke"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
              }}
            ></iframe>
          </div>
        </div>

        <p className="good-luck">Good luck!</p>

        <div className="external-link">
          <a
            href="https://www.stroke.org/en/life-after-stroke"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit the American Stroke Association Support Page
          </a>
        </div>
      </div>

      {/* Floating ChatBot */}
      <ChatBot />
    </div>
  );
};

export default Support;

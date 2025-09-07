import React, { useState } from "react";
import "./styles/game.css";

const Fungame = () => {
  const questions = [
  {
    questionText: "What is a common warning sign of a stroke?",
    answerOptions: [
      { answerText: "Sudden severe headache", isCorrect: true },
      { answerText: "Gradual muscle pain", isCorrect: false },
      { answerText: "Mild dizziness after standing up", isCorrect: false },
      { answerText: "Slow hair loss", isCorrect: false },
    ],
  },
  {
    questionText: "Which lifestyle habit can reduce the risk of stroke?",
    answerOptions: [
      { answerText: "Smoking regularly", isCorrect: false },
      { answerText: "Eating a balanced diet", isCorrect: true },
      { answerText: "Avoiding exercise", isCorrect: false },
      { answerText: "Skipping meals", isCorrect: false },
    ],
  },
  {
    questionText: "What does the 'F' in FAST (stroke warning signs) stand for?",
    answerOptions: [
      { answerText: "Feet weakness", isCorrect: false },
      { answerText: "Face drooping", isCorrect: true },
      { answerText: "Finger numbness", isCorrect: false },
      { answerText: "Fatigue", isCorrect: false },
    ],
  },
  {
    questionText: "Which organ is directly affected during a stroke?",
    answerOptions: [
      { answerText: "Heart", isCorrect: false },
      { answerText: "Brain", isCorrect: true },
      { answerText: "Lungs", isCorrect: false },
      { answerText: "Kidneys", isCorrect: false },
    ],
  },
  {
    questionText: "High blood pressure increases the risk of a stroke because it:",
    answerOptions: [
      { answerText: "Damages blood vessels", isCorrect: true },
      { answerText: "Reduces oxygen in the lungs", isCorrect: false },
      { answerText: "Weakens bones", isCorrect: false },
      { answerText: "Causes rapid hair loss", isCorrect: false },
    ],
  },
  {
    questionText: "Which of the following is a temporary stroke-like event often warning of a future stroke?",
    answerOptions: [
      { answerText: "Heart attack", isCorrect: false },
      { answerText: "Transient Ischemic Attack (TIA)", isCorrect: true },
      { answerText: "Epileptic seizure", isCorrect: false },
      { answerText: "Migraine", isCorrect: false },
    ],
  },
  {
    questionText: "What is the recommended action if someone shows signs of a stroke?",
    answerOptions: [
      { answerText: "Wait and see if it passes", isCorrect: false },
      { answerText: "Call emergency services immediately", isCorrect: true },
      { answerText: "Give them water and let them rest", isCorrect: false },
      { answerText: "Make them walk around", isCorrect: false },
    ],
  },
  {
    questionText: "Which of these is NOT a risk factor for stroke?",
    answerOptions: [
      { answerText: "Diabetes", isCorrect: false },
      { answerText: "Smoking", isCorrect: false },
      { answerText: "Regular exercise", isCorrect: true },
      { answerText: "High cholesterol", isCorrect: false },
    ],
  },
  {
    questionText: "Which symptom is associated with arm weakness in a stroke?",
    answerOptions: [
      { answerText: "Inability to lift one arm", isCorrect: true },
      { answerText: "Hair thinning", isCorrect: false },
      { answerText: "Blurred vision", isCorrect: false },
      { answerText: "Mild dizziness", isCorrect: false },
    ],
  },
  {
    questionText: "Early treatment of stroke is critical because:",
    answerOptions: [
      { answerText: "It can prevent permanent brain damage", isCorrect: true },
      { answerText: "It guarantees no future strokes", isCorrect: false },
      { answerText: "It eliminates all risk factors", isCorrect: false },
      { answerText: "It makes recovery instant", isCorrect: false },
    ],
  },
];


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setFeedback("✅ Correct! Great job!");
    } else {
      setFeedback("❌ Incorrect. Try again!");
    }

    setTimeout(() => {
      setFeedback("");
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestionIndex(nextQuestion);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowScore(false);
    setFeedback("");
  };

  return (
    <div className="quiz-container-wrapper">
      <div className="quiz-card">
        <div className="quiz-content">
          <h1 className="quiz-title">🧠 Brain Health Quiz</h1>
          <p className="quiz-subtitle">
            Test your knowledge on stroke prevention and brain health with this
            quick quiz.
          </p>

          {showScore ? (
            <div className="quiz-score">
              You scored {score} out of {questions.length}
              <button onClick={handleRestart} className="restart-button">
                Restart Quiz
              </button>
            </div>
          ) : (
            <>
              <div className="question-section">
                <h2 className="question-text">
                  {questions[currentQuestionIndex].questionText}
                </h2>
              </div>
              <div className="answer-grid">
                {questions[currentQuestionIndex].answerOptions.map(
                  (answerOption, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleAnswerOptionClick(answerOption.isCorrect)
                      }
                      className="answer-button"
                    >
                      {answerOption.answerText}
                    </button>
                  )
                )}
              </div>
              {feedback && (
                <div
                  className={`feedback-message ${
                    feedback.includes("Correct")
                      ? "feedback-correct"
                      : "feedback-incorrect"
                  }`}
                >
                  {feedback}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fungame;

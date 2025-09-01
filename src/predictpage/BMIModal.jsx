import { useState } from "react";
import "./styles/BMIModal.css"; // optional, for modal styling

const BMIModal = ({ isOpen, onClose, onSave }) => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (weight > 0 && height > 0) {
      const h = height / 100; // convert cm to m
      const result = (weight / (h * h)).toFixed(2);
      setBmi(result);
      onSave(result); // send BMI to parent (PredictionForm)
    }
  };

  if (!isOpen) return null;
  console.log("BMIModal mounted ✅");
  return (
    <div className="bmi-modal-overlay">
      <div className="bmi-modal-content">
        <h2>Calculate BMI</h2>
        <div>
          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <label>Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <button onClick={calculateBMI}>Calculate</button>
        {bmi && <p>Your BMI: {bmi}</p>}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BMIModal;

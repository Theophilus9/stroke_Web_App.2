import { useState } from "react";
import "./styles/BMIModal.css";

const BMIModal = ({ isOpen, onClose, onSave }) => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to m

    // Validate weight and height
    if (isNaN(w) || w <= 0) {
      alert("Weight must be a positive number.");
      return;
    }
    if (isNaN(h) || h <= 0) {
      alert("Height must be a positive number.");
      return;
    }

    const result = w / (h * h);
    const rounded = Number(result.toFixed(2));
    setBmi(rounded);

    // Send the value to parent
    onSave(rounded);
  };

  if (!isOpen) return null;

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
            required
            min="0"
          />
        </div>
        <div>
          <label>Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
            min="0"
          />
        </div>
        <button type="button"onClick={calculateBMI}>Calculate</button>
        {bmi !== null && <p>Your BMI: {bmi}</p>}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BMIModal;

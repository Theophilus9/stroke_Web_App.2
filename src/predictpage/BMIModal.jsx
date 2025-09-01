import { useState } from "react";
import "./styles/BMIModal.css"; // optional, for modal styling

const BMIModal = ({ isOpen, onClose, onSave }) => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);

  useEffect(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm → m

    if (w > 0 && h > 0) {
      const result = w / (h * h); // BMI formula
      const rounded = Number(result.toFixed(2));
      setBmi(rounded);
      onSave(rounded); // update parent whenever BMI changes
    } else {
      setBmi(null); // reset if inputs are invalid
    }
  }, [weight, height, onSave]);


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

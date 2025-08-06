import React, { useState } from 'react';
import './styles/PredictionForm.css';
import Swal from 'sweetalert2';


const PredictionForm = () => {
  const [formData, setFormData] = useState({
    gender: 'Other',
    age: '',
    hypertension: '',
    heart_disease: '',
    ever_married: '',
    work_type: '',
    Residence_type: '',
    avg_glucose_level: '',
    bmi: '',
    smoking_status: ''
  });

  const [username, setUsername] = useState('');
  const [predictionResult, setPredictionResult] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert to correct types
    const payload = {
      gender: formData.gender,
      age: parseFloat(formData.age),
      hypertension: parseInt(formData.hypertension),
      heart_disease: parseInt(formData.heart_disease),
      ever_married: formData.ever_married,
      work_type: formData.work_type,
      Residence_type: formData.Residence_type,
      avg_glucose_level: parseFloat(formData.avg_glucose_level),
      bmi: parseFloat(formData.bmi),
      smoking_status: formData.smoking_status
   };

    try {
      console.log("Payload being sent:", payload);

      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log("Response from backend:", data); // optional debug log

      if (data.result) {
        setPredictionResult(data.result);
        Swal.fire({
        title: `Hello ${username}!`,
        text: `Your stroke risk prediction is: ${data.result}`,
        icon: 'info',
        confirmButtonColor: '#683ddfff',
        confirmButtonText: 'Okay'
      });
      } else if (data.error) {
        setPredictionResult("Error: " + data.error);
        alert(`${username}, there was an error with your prediction: ${data.error}`);
      } else {
        setPredictionResult("Unexpected response");
        alert(`${username}, there was an unexpected response from the server.`);
      }

    } catch (error) {
      console.error("Prediction error:", error);
      setPredictionResult("Failed to connect to server");
    }
  };  

    return (
  <div className="prediction-form">
    <form onSubmit={handleSubmit}>
      <div className="row-one">
        <div className="username-selection">
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div className="age-selection">
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            required
          />
        </div>
      </div>

      <div className="row-two">
        <div className="gender-selection">
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
            />
            Female
          </label>
        </div>
      </div>

      <div className="row-three">
        <div className="ever-married-selection">
          <select
            name="ever_married"
            value={formData.ever_married}
            onChange={handleChange}
            required
          >
            <option value="">Marital Status</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="work-type-selection">
          <select
            name="work_type"
            value={formData.work_type}
            onChange={handleChange}
            required
          >
            <option value="">Work type</option>
            <option value="Private">Private</option>
            <option value="Self-employed">Self-employed</option>
            <option value="Govt_job">Govt Job</option>
            <option value="children">Children</option>
            <option value="Never_worked">Never Worked</option>
          </select>
        </div>
      </div>

      <div className="residence-type-selection">
        <select
          name="Residence_type"
          value={formData.Residence_type}
          onChange={handleChange}
          required
        >
          <option value="">Residence type</option>
          <option value="Urban">Urban</option>
          <option value="Rural">Rural</option>
        </select>
      </div>

      <div className="row-four">
        <div className="avg-glucose-level-selection">
          <input
            type="number"
            name="avg_glucose_level"
            value={formData.avg_glucose_level}
            onChange={handleChange}
            placeholder="Glucose level"
            required
          />
        </div>

        <div className="bmi-selection">
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            placeholder="BMI"
            required
          />
        </div>
      </div>

      <div className="smoking-status-selection">
        <select
          name="smoking_status"
          value={formData.smoking_status}
          onChange={handleChange}
          required
        >
          <option value="">Do you smoke</option>
          <option value="never smoked">Never Smoked</option>
          <option value="formerly smoked">Formerly Smoked</option>
          <option value="smokes">Smokes</option>
          <option value="Unknown">Unknown</option>
        </select>
      </div>

      <div className="hypertension-selection">
        <select
          name="hypertension"
          value={formData.hypertension}
          onChange={handleChange}
          required
        >
          <option value="">Have you ever been diagnosed with hypertension</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="heart-disease-selection">
        <select
          name="heart_disease"
          value={formData.heart_disease}
          onChange={handleChange}
          required
        >
          <option value="">Have you ever had a Heart disease</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-buttons">
        <button type="reset">Reset</button>
        <button type="submit">Predict</button>
      </div>
    </form>

    {/* {predictionResult && (
      <div className="result-box">
        <h3>Prediction Result:</h3>
        <p>{predictionResult}</p>
      </div>
    )} */}
    
  </div>
);
  
};

export default PredictionForm;

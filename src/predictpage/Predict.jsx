import React from 'react';
import './styles/Predict.css';
import Navbar from '../homepage/Navbar';
import Foot from '../homepage/Foot';
import Predictionform from './Predictionform';

const Predict = () => {
    return (
        <div className="predict-container">
            <div className="predict-header">
                <Navbar />
            </div>
            <div className="predict-body">
                <div className="img-container">
                    <img src="static/predict_page_image.png" alt="Predict" />
                </div>
                <div className="predict-form">
                    <Predictionform />
                </div>
            </div>
            <div className='predict-footer'>
                <Foot />
            </div>
        </div>
    )
}
export default Predict;
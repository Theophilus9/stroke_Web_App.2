import React from 'react';
import './styles/Contacts.css';
import Navbar from '../homepage/Navbar';
import Contactcard from './Contactcard';

const Contacts = () => {
    return (
        <div className="contacts-container">
            <Navbar />
            <div className="contacts-content">
                <Contactcard name="Theophilus Arkoh" email="atotheophilus@gmail.com" bgcolor="#FC3550"/>
                <Contactcard name="Jacklyn Larby" email="Jackly_larby@gmail.com" bgcolor="#FFC107"/>
            </div>
        </div>
    )
}

export default Contacts;
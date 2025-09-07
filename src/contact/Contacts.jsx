import React from 'react';
import './styles/Contacts.css';
import Contactcard from './Contactcard';

const Contacts = () => {
    return (
        <div className="contacts-container">
            <div className="contacts-content">
                <Contactcard name="Theophilus Arkoh" email="atotheophilus@gmail.com" bgcolor="#FC3550"/>
                <Contactcard name="Jacklyn Larby" email="Jackly_larby@gmail.com" bgcolor="#FFC107"/>
                <Contactcard name="Jacklyn Larby" email="Jackly_larby@gmail.com" bgcolor="#07ff07ff"/>
            </div>
        </div>
    )
}

export default Contacts;
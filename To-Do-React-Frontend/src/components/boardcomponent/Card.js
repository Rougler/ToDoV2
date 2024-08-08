import React from 'react';
import '../styles/Card.css';

const Card = ({ text }) => {
  return (
    <div className="card">
      {text}
    </div>
  );
};

const deleteCard = ({ text }) => {
  return (
    <div className="deletecard">
      {text}
    </div>
  );
};

export default Card;

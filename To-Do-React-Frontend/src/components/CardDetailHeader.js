import React from 'react';
import './CardDetailHeader.css';

const CardDetailHeader = ({ card, onClose }) => {
  return (
    <div className="card-detail-header">
      <h2>{card.title}</h2>
      <span>in list <a href="#">{card.listTitle}</a></span>
      <button className="close-button" onClick={onClose}>×</button>
    </div>
  );
};

export default CardDetailHeader;

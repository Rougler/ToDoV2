// src/components/Column.js
import React, { useState } from 'react';
import Card from './Card';
import './Column.css';

const Column = ({ column, onCardClick, addCard }) => {
  const [newCardText, setNewCardText] = useState('');

  const handleAddCard = () => {
    if (newCardText.trim()) {
      addCard(column.id, newCardText);
      setNewCardText('');
    }
  };

  return (
    <div className="column">
      <h2>{column.title}</h2>
      {column.cards.map((card, index) => (
        <Card key={index} text={card} onClick={() => onCardClick({ title: card, listTitle: column.title })} />
      ))}
      <div className="add-card">
        <input
          type="text"
          placeholder="Add a card..."
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
        />
        <button onClick={handleAddCard}>Add</button>
      </div>
      
    </div>
  );
};

export default Column;


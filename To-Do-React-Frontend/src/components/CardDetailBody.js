import React, { useState } from 'react';
import './CardDetailBody.css';

const CardDetailBody = ({ card }) => {
  const [description, setDescription] = useState(card.description);

  return (
    <div className="card-detail-body">
      <div className="card-detail-section">
        <h3>Description</h3>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Add a more detailed description..."
        />
      </div>
      <div className="card-detail-section">
        <h3>Activity</h3>
        <textarea placeholder="Write a comment..." />
      </div>
    </div>
  );
};

export default CardDetailBody;

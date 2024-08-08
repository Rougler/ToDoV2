// ParentComponent.js
import React, { useState } from 'react';
import Dashboard from '../../pages/Dashboard';
import Board from '../../pages/Board';

const ParentComponent = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div>
      <Dashboard setSelectedCard={setSelectedCard} />
      <Board selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
    </div>
  );
};

export default ParentComponent;

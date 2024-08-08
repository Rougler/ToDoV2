import React, { useState } from 'react';
import CardDetail from './CardDetail';

const ParentComponent = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'Project planning' },
    // Add more cards as needed
  ]);

  const [selectedCard, setSelectedCard] = useState(null);

  const handleDeleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
    setSelectedCard(null); // Close the modal after deletion
  };

  return (
    <div>
      {cards.map(card => (
        <div key={card.id} onClick={() => setSelectedCard(card)}>
          {card.title}
        </div>
      ))}

      {selectedCard && (
        <CardDetail
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onDelete={handleDeleteCard} // Ensure this is passed
        />
      )}
    </div>
  );
};

export default ParentComponent;

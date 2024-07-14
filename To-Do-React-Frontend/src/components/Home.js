import React, { useState } from "react";
import Board from "./Board";
import CardDetail from "./CardDetail";
import "./home.css";

function Home() {
  const [selectedCard, setSelectedCard] = useState(null);

  const openCardDetail = (card) => {
    setSelectedCard(card);
  };

  const closeCardDetail = () => {
    setSelectedCard(null);
  };

  return (
    <div className="App">
      <div className="main-content">
        <Board onCardClick={openCardDetail} />
        {selectedCard && (
          <CardDetail card={selectedCard} onClose={closeCardDetail} />
        )}
      </div>
    </div>
  );
}

export default Home;

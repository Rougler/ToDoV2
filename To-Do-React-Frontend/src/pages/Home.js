import React, { useState } from "react";
import Board from "../pages/Board";
import CardDetail from "../components/boardcomponent/CardDetail";
import "../styles/home.css";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const userInfo = location.state;
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

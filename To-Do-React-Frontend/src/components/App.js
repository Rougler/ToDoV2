// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import CSPMBoard from './CSPMBoard';
import IntactBoard from './IntactBoard';
import CloudOptGenBoard from './CloudOptGenBoard';
import CardDetailTitle from './CardDetailTitle';
import './App.css';
import Projects from './Projects';

// Simulated API call function
const updateCard = async (cardId, updatedData) => {
  // Simulate an API request with a timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Card ${cardId} updated with`, updatedData);
      resolve();
    }, 1000);
  });
};

const App = () => {
  const [card, setCard] = useState({
    id: 1,
    title: 'Sample Card Title',
    description: 'This is a sample card description.',
  });

  const handleUpdateCard = async (cardId, updatedData) => {
    await updateCard(cardId, updatedData);
    setCard((prevCard) => ({
      ...prevCard,
      ...updatedData,
    }));
  };

  return (
    <Router>
      <div className="app">
        {/* <Header /> */}
        <div className="content">
          <Switch>
            <Route path="/cspm">
              <CSPMBoard />
              <CardDetailTitle card={card} updateCard={handleUpdateCard} />
            </Route>
            <Route path="/intact">
              <IntactBoard />
              <CardDetailTitle card={card} updateCard={handleUpdateCard} />
            </Route>
            <Route path="/cloudopt-gen">
              <CloudOptGenBoard />
              <CardDetailTitle card={card} updateCard={handleUpdateCard} />
            </Route>
            <Route path="/">
              <CSPMBoard />
              <CardDetailTitle card={card} updateCard={handleUpdateCard} />
            </Route>
            <Route path="/Projects" component={Projects} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;

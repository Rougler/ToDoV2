import React, { useState, useEffect } from "react";
import "./Board.css"; // Ensure the correct path to your CSS file
import DeleteColumn from "./DeleteColumn";
import CardDetail from "./CardDetail";
import axios from "axios";
import ProjectDropdown from "./ProjectDropdown"; // Update the import statement d

const initialLists = ["Not-Start", "On-going", "Done", "Staging"];
const initialTabs = [];

const Board = () => {
  const [cards, setCards] = useState([]);
  const [lists, setLists] = useState(initialLists);
  const [selectedCard, setSelectedCard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectedTab, setSelectedTab] = useState("tab0");
  const [tabs, setTabs] = useState(initialTabs);
  const [managerNames, setManagerNames] = useState({});
  const [newListTitle, setNewListTitle] = useState("");
  const [showAddListForm, setShowAddListForm] = useState(false); // State to toggle add list form

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/todo/tasks/");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const mappedCards = tasks.map((task) => ({
      id: task.id,
      title: task.taskName,
      listTitle: task.taskStatus,
      cover: task.cover,
      projectName: task.project,
    }));

    setCards(mappedCards);
  }, [tasks]);

  const deleteCard = (cardId) => {
    setCards(cards.filter((card) => card.id !== cardId));
    setSelectedCard(null);
  };

  const moveCard = (cardId, newListTitle) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, listTitle: newListTitle } : card
    );
    setCards(updatedCards);
  };

  const saveTitle = (cardId, newTitle) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, title: newTitle } : card
    );
    setCards(updatedCards);
  };

  const saveCoverColor = (cardId, newColor) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, cover: newColor } : card
    );
    setCards(updatedCards);
  };

  const addList = (listTitle) => {
    if (listTitle.trim() === "") return;
    setLists([...lists, listTitle]);
    setShowAddListForm(false); // Close the form after adding a list
  };

  const deleteList = (listTitle) => {
    setLists(lists.filter((list) => list !== listTitle));
    setCards(cards.filter((card) => card.listTitle !== listTitle));
  };

  const handleMoveCard = (cardId, newListTitle) => {
    moveCard(cardId, newListTitle);
  };

  const handleDeleteCard = (cardId) => {
    deleteCard(cardId);
  };

  const handleSaveTitle = (cardId, newTitle) => {
    saveTitle(cardId, newTitle);
  };

  const handleSaveCoverColor = (cardId, newColor) => {
    saveCoverColor(cardId, newColor);
  };

  const handleCopyCard = (card) => {
    const newCard = {
      ...card,
      id: cards.length + 1,
      title: `${card.title} (Copy)`,
    };
    const index = cards.findIndex((c) => c.id === card.id);
    const updatedCards = [
      ...cards.slice(0, index + 1),
      newCard,
      ...cards.slice(index + 1),
    ];
    setCards(updatedCards);
  };

  const handleProjectChange = (event) => {
    setSelectedTab(event.target.value);
  };

  const addTab = (label, managerName) => {
    const newTabValue = `tab${tabs.length}`;
    const newTab = { value: newTabValue, label: label };
    setTabs([...tabs, newTab]);
    setManagerNames({ ...managerNames, [newTabValue]: managerName });
    setSelectedTab(newTab.value);
    console.log("Tab and manager name added", newTab, managerName);
  };

  const getCardsForCurrentTab = (listTitle) => {
    return cards.filter(
      (card) =>
        card.listTitle === listTitle &&
        card.projectName === tabs.find((tab) => tab.value === selectedTab)?.label
    );
  };

  const handleAddList = (e) => {
    e.preventDefault();
    addList(newListTitle);
    setNewListTitle("");
  };

  return (
    <div>
      <div className="board">
        <ProjectDropdown
          value={selectedTab}
          onChange={handleProjectChange}
          tabs={tabs}
          addTab={addTab}
          setTabs={setTabs}
          setManagerNames={setManagerNames}
        />
        {tabs.map(
          (tab) =>
            selectedTab === tab.value && (
              <div key={tab.value}>
                <div className="managerName">
                  Project Manager: {managerNames[tab.value] || "N/A"}
                </div>
                <div key={tab.value} className="lists-container">
                  {lists.map((listTitle, index) => (
                    <div key={index} className="list">
                      <div className="list-header">
                        <h3>{listTitle}</h3>
                        <DeleteColumn
                          listTitle={listTitle}
                          onDelete={deleteList}
                        />
                      </div>
                      <div className="cards">
                        {getCardsForCurrentTab(listTitle).map((card) => (
                          <div
                            key={card.id}
                            className="card"
                            onClick={() => setSelectedCard(card)}
                            style={{ backgroundColor: card.cover }}
                          >
                            {card.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {showAddListForm ? (
                    <form
                      onSubmit={handleAddList}
                      className="add-list-section"
                    >
                      <input
                        type="text"
                        placeholder="Add another list"
                        value={newListTitle}
                        onChange={(e) => setNewListTitle(e.target.value)}
                        className="add-list-input"
                      />
                      <button type="submit" className="add-list-button">
                        Add List
                      </button>
                    </form>
                  ) : (
                    <button
                      className="add-another-list-button"
                      onClick={() => setShowAddListForm(true)}
                    >
                      Add another list
                    </button>
                  )}
                </div>
              </div>
            )
        )}

        {selectedCard && (
          <CardDetail
            card={selectedCard}
            lists={lists}
            onMove={handleMoveCard}
            onClose={() => setSelectedCard(null)}
            onDelete={handleDeleteCard}
            onSaveTitle={handleSaveTitle}
            onSaveCoverColor={handleSaveCoverColor}
            onCopyCard={handleCopyCard}
          />
        )}
      </div>
    </div>
  );
};

export default Board;


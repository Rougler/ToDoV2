import React, { useState, useEffect, useContext } from "react";
import "../styles/Board.css";
import DeleteColumn from "../components/DeleteColumn";
import CardDetail from "../components/boardcomponent/CardDetail";
import axios from "axios";
import ProjectContext from "../components/projectcomponent/ProjectContext";

const Board = () => {
  const [cards, setCards] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [newListTitle, setNewListTitle] = useState("");
  const [projects, setProjects] = useState([]);
  const [showAddListForm, setShowAddListForm] = useState(false);

  const { selectedProject, tabs } = useContext(ProjectContext);

  useEffect(() => {
    const fetchListsAndTasks = async () => {
      try {
        const listsResponse = await axios.get(
          "http://127.0.0.1:8000/todo/cardname/"
        );
        console.log("I am listresponse",listsResponse);
        setLists(listsResponse.data);
        console.log("I am lists2",lists);

        const tasksResponse = await axios.get(
          "http://127.0.0.1:8000/todo/tasks/"
        );
        console.log("I am task response",tasksResponse)
        const mappedCards = tasksResponse.data.map((task) => ({
          id: task.id,
          title: task.taskName,
          listTitle: task.taskStatus,
          cover: task.cover,
          deadline:task.deadline,
          assignedTo:task.assignedTo,
          projectName: task.project,
        }));
        setCards(mappedCards);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const getAllProjects = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/todo/api/projects/"
        );
        const projects = response.data;
        console.log("Fetched projects:", projects);
        setProjects(projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchListsAndTasks();
    getAllProjects();
  }, []);

  const deleteCard = async (cardId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/todo/api/deletecard/${cardId}/`
      );
      setCards(cards.filter((card) => card.id !== cardId));
      setSelectedCard(null);
    } catch (error) {
      console.error("Error deleting card:", error);
    }
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

  const addList = async (listTitle) => {
    if (listTitle.trim() === "") return;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/todo/api/createcard/",
        { card_name: listTitle }
      );
      if (response.status === 201) {
        setLists([...lists, response.data]);
        console.log("I am lists",lists);
        setShowAddListForm(false);
      } else {
        console.error("Failed to add list:", response.statusText);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error adding list:", error.response.data);
      } else {
        console.error("Error adding list:", error.message);
      }
    }
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

  const handleAddList = (e) => {
    e.preventDefault();
    addList(newListTitle);
    setNewListTitle("");
  };

  const getCardsForCurrentTab = (listTitle) => {
    return cards.filter(
      (card) =>
        card.listTitle === listTitle &&
        card.projectName ===
          tabs.find((tab) => tab.value === selectedProject)?.label
    );
  };

  const getProjectManager = () => {
    const projectId = parseInt(selectedProject.replace("tab", ""), 10);

    if (projectId >= 0 && projectId < projects.length) {
      const selectedProject = projects[projectId];
      return selectedProject.manager;
    } else {
      console.warn("Project ID is out of bounds.");
      return "N/A";
    }
  };

  return (
    <div>
      <div className="board">
        <div className="managerName">
          <h3>Task Manager</h3>
        </div>
        {tabs.map(
          (tab) =>
            selectedProject === tab.value && (
              <div key={tab.value}>
               <div className="proj-manager" style={{ textAlign: 'left', display: 'block' }}>Project Manager: {getProjectManager()}</div>
                <div key={tab.value} className="lists-container">
                  {lists.map((list) => (
                    <div key={list.id} className="list">
                      <div className="list-header">
                        <h3>{list.card_name}</h3>
                        <DeleteColumn listId={list.id} onDelete={deleteCard} />
                      </div>
                      <div className="cards">
                        {
                        getCardsForCurrentTab(list.card_name).map((card) => (
                          <div
                            key={card.id}
                            className="card"
                            onClick={() => setSelectedCard(card)}
                            style={{ backgroundColor: card.cover }}
                          >
                            {card.title}
                            <br/>
                            <p className="cardAssignedTo">{card.assignedTo}</p>
                            <br/>
                            <p className="cardDeadLine">{card.deadline}</p>
                          </div>
                        ))}
                      </div>
                      {console.log("I am hero",getCardsForCurrentTab(list.card_name))}
                    </div>
                  ))}
                  <div className="add-list">
                    {showAddListForm ? (
                      <form onSubmit={handleAddList} className="add-list-form">
                        <input
                          type="text"
                          value={newListTitle}
                          onChange={(e) => setNewListTitle(e.target.value)}
                          placeholder="List Title"
                        />
                        <button type="submit">Add</button>
                      </form>
                    ) : (
                      <button
                        className="add-list-button"
                        onClick={() => setShowAddListForm(true)}
                      >
                        + Add another list
                      </button>
                    )}
                  </div>
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

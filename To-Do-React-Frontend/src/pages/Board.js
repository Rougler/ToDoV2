import React, { useState, useEffect, useContext } from "react";
import "../styles/Board.css";
import DeleteColumn from "../components/DeleteColumn";
import CardDetail from "../components/boardcomponent/CardDetail";
import axios from "axios";
import ProjectContext from "../components/projectcomponent/ProjectContext";
import { Calendar, User } from "lucide-react";

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
        setLists(listsResponse.data);

        const tasksResponse = await axios.get(
          "http://127.0.0.1:8000/todo/tasks/"
        );
        const mappedCards = tasksResponse.data.map((task) => ({
          id: task.id,
          title: task.taskName,
          listTitle: task.taskStatus,
          cover: task.cover,
          deadline: task.deadline,
          assignedTo: task.assignedTo,
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
        setProjects(projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchListsAndTasks();
    getAllProjects();
  }, []);

  const deleteCard = async (listId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/todo/api/deletecard/${listId}/`
      );
      setLists(lists.filter((list) => list.id !== listId));
      setCards(cards.filter((card) => card.listTitle !== listId));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
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
                        <DeleteColumn listId={list.id} listName={list.card_name} onDelete={deleteCard} />
                      </div>
                      <div className="cards">
                        {getCardsForCurrentTab(list.card_name).map((card) => (
                          <div
                            key={card.id}
                            className="card"
                            onClick={() => setSelectedCard(card)}
                            style={{ backgroundColor: card.cover }}
                          >
                            <div className="card-title">{card.title}</div>
                            <div className="card-details">
                              {card.deadline && (
                                <div className="card-deadline">
                                  <Calendar size={14} />
                                  <span>{card.deadline}</span>
                                </div>
                              )}
                              {card.assignedTo && (
                                <div className="card-assigned-to">
                                  <User size={14} />
                                  <span>{card.assignedTo}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
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
            onMove={() => {}}
            onClose={() => setSelectedCard(null)}
            onDelete={() => {}}
            onSaveTitle={() => {}}
            onSaveCoverColor={() => {}}
            onCopyCard={() => {}}
          />
        )}
      </div>
    </div>
  );
};

export default Board;

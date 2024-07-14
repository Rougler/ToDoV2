// import React, { useState, useEffect } from "react";
// import "./Board.css";
// import DeleteColumn from "./DeleteColumn";
// import CardDetail from "./CardDetail";
// import axios from "axios";
// import ColorTabs from "./Tab.js";
// const initialLists = ["Not-Start", "On-going", "Done", "Staging"];
// const initialTabs = [];
// const Board = () => {
//   const [cards, setCards] = useState([]);
//   const [lists, setLists] = useState(initialLists);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [selectedTab, setSelectedTab] = useState('tab0');
//   const [tabs, setTabs] = useState(initialTabs);
//   const [managerNames, setManagerNames] = useState({});

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/todo/tasks/");
//         setTasks(response.data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   useEffect(() => {
//     const mappedCards = tasks.map((task) => ({
//       id: task.id,
//       title: task.taskName,
//       listTitle: task.taskStatus,
//       cover: task.cover,
//     }));

//     setCards(mappedCards);
//   }, [tasks]);

//   const deleteCard = (cardId) => {
//     setCards(cards.filter((card) => card.id !== cardId));
//     setSelectedCard(null);
//   };

//   const moveCard = (cardId, newListTitle) => {
//     const updatedCards = cards.map((card) =>
//       card.id === cardId ? { ...card, listTitle: newListTitle } : card
//     );
//     setCards(updatedCards);
//   };

//   const saveTitle = (cardId, newTitle) => {
//     const updatedCards = cards.map((card) =>
//       card.id === cardId ? { ...card, title: newTitle } : card
//     );
//     setCards(updatedCards);
//   };

//   const saveCoverColor = (cardId, newColor) => {
//     const updatedCards = cards.map((card) =>
//       card.id === cardId ? { ...card, cover: newColor } : card
//     );
//     setCards(updatedCards);
//   };

//   const addList = (listTitle) => {
//     if (listTitle.trim() === "") return;
//     setLists([...lists, listTitle]);
//   };

//   const deleteList = (listTitle) => {
//     setLists(lists.filter((list) => list !== listTitle));
//     setCards(cards.filter((card) => card.listTitle !== listTitle));
//   };

//   const handleMoveCard = (cardId, newListTitle) => {
//     moveCard(cardId, newListTitle);
//   };

//   const handleDeleteCard = (cardId) => {
//     deleteCard(cardId);
//   };

//   const handleSaveTitle = (cardId, newTitle) => {
//     saveTitle(cardId, newTitle);
//   };

//   const handleSaveCoverColor = (cardId, newColor) => {
//     saveCoverColor(cardId, newColor);
//   };

//   const handleCopyCard = (card) => {
//     const newCard = {
//       ...card,
//       id: cards.length + 1,
//       title: `${card.title} (Copy)`,
//     };
//     const index = cards.findIndex((c) => c.id === card.id);
//     const updatedCards = [
//       ...cards.slice(0, index + 1),
//       newCard,
//       ...cards.slice(index + 1),
//     ];
//     setCards(updatedCards);
//   };

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   const addTab = (label, managerName) => {
//     const newTabValue = label.toLowerCase().replace(/\s/g, '_');
//     const newTab = { value: newTabValue, label: label };
//     setTabs([...tabs, newTab]);
//     setManagerNames([...managerNames, {[newTabValue]: managerName} ]);

//     setSelectedTab(newTab.value);
//     console.log("Tab and manager name added", newTab, managerNames);
//   };

//   return (
//     <div>

//       <div className="board">
//         <ColorTabs value={selectedTab} onChange={handleTabChange} tabs={tabs} addTab={addTab} setTabs={setTabs} managerNames={managerNames} setManagerNames={setManagerNames}>
//           {tabs.map((tab,index) => (
//             selectedTab === tab.value && (
//               <div key={tab.value} className="lists-container">
//                 <div className="managerName">
//                   Project Manager: {managerNames[index][tab.value] || 'N/A'}
//                 </div>
//                 {lists.map((listTitle, index) => (
//                   <div key={index} className="list">
//                     <div className="list-header">
//                       <h3>{listTitle}</h3>
//                       <DeleteColumn listTitle={listTitle} onDelete={deleteList} />
//                     </div>
//                     <div className="cards">
//                       {selectedTab === 'one' &&
//                         cards
//                           .filter((card) => card.listTitle === listTitle)
//                           .map((card) => (
//                             <div
//                               key={card.id}
//                               className="card"
//                               onClick={() => setSelectedCard(card)}
//                               style={{ backgroundColor: card.cover }}
//                             >
//                               {card.title}
//                             </div>
//                           ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )
//           ))}
//           <div> </div>
//         </ColorTabs>

//         {selectedCard && (
//           <CardDetail
//             card={selectedCard}
//             lists={lists}
//             onMove={handleMoveCard}
//             onClose={() => setSelectedCard(null)}
//             onDelete={handleDeleteCard}
//             onSaveTitle={handleSaveTitle}
//             onSaveCoverColor={handleSaveCoverColor}
//             onCopyCard={handleCopyCard}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Board;

import React, { useState, useEffect } from "react";
import "./Board.css";
import DeleteColumn from "./DeleteColumn";
import CardDetail from "./CardDetail";
import axios from "axios";
import ColorTabs from "./Tab.js";

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

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const addTab = (label, managerName) => {
    const newTabValue = label.toLowerCase().replace(/\s/g, '_');
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
        card.projectName ===
          tabs.find((tab) => tab.value === selectedTab)?.label
    );
  };

  return (
    <div>
      <div className="board">
        <ColorTabs
          value={selectedTab}
          onChange={handleTabChange}
          tabs={tabs}
          addTab={addTab}
          setTabs={setTabs}
          managerNames={managerNames}
          setManagerNames={setManagerNames}
        >
          {tabs.map(
            (tab, index) =>
              selectedTab === tab.value && (
                <div key={tab.value} className="lists-container">
                  <div className="managerName">
                    Project Manager: {managerNames[tab.value] || "N/A"}
                  </div>
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
                </div>
              )
          )}
        </ColorTabs>

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

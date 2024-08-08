import React, { useState, useEffect, useRef } from "react";
import "../../styles/MoveCard.css";
import axios from "axios";

const MoveCard = ({ card, onMove, onClose }) => {
  const [lists, setLists] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedList, setSelectedList] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(1);
  const [isComponentVisible, setIsComponentVisible] = useState(true);
  const modalRef = useRef();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/todo/cardname/"
        );
        setLists(response.data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchLists();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsComponentVisible(false);
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleMove = async () => {
    if (selectedPosition < 1 || selectedPosition > lists.length) {
      console.error("Invalid position selected");
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/todo/task/${card.id}/`
      );

      const updatedTask = {
        ...response.data,
        taskStatus: selectedList,
      };

      const updateResponse = await axios.put(
        `http://127.0.0.1:8000/todo/update-status/${card.id}/`,
        updatedTask
      );

      console.log("Updated Task:", updateResponse.data);

      onMove(card.id, selectedList, selectedPosition);
      onClose();
    } catch (error) {
      if (error.response) {
        console.error("Server responded with a status:", error.response.status);
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  if (!isComponentVisible) {
    return null;
  }

  return (
    <div className="modal-move">
      <div className="modal-content-move" ref={modalRef}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3>Select destination</h3>
        <div>
          <label>List</label>
          <select
            value={selectedList}
            onChange={(e) => setSelectedList(e.target.value)}
          >
            <option value="" disabled>
              -select-
            </option>
            {lists.map((list) => (
              <option key={list.id} value={list.card_name}>
                {list.card_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Position</label>
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(parseInt(e.target.value, 10))}
          >
            {[...Array(10).keys()].map((pos) => (
              <option key={pos + 1} value={pos + 1}>
                {pos + 1}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleMove}>Move</button>
      </div>
    </div>
  );
};

export default MoveCard;

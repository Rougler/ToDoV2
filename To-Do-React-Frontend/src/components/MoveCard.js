import React, { useState, useEffect, useRef } from "react";
import "./MoveCard.css";
import ClickOutsideWrapper from "./ClickOutsideWrapper";
import axios from "axios";

const MoveCard = ({ card, lists, onMove, onClose }) => {
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedList, setSelectedList] = useState(lists[0]);
  const [selectedPosition, setSelectedPosition] = useState(1);
  const [isComponentVisible, setIsComponentVisible] = useState(true);
  const modalRef = useRef();

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
      console.log("Response from GET request:", response.data);

      const { taskName, taskStatus } = response.data;

      const updatedTask = {
        ...response.data,
        taskStatus: selectedList,
      };
      console.log("Updated Task with new taskStatus:", updatedTask);
      console.log("Updating task status with PUT request:", updatedTask);

      const updateResponse = await axios.put(
        `http://127.0.0.1:8000/todo/update-status/${card.id}/`,
        updatedTask
      );

      console.log("Updated Task:", updateResponse.data);

      onMove(card.id, selectedList, selectedPosition);
      onClose();
    } catch (error) {
      console.error("Error updating task status:", error);
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
            {lists.map((list) => (
              <option key={list} value={list}>
                {list}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Position</label>
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
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

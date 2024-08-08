import React, { useState, useRef, useEffect } from 'react';
import '../styles/Board.css'; 

const AddListForm = ({ onAddList }) => {
  const [newListTitle, setNewListTitle] = useState('');
  const [showAddListForm, setShowAddListForm] = useState(false);
  const addListFormRef = useRef(null);

  const addList = () => {
    if (newListTitle.trim()) {
      onAddList(newListTitle);
      setNewListTitle('');
      setShowAddListForm(false);  
    }
  };

  const handleClickOutside = (event) => {
    if (addListFormRef.current && !addListFormRef.current.contains(event.target)) {
      setShowAddListForm(false);
    }
  };

  useEffect(() => {
    if (showAddListForm) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddListForm]);

  return (
    <div className="add-list-section">
      {showAddListForm ? (
        <div className="list add-new-list" ref={addListFormRef}>
          <input
            type="text"
            placeholder="New list title"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
          />
          <button onClick={addList}>Add List</button>
        </div>
      ) : (
        <button
          className="add-list-button"
          onClick={() => setShowAddListForm(true)}
        >
          + Add another list
        </button>
      )}
    </div>
  );
};

export default AddListForm;

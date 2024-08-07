import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../styles/DeleteColumn.css";

const DeleteColumn = ({ listId, onDelete, listName }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isFinalConfirming, setIsFinalConfirming] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    console.log(`Input value: ${inputValue}, List name: ${listName}`);
    if (inputValue === listName) {
      onDelete(listId);
      setIsConfirming(false);
      setIsFinalConfirming(false);
      handleMenuClose();
    }
  };

  return (
    <div className="delete-column">
      {isFinalConfirming && (
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation">
            <p>
              If you are sure you want to delete all tasks, type the list header name <strong>{listName}</strong> to confirm:
            </p>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="confirmation-buttons">
              <button onClick={handleDelete}>Confirm</button>
              <button onClick={() => setIsFinalConfirming(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {isConfirming && !isFinalConfirming && (
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation">
            <p>Are you sure you want to delete this list?</p>
            <div className="confirmation-buttons">
              <button
                onClick={() => {
                  setIsFinalConfirming(true);
                  setIsConfirming(false);
                }}
              >
                Yes
              </button>
              <button onClick={() => setIsConfirming(false)}>No</button>
            </div>
          </div>
        </div>
      )}
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setIsConfirming(true);
            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DeleteColumn;

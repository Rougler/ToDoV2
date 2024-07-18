import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './DeleteColumn.css';

const DeleteColumn = ({ listTitle, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete(listTitle);
    setIsConfirming(false);
    handleMenuClose();
  };

  return (
    <div className="delete-column">
      {isConfirming && (
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation">
            <p>Are you sure you want to delete this list?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setIsConfirming(false)}>No</button>
          </div>
        </div>
      )}
      <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleMenuOpen}>
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
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={() => { setIsConfirming(true); handleMenuClose(); }}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default DeleteColumn;

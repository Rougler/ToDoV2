import React from 'react';
import './CardDetailSidebar.css';

const CardDetailSidebar = () => {
  return (
    <div className="card-detail-sidebar">
      <div className="sidebar-section">
        <button>Members</button>
        <button>Labels</button>
        <button>Checklist</button>
        <button>Dates</button>
        <button>Attachment</button>
        <button>Cover</button>
        <button>Custom Fields</button>
      </div>
      <div className="sidebar-section">
        <button>Add Power-Ups</button>
      </div>
      <div className="sidebar-section">
        <button>Move</button>
        <button>Copy</button>
        <button>Make template</button>
        <button>Archive</button>
        <button>Share</button>

        <button>Delete</button>
      </div>
    </div>
  );
};

export default CardDetailSidebar;

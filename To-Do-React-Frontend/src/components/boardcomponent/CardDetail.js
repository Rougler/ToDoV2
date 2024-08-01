import React, { useState, useEffect } from "react";
import "../../styles/CardDetail.css";
import OutsideClickHandler from "../OutsideClickHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentBox from "./comment";
import axios from "axios";
import {
  faEye,
  faCheckSquare,
  faClock,
  faPaperclip,
  faMapMarkerAlt,
  faImage,
  faUser,
  faTags,
  faTrashAlt,
  faList,
  faAlignLeft,
  faComments,
  faEdit,
  faDownload,
  faCopy,
  faExclamationTriangle,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FaSave } from "react-icons/fa";
import MoveCard from "./MoveCard";

const colors = [
  "#f2d600",
  "#ff9f1a",
  "rgb(255 121 103)",
  "#c377e0",
  "rgb(111 202 255)",
  "#00c2e0",
  "#51e898",
  "#ff78cb",
];

const CardDetail = ({
  card,
  lists,
  onMove,
  onClose,
  onSaveTitle,
  onDelete,
  onSaveCoverColor,
}) => {
  const [description, setDescription] = useState(card.description || "");
  const [showMoveCard, setSShowMoveCard] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false);
  const [checklistItems, setChecklistItems] = useState(
    card.checklistItems || []
  );
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [showCoverOptions, setShowCoverOptions] = useState(false);
  const [attachments, setAttachments] = useState(card.attachments || []);
  const [coverColor, setCoverColor] = useState(card.coverColor || colors[0]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileInput, setFileInput] = useState(null);
  const [showPriority, setShowPriority] = useState(false);
  const [priority, setPriority] = useState(card.priority || 0);
  const [showDeadline, setShowDeadline] = useState(false);
  const [deadline, setDeadline] = useState(card.deadline || "");

  useEffect(() => {
    fetchTaskDetails();
  }, [card.id]);

  const fetchTaskDetails = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/todo/task/${card.id}/`
      );
      console.log("Response from API:", response.data);
      const {
        taskName,
        description,
        checklist,
        file,
        taskStatus,
        priority,
        assignedTo,
        cover,
        deadline,
      } = response.data;

      let parsedChecklistItems = [];

      const isValidJson = (str) => {
        try {
          JSON.parse(str);
          return true;
        } catch (e) {
          return false;
        }
      };

      if (checklist && isValidJson(checklist)) {
        try {
          const parsedChecklist = JSON.parse(checklist);
          parsedChecklistItems = parsedChecklist.checklistItems || [];
        } catch (error) {
          console.error("Error parsing checklist:", error);
        }
      }

      setTitle(taskName || "");
      setDescription(description || "");
      setChecklistItems(parsedChecklistItems || []);
      setAttachments(file ? [file] : []);
      setCoverColor(cover || colors[0]);
      setPriority(priority || 0);
      setDeadline(deadline || "");

      console.log("Fetched Task Details:", {
        title: taskName,
        description: description,
        checklistItems: parsedChecklistItems,
        coverColor: cover || colors[0],
      });

      setAttachments(file ? [file] : []);
      setUploadedFiles(file ? [{ file, filename: file.split("/").pop() }] : []);
      setShowAttachment(false);
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

  const handlePriorityChange = async (newPriority) => {
    setPriority(newPriority);

    try {
      await axios.put(
        `http://127.0.0.1:8000/todo/update-priority/${card.id}/`,
        {
          priority: newPriority,
        }
      );
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  };

  const handleDeadlineChange = async (event) => {
    const newDeadline = event.target.value;
    setDeadline(newDeadline);

    try {
      await axios.put(
        `http://127.0.0.1:8000/todo/update-deadline/${card.id}/`,
        {
          deadline: newDeadline,
        }
      );
    } catch (error) {
      console.error("Error updating deadline:", error);
    }
  };

  const handleDownload = (file) => {
    axios({
      url: `http://127.0.0.1:8000/todo/attachments/${card.id}/download/`,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file.split("/").pop());
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const newFiles = Array.from(files).map((file) => ({
        file: file,
        filename: file.name,
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
    setFileInput(null);
  };

  const handleDelete = (file) => {
    axios
      .delete(`http://127.0.0.1:8000/todo/attachments/${card.id}/delete/`)
      .then((response) => {
        console.log("File deleted successfully:", response.data);
        setUploadedFiles(uploadedFiles.filter((f) => f !== file));
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
      });
  };

  const toggleChecklist = () => {
    setShowChecklist(!showChecklist);
  };

  const toggleCover = () => {
    setShowCoverOptions(!showCoverOptions);
  };

  const handleAddChecklistItem = async () => {
    if (newChecklistItem.trim()) {
      const updatedItems = [
        ...checklistItems,
        { text: newChecklistItem, completed: false },
      ];
      setChecklistItems(updatedItems);
      setNewChecklistItem("");

      await updateChecklistOnServer(updatedItems);
    }
  };

  const handleToggleChecklistItem = (index) => {
    const updatedItems = checklistItems.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setChecklistItems(updatedItems);
    updateChecklistOnServer(updatedItems);
  };

  const handleDeleteChecklistItem = async (index) => {
    const updatedItems = checklistItems.filter((_, i) => i !== index);
    setChecklistItems(updatedItems);
    await updateChecklistOnServer(updatedItems);
  };

  const updateChecklistOnServer = async (updatedItems) => {
    const updatedCard = {
      // id: card.id,
      checklistItems: updatedItems,
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/todo/save-data/${card.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCard),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Checklist updated:", result);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleSaveTitle = async () => {
    console.log("title: ", title);
    const updatedCard = {
      ...card,
      taskName: title,
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/todo/update-name/${card.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCard),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Title updated successfully:", result);
      onSaveTitle(card.id, title);
      setIsEditingTitle(false);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleDeleteCard = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/todo/tasks/${card.id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      onDelete(card.id);

      console.log(`Deleted card with ID ${card.id}`);
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleCoverColorChange = async (color) => {
    setCoverColor(color);
    console.log("Selected color:", color);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/todo/cover_update/${card.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cover: color }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Cover color updated:", result);
      onSaveCoverColor(result);
      onSaveCoverColor(card.id, color);
      setShowCoverOptions(false);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleSaveDescription = async () => {
    const updatedCard = {
      ...card,
      description,
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/todo/update-desc/${card.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCard),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Description updated:", result);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleSaveAttachments = async () => {
    try {
      const formData = new FormData();
      uploadedFiles.forEach((file) => {
        formData.append("file", file.file);
      });

      console.log(
        "Files to be uploaded:",
        uploadedFiles.map((file) => file.filename)
      );

      const response = await fetch(
        `http://127.0.0.1:8000/todo/file-upload/${card.id}/`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Attachments saved:", result);
      setUploadedFiles([]);
      setAttachments([...attachments, ...result]);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  return (
    <div className="modal-one">
      <OutsideClickHandler onClose={onClose}>
        <div className="modal-content-carddetails">
          <span className="close" onClick={onClose}>
            &times;
          </span>

          <div className="title-section">
            {isEditingTitle ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <h2>
                {title}
                <FontAwesomeIcon
                  icon={faEdit}
                  className="edit-icon"
                  onClick={handleEditTitle}
                />
              </h2>
            )}
            {isEditingTitle && <button onClick={handleSaveTitle}>Save</button>}
          </div>

          <div className="description">
            <h3>
              <FontAwesomeIcon icon={faAlignLeft} /> Description
            </h3>
            <div className="description-button">
              <textarea
                placeholder="Add a more detailed description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <br />
              <button onClick={handleSaveDescription}>
                {" "}
                <FaSave style={{ marginRight: "2px" }} />
                Save
              </button>
            </div>
          </div>

          <div className="sidebar">
            <h3>Add to card</h3>
            <div className="sidebar-button">
              <a onClick={toggleChecklist}>
                <FontAwesomeIcon icon={faCheckSquare} /> Checklist
              </a>
              <a onClick={() => setShowAttachment(!showAttachment)}>
                <FontAwesomeIcon icon={faPaperclip} /> Attachment
              </a>
              <a onClick={() => setShowDeadline(!showDeadline)}>
                <FontAwesomeIcon icon={faCalendarAlt} /> Deadline
              </a>
              {showDeadline && (
                <div className="deadline-field">
                  <label>
                    Deadline:
                    <input
                      type="date"
                      value={deadline}
                      onChange={handleDeadlineChange}
                    />
                  </label>
                </div>
              )}
              <a onClick={() => setShowPriority(!showPriority)}>
                <FontAwesomeIcon icon={faExclamationTriangle} /> Priority
              </a>
              {showPriority && (
                <div className="priority-radio-buttons">
                  <label>
                    <input
                      type="radio"
                      value="high"
                      checked={priority === "high"}
                      onChange={() => handlePriorityChange("high")}
                    />
                    High
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="medium"
                      checked={priority === "medium"}
                      onChange={() => handlePriorityChange("medium")}
                    />
                    Medium
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="low"
                      checked={priority === "low"}
                      onChange={() => handlePriorityChange("low")}
                    />
                    Low
                  </label>
                </div>
              )}
              <a onClick={toggleCover}>
                <FontAwesomeIcon icon={faImage} /> Cover
              </a>
              {showCoverOptions && (
                <div className="cover-options">
                  <div className="cover-colors">
                    {colors.map((color) => (
                      <div
                        key={color}
                        className={`color-option ${
                          color === card.coverColor ? "selected" : ""
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleCoverColorChange(color)}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="sidebar-button priority-deadline"></div>

            {showChecklist && (
              <div className="checklist">
                <h3>Checklist</h3>
                {checklistItems.map((item, index) => (
                  <div key={index} className="checklist-item">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleToggleChecklistItem(index)}
                    />
                    <input type="text" value={item.text} readOnly />
                    <button onClick={() => handleDeleteChecklistItem(index)}>
                      Delete
                    </button>
                  </div>
                ))}
                <div className="checklist-item">
                  <input
                    type="text"
                    placeholder="Add an item"
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleAddChecklistItem();
                      }
                    }}
                  />
                  <button onClick={handleAddChecklistItem}>Add</button>
                </div>
              </div>
            )}

            {showAttachment && (
              <div className="attachment">
                <h3>
                  <FontAwesomeIcon icon={faPaperclip} /> Attach a file
                </h3>
                <input
                  type="file"
                  onChange={handleFileChange}
                  ref={(input) => setFileInput(input)}
                  multiple
                />
                {uploadedFiles.length > 0 && (
                  <div>
                    {uploadedFiles.map((item, index) => {
                      const { file, filename } = item;
                      console.log("file: ", item);
                      var vampire = item;
                      console.log("vampire", vampire);
                      return (
                        <div key={index} className="attachment-item">
                          <span>{filename}</span>
                          <div className="attachment-actions">
                            <button onClick={() => handleDownload(file)}>
                              <FontAwesomeIcon icon={faDownload} />
                            </button>
                            <button onClick={() => handleDelete(file)}>
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <button onClick={handleSaveAttachments}>
                  Save Attachments
                </button>
              </div>
            )}

            <h3>Actions</h3>
            <div className="sidebar-button">
              <a onClick={() => setSShowMoveCard(true)}>
                <FontAwesomeIcon icon={faTags} /> Move
              </a>
              <a onClick={handleDeleteCard}>
                <FontAwesomeIcon icon={faTrashAlt} /> Delete
              </a>
            </div>
            <h3>Actions</h3>
            <div className="sidebar-button">
            <CommentBox />
            </div>
          </div>
        </div>
        {showMoveCard && (
          <OutsideClickHandler onClose={() => setSShowMoveCard(false)}>
            <div className="move-card-popup">
              <MoveCard
                card={card}
                lists={lists}
                onMove={(cardId, newListTitle, newPosition) => {
                  onMove(cardId, newListTitle, newPosition);
                  setSShowMoveCard(false);
                }}
                onClose={() => setSShowMoveCard(false)}
              />
            </div>
          </OutsideClickHandler>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default CardDetail;

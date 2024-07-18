import React, { useState, useEffect } from "react";
import "./CardDetail.css";
import OutsideClickHandler from "./OutsideClickHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
} from "@fortawesome/free-solid-svg-icons";
import MoveCard from "./MoveCard";
import DateRangePicker from "./date-modal";

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
  onCopyCard,
}) => {
  const [description, setDescription] = useState(card.description || "");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showMoveCard, setShowMoveCard] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
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
  const [dates, setDates] = useState(card.dates || "");
  const [coverColor, setCoverColor] = useState(card.coverColor || colors[0]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileInput, setFileInput] = useState(null);

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
        start_date,
        done_date,
        taskStatus,
        priority,
        assignedTo,
        cover,
      } = response.data;

      let parsedChecklistItems = [];

      if (checklist) {
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
      const formattedDates = {
        startDate: new Date(start_date),
        endDate: new Date(done_date),
      };
      setDates(formattedDates);
      setCoverColor(cover || colors[0]);

      console.log("Fetched Task Details:", {
        title: taskName,
        description: description,
        checklistItems: parsedChecklistItems,
        attachments: file ? [file] : [],
        dates: formattedDates,
        coverColor: cover || colors[0],
      });

      setAttachments(file ? [file] : []);
      setUploadedFiles(file ? [{ file, filename: file.split("/").pop() }] : []);
      setShowAttachment(true);
    } catch (error) {
      console.error("Error fetching task details:", error);
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

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleChecklist = () => {
    setShowChecklist(!showChecklist);
  };

  const toggleAttachment = () => {
    setShowAttachment(!showAttachment);
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
        `http://127.0.0.1:8000/todo/save-data/${card.id}/`, //add checklist
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
        `http://127.0.0.1:8000/todo/tasks_delete/${card.id}/`, //delete
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
        `http://127.0.0.1:8000/todo/cover_update/${card.id}/`, //cover
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

  const handleCopyCard = async () => {
    const taskDetails = await fetchTaskDetails(card.id);
    if (!taskDetails) return;

    const copiedCard = {
      title: `Copy of ${taskDetails.title}`,
      description: taskDetails.description,
      checklistItems: taskDetails.checklistItems,
      attachments: taskDetails.attachments,
      dates: taskDetails.dates,
      taskStatus: taskDetails.taskStatus,
      priority: taskDetails.priority,
      assignedTo: taskDetails.assignedTo,
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/todo/copy/${card.id}/`, //copy
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(copiedCard),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      onCopyCard(result);
      onCopyCard(card);
      onClose();

      console.log("Card copied:", result);
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
        `http://127.0.0.1:8000/todo/update-desc/${card.id}/`, //description
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

  const handleSaveDates = async () => {
    console.log("dates:", dates);
    console.log("type of dates:", typeof dates);

    if (typeof dates !== "object" || dates === null) {
      console.error("dates is not an object or is null");
      return;
    }

    const { startDate, endDate } = dates;

    const formattedStartDate = formatDateForServer(startDate);
    const formattedEndDate = formatDateForServer(endDate);

    const updatedCard = {
      start_date: formattedStartDate,
      done_date: formattedEndDate,
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/todo/update-date/${card.id}/`, //date
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
      console.log("Dates updated:", result);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const formatDateForServer = (dateString) => {
    const [month, day, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
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
        `http://127.0.0.1:8000/todo/file-upload/${card.id}/`, //file
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
        <div className="modal-content">
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
              <button onClick={handleSaveDescription}>Save</button>
            </div>
          </div>

          <div className="sidebar">
            <h3>Add to card</h3>
            <div className="sidebar-button">
              <a onClick={toggleChecklist}>
                <FontAwesomeIcon icon={faCheckSquare} /> Checklist
              </a>
          
              {showDatePicker && (
                <div className="date-picker-popup">
                  <OutsideClickHandler onClose={() => setShowDatePicker(false)}>
                    <DateRangePicker dates={dates} setDates={setDates} />
                    <button onClick={handleSaveDates}>Save Dates</button>
                  </OutsideClickHandler>
                </div>
              )}
              <a onClick={() => setShowAttachment(!showAttachment)}>
                <FontAwesomeIcon icon={faPaperclip} /> Attachment
              </a>

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
              <a onClick={() => setShowMoveCard(true)}>
                <FontAwesomeIcon icon={faTags} /> Move
              </a>
              <a onClick={handleDeleteCard}>
                <FontAwesomeIcon icon={faTrashAlt} /> Delete
              </a>
              {/* <a onClick={handleCopyCard}>
                <FontAwesomeIcon icon={faCopy} /> Copy
              </a> */}
            
            </div>
          </div>
        </div>
        {showMoveCard && (
          <OutsideClickHandler onClose={() => setShowMoveCard(false)}>
            <div className="move-card-popup">
              <MoveCard
                card={card}
                lists={lists}
                onMove={(cardId, newListTitle, newPosition) => {
                  onMove(cardId, newListTitle, newPosition);
                  setShowMoveCard(false);
                }}
                onClose={() => setShowMoveCard(false)}
              />
            </div>
          </OutsideClickHandler>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default CardDetail;

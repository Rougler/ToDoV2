import React, { useEffect, useState } from "react";
import "../../styles/CommentCard.css";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { enIN } from "date-fns/locale";

const getInitials = (name) => {
  if (!name) return "";
  const names = name.split(" ");
  const initials = names.map((n) => n[0].toUpperCase()).join("");
  return initials;
};

export default function CommentCard({ taskName }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/todo/comment/tasks/${taskName}/`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [taskName]);

  return (
    <section className="comment-card-section">
      <div className="comment-card-footer">
        <div className="comment-footer-input">
          <textarea
            className="comment-textarea"
            placeholder="Message"
            rows={4}
          ></textarea>
        </div>
        <div className="comment-footer-buttons">
          <button className="post-button">Post comment</button>
          <button className="cancel-button">Cancel</button>
        </div>
      </div>

      {comments.map((comment) => {
        const formattedDate = format(
          parseISO(comment.date_time),
          "d MMM yyyy, h:mma",
          { locale: enIN }
        );

        return (
          <div className="comment-card-container" key={comment.id}>
            <div className="comment-card">
              <div className="comment-card-body">
                <div className="comment-header">
                  <div
                    className="avatar"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#ccc",
                      color: "#fff",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {getInitials(comment.user)}
                  </div>
                  <div>
                    <h6 className="username">{comment.user}</h6>
                    <p className="date">{formattedDate}</p>
                  </div>
                </div>

                <p className="comment-text">{comment.message}</p>

                <div className="comment-actions">
                  <a href="#!" className="action-item">
                    <i className="fa fa-thumbs-up"></i>
                    <p className="action-text">Flag</p>
                  </a>
                  <a href="#!" className="action-item">
                    <i className="fa fa-share"></i>
                    <p className="action-text">Reply</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

// import React, { useEffect, useState } from "react";
// import "../../styles/CommentCard.css";
// import axios from "axios";
// import { format, parseISO } from "date-fns";
// import { enIN } from "date-fns/locale";

// const getInitials = (name) => {
//   if (!name) return "";
//   const names = name.split(" ");
//   const initials = names.map((n) => n[0].toUpperCase()).join("");
//   return initials;
// };

// export default function CommentCard({ taskName }) {
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:8000/todo/comment/tasks/${taskName}/`
//         );
//         setComments(response.data);
//       } catch (error) {
//         console.error("Error fetching comments:", error);
//       }
//     };

//     fetchComments();
//   }, [taskName]);

//   return (
//     <section className="comment-card-section">
//       <div className="comment-card-footer">
//         <div className="comment-footer-input">
//           <textarea
//             className="comment-textarea"
//             placeholder="Message"
//             rows={4}
//           ></textarea>
//         </div>
//         <div className="comment-footer-buttons">
//           <button className="post-button">Post comment</button>
//           <button className="cancel-button">Cancel</button>
//         </div>
//       </div>

//       {comments.map((comment) => {
//         const formattedDate = format(
//           parseISO(comment.date_time),
//           "d MMM yyyy, h:mma",
//           { locale: enIN }
//         );

//         return (
//           <div className="comment-card-container" key={comment.id}>
//             <div className="comment-card">
//               <div className="comment-card-body">
//                 <div className="comment-header">
//                   <div
//                     className="avatar"
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       backgroundColor: "#ccc",
//                       color: "#fff",
//                       borderRadius: "50%",
//                       width: "40px",
//                       height: "40px",
//                       fontSize: "18px",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {getInitials(comment.user)}
//                   </div>
//                   <div>
//                     <h6 className="username">{comment.user}</h6>
//                     <p className="date">{formattedDate}</p>
//                   </div>
//                 </div>

//                 <p className="comment-text">{comment.message}</p>

//                 <div className="comment-actions">
//                   <a href="#!" className="action-item">
//                     <i className="fa fa-thumbs-up"></i>
//                     <p className="action-text">Flag</p>
//                   </a>
//                   <a href="#!" className="action-item">
//                     <i className="fa fa-share"></i>
//                     <p className="action-text">Reply</p>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </section>
//   );
// }
import React, { useState } from "react";
import "../../styles/CommentCard.css";
import { format, parseISO } from "date-fns";
import { enIN } from "date-fns/locale";

const getInitials = (name) => {
  if (!name) return "";
  const names = name.split(" ");
  const initials = names.map((n) => n[0].toUpperCase()).join("");
  return initials;
};

// Static comments data for initial rendering
const initialComments = [
  {
    id: 1,
    user: "John Doe",
    date_time: "2024-08-05T12:34:56Z",
    message: "This is a static comment.",
    replies: [],
    flagged: false,
  },
  {
    id: 2,
    user: "Jane Smith",
    date_time: "2024-08-05T13:45:00Z",
    message: "Another static comment here!",
    replies: [],
    flagged: false,
  },
];

export default function CommentCard({ taskName, handleFlagStatusChange  }) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState({});
  const [replyTo, setReplyTo] = useState(null);

  const handlePostComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1, // Simple ID generation
        user: "Anonymous", // Replace with actual user if needed
        date_time: new Date().toISOString(),
        message: newComment.trim(),
        replies: [],
        flagged: false,
      };

      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  const handlePostReply = (commentId) => {
    if (replyText[commentId]?.trim()) {
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: comment.replies.length + 1, // Simple ID generation
                user: "Anonymous", // Replace with actual user if needed
                date_time: new Date().toISOString(),
                message: replyText[commentId].trim(),
              },
            ],
          };
        }
        return comment;
      });

      setComments(updatedComments);
      setReplyText({ ...replyText, [commentId]: "" });
      setReplyTo(null);
    }
  };

  const handleReplyChange = (commentId, text) => {
    setReplyText({ ...replyText, [commentId]: text });
  };

  const toggleReplyForm = (commentId) => {
    setReplyTo(replyTo === commentId ? null : commentId);
  };

  const toggleFlag = (commentId) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, flagged: !comment.flagged } : comment
    );
    setComments(updatedComments);

    // Call the handler passed from Board component
    const isAnyCommentFlagged = updatedComments.some(comment => comment.flagged);
    handleFlagStatusChange(isAnyCommentFlagged);
  };

  return (
    <section className="comment-card-section">
      <div className="comment-card-footer">
        <div className="comment-footer-input">
          <textarea
            className="comment-textarea"
            placeholder="Message"
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
        </div>
        <div className="comment-footer-buttons">
          <button className="post-button" onClick={handlePostComment}>
            Post comment
          </button>
          <button className="cancel-button" onClick={() => setNewComment("")}>
            Cancel
          </button>
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
                  <a href="#!" className="action-item" onClick={() => toggleFlag(comment.id)}>
                    <i className={`fa ${comment.flagged ? 'fa-flag' : 'fa-flag-o'}`}></i>
                    <p className="action-text">{comment.flagged ? 'Unflag' : 'Flag'}</p>
                  </a>
                  <a href="#!" className="action-item" onClick={() => toggleReplyForm(comment.id)}>
                    <i className="fa fa-share"></i>
                    <p className="action-text">Reply</p>
                  </a>
                </div>

                {replyTo === comment.id && (
                  <div className="reply-form">
                    <textarea
                      className="comment-textarea"
                      placeholder="Write a reply..."
                      rows={3}
                      value={replyText[comment.id] || ""}
                      onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                    ></textarea>
                    <button
                      className="post-button"
                      onClick={() => handlePostReply(comment.id)}
                    >
                      Post reply
                    </button>
                  </div>
                )}

                {comment.replies.length > 0 && (
                  <div className="replies">
                    {comment.replies.map((reply) => {
                      const replyFormattedDate = format(
                        parseISO(reply.date_time),
                        "d MMM yyyy, h:mma",
                        { locale: enIN }
                      );

                      return (
                        <div className="reply-card" key={reply.id}>
                          <div className="reply-card-body">
                            <div className="reply-header">
                              <div
                                className="avatar"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  backgroundColor: "#ccc",
                                  color: "#fff",
                                  borderRadius: "50%",
                                  width: "30px",
                                  height: "30px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              >
                                {getInitials(reply.user)}
                              </div>
                              <div>
                                <h6 className="username">{reply.user}</h6>
                                <p className="date">{replyFormattedDate}</p>
                              </div>
                            </div>

                            <p className="reply-text">{reply.message}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

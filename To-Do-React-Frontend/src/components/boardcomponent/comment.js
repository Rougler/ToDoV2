// // import React, { PureComponent } from 'react';
// // import { CommentSection } from 'react-comments-section';
// // import 'react-comments-section/dist/index.css';

// // const CustomComment = ({ comment, onFlag }) => (
// //   <div className='comment'>
// //     <img src={comment.avatarUrl} alt={`${comment.fullName}'s avatar`} />
// //     <div>
// //       <a href={comment.userProfile}>{comment.fullName}</a>
// //       <p>{comment.text}</p>
// //       <button onClick={() => onFlag(comment.comId)}>Flag</button>
// //     </div>
// //   </div>
// // );

// // class ClassComponent extends PureComponent {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       data: [
// //         {
// //           userId: '01a',
// //           comId: '012',
// //           fullName: 'Riya Negi',
// //           avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
// //           userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
// //           text: 'Hey, Loved your blog!',
// //           replies: [],
// //           flagged: false
// //         },
// //         {
// //           userId: '02b',
// //           comId: '017',
// //           fullName: 'Lily',
// //           userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
// //           text: 'I have a doubt about the 4th point🤔',
// //           avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
// //           replies: [],
// //           flagged: false
// //         }
// //       ]
// //     };
// //   }

// //   onFlag = (comId) => {
// //     this.setState((prevState) => {
// //       const updatedData = prevState.data.map((comment) =>
// //         comment.comId === comId ? { ...comment, flagged: !comment.flagged } : comment
// //       );
// //       return { data: updatedData };
// //     });
// //   }

// //   onSubmitAction = (data) => {
// //     console.log('this comment was posted!', data);
// //   }

// //   customNoComment = () => <div className='no-com'>No comments wohoooo!</div>

// //   render() {
// //     return (
// //       <CommentSection
// //         currentUser={{
// //           currentUserId: '01a',
// //           currentUserImg: 'https://ui-avatars.com/api/name=Riya&background=random',
// //           currentUserProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
// //           currentUserFullName: 'Riya Negi'
// //         }}
// //         commentData={this.state.data}
// //         onSubmitAction={(data) => this.onSubmitAction(data)}
// //         customNoComment={() => this.customNoComment()}
// //         logIn={{
// //           loginLink: 'http://localhost:3001/',
// //           signupLink: 'http://localhost:3001/'
// //         }}
// //         customInput={(props) => (
// //           props.commentData.map((comment) => (
// //             <CustomComment key={comment.comId} comment={comment} onFlag={this.onFlag} />
// //           ))
// //         )}
// //       />
// //     );
// //   }
// // }

// // export default ClassComponent;



// import React from 'react';
// import PropTypes from 'prop-types';
// import '../../styles/comment.css';

// const CommentBox = ({ user, time, comment, likes, onLike, onReply }) => {
//   return (
//     <div className="comment-box">
//       <div className="comment-header">
//         {user && user.avatar && (
//           <img src={user.avatar} alt={user.name} className="avatar" />
//         )}
//         <div className="comment-user-info">
//           <span className="user-name">{user ? user.name : 'Anonymous'}</span>
//           <span className="comment-time">{time}</span>
//         </div>
//       </div>
//       <div className="comment-body">
//         {comment}
//       </div>
//       <div className="comment-footer">
//         <div className="like-section" onClick={onLike}>
//           <span className="like-icon">❤️</span>
//           <span className="like-count">{likes}</span>
//         </div>
//         <div className="reply-section" onClick={onReply}>
//           <span className="reply-icon">😊</span>
//         </div>
//       </div>
//       <div className="reply-box">
//         <input type="text" placeholder="Reply" className="reply-input" />
//         <button className="reply-button">↩️</button>
//       </div>
//     </div>
//   );
// };

// CommentBox.propTypes = {
//   user: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     avatar: PropTypes.string
//   }),
//   time: PropTypes.string.isRequired,
//   comment: PropTypes.string.isRequired,
//   likes: PropTypes.number.isRequired,
//   onLike: PropTypes.func.isRequired,
//   onReply: PropTypes.func.isRequired
// };

// CommentBox.defaultProps = {
//   user: {
//     name: 'Anonymous',
//     avatar: 'https://via.placeholder.com/40'
//   }
// };

// export default CommentBox;



import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/comment.css';

const CommentBox = ({ user, time, comment, likes, onLike, onEdit, onDelete, onFlag }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(editedComment);
    setIsEditing(false);
  };

  return (
    <div className="comment-box">
      <div className="comment-header">
        {user && user.avatar && (
          <img src={user.avatar} alt={user.name} className="avatar" />
        )}
        <div className="comment-user-info">
          <span className="user-name">{user ? user.name : 'Anonymous'}</span>
          <span className="comment-time">{time}</span>
        </div>
      </div>
      <div className="comment-body">
        {isEditing ? (
          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
        ) : (
          <p>{comment}</p>
        )}
      </div>
      <div className="comment-footer">
        <div className="edit-section" onClick={handleEdit}>
          <span className="edit-icon-comment"style={{cursor: "pointer"}}>✏️</span>
        </div>
        <div className="delete-section" onClick={onDelete}>
          <span className="delete-icon-comment"style={{cursor: "pointer"}}>🗑️</span>
        </div>
        <div className="flag-section" onClick={onFlag}>
          <span className="delete-icon-comment"style={{cursor: "pointer"}}>🗑️</span>
        </div>
        {isEditing && (
          <div className="save-section" onClick={handleSave}>
            <span className="save-icon-comment"style={{cursor: "pointer"}}>💾</span>
          </div>
        )}
      </div>
    </div>
  );
};

CommentBox.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }),
  time: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  onLike: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onFlag:PropTypes.func.isRequired,
};

CommentBox.defaultProps = {
  user: {
    name: 'Anonymous',
    avatar: 'https://via.placeholder.com/40'
  }
};

const CommentsSection = ({ initialComments }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const newCommentObj = {
        user: {
          name: 'Anonymous',
          avatar: 'https://via.placeholder.com/40'
        },
        time: 'Just now',
        comment: newComment,
        likes: 0
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
    }
  };

  const handleEditComment = (index, newCommentText) => {
    const updatedComments = comments.map((comment, i) =>
      i === index ? { ...comment, comment: newCommentText } : comment
    );
    setComments(updatedComments);
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  return (
    <div className="comments-section">
      <div className="add-comment">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="new-comment-input"
        />
        <button onClick={handleAddComment} className="add-comment-button">
          Add Comment
        </button>
      </div>
      {comments.map((comment, index) => (
        <CommentBox
          key={index}
          user={comment.user}
          time={comment.time}
          comment={comment.comment}
          likes={comment.likes}
          onLike={() => {
            const newComments = [...comments];
            newComments[index].likes += 1;
            setComments(newComments);
          }}
          onEdit={(newCommentText) => handleEditComment(index, newCommentText)}
          onDelete={() => handleDeleteComment(index)}
        />
      ))}
    </div>
  );
};

CommentsSection.propTypes = {
  initialComments: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string
      }),
      time: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired
    })
  ).isRequired
};

const App = ({ initialComments }) => {
  return (
    <div className="App">
      <p>{`Comments ${initialComments.length}`}</p>
      <CommentsSection initialComments={initialComments} />
    </div>
  );
};

App.propTypes = {
  initialComments: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string
      }),
      time: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired
    })
  ).isRequired
};

// Sample initial comments
const initialComments = [
  {
    user: {
      name: 'Jenny Wen',
      avatar: 'https://via.placeholder.com/40'
    },
    time: '6 hours ago',
    comment: 'I love where this is headed, but I’m not quite sure about the spacing here. I think things could be nudged over a bit to get to a tighter rhythm.',
    likes: 3
  }
  
];

// Rendering the App with initial comments
const renderApp = () => (
  <App initialComments={initialComments} />
);

export default renderApp;


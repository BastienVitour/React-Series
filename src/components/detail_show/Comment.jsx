import React, { useState } from 'react';
import { db } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';


const Comment = ({ comment }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [likes, setLikes] = useState(0);
  const [replies, setReplies] = useState([]);

  const toggleReply = () => {
    setIsReplying(!isReplying);
  };

  const handleReplyTextChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleReply = () => {
    if (replyText.trim() !== '') {
      setReplies([...replies, replyText]);
      setIsReplying(false);
      setReplyText('');
    }
  };

  return (
    <div className="comment">
      <div className="comment-author">{comment.author}</div>
      <div className="comment-text">{comment.text}</div>
      <div className="comment-info">
        <span className="comment-likes" onClick={handleLike}>
          {likes} Likes
        </span>
        <span className="comment-timestamp">{comment.timestamp}</span>
      </div>
      <button onClick={toggleReply}>Reply</button>
      {isReplying && (
        <div className="comment-reply">
          <textarea
            placeholder="Write a reply..."
            value={replyText}
            onChange={handleReplyTextChange}
          />
          <button onClick={handleReply}>Post Reply</button>
        </div>
      )}
      <div className="comment-replies">
        {replies.map((reply, index) => (
          <div key={index} className="comment-reply">{reply}</div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
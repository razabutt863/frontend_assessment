// src/components/Comment.js
import React, { useState, useEffect } from "react";
import "./Comment.css";
import like from "../images/like.svg";
import unlike from "../images/unlike.svg";
import user4 from "../images/user4.png";

function Comment({ comment, onLike, onRemove, onReply, sendDataToParent }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    setIsLiked(comment.isLiked);
  }, [comment.isLiked]);

  const handleLike = () => {
    onLike(comment.id, !isLiked);
    setIsLiked(!isLiked);
  };

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleReplySubmit = (e) => {
    if (replyText.trim() !== "") {
      onReply(comment.id, replyText);
      setIsReplying(false);
      setReplyText("");
      setReplies(e.target.value);
    }
  };

  const handleCancelReply = () => {
    setIsReplying(false);
    setReplyText("");
  };

  const renderReplies = () => {
    return replies.map((reply, index) => (
      <div key={index} className="comment">
        <div className="imgDiv">
          <img src={reply.image} alt="user" />
        </div>
        <div className="textDiv">
          <p>
            <b>{reply.name}</b>
          </p>
          <p>{reply.text}</p>
        </div>
      </div>
    ));
  };

  // const replyComment = () => {
  //   const replyUser = [
  //     {
  //       id: comment.length + 1,
  //       name: "John Doe",
  //       image: user4,
  //       text: "Old rivalry! Consider me in ;-)",
  //     },
  //   ];
  //   sendDataToParent(replyUser);
  // };

  return (
    <div className="comment">
      <div className="imgDiv">
        <img src={comment.image} alt="user"></img>
      </div>
      <div className="textDiv">
        <p>
          <b>{comment.name}</b>
        </p>
        <p>{comment.text}</p>
        <div className="actions">
          <button onClick={handleLike}>
            {isLiked ? <img src={unlike}></img> : <img src={like}></img>}(
            {comment.likes})
          </button>
          <span> .</span>
          <button onClick={() => onRemove(comment.id)}>Remove</button>
          <button onClick={handleReplyClick}>Reply</button>
        </div>
        {isReplying && (
          <div>
            <input
              placeholder="Write your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <p>{replyText}</p>
            <button onClick={handleReplySubmit}>Submit</button>
            <button onClick={handleCancelReply}>Cancel</button>
          </div>
        )}
        {replies.length > 0 && (
          <div className="replies">
            <p>{renderReplies()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;

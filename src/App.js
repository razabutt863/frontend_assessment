// src/App.js
import "./App.css";
import React, { useState } from "react";
import CommentList from "./components/CommentList";
import sendIcon from "./images/send.svg";
import user1 from "./images/user1.png";
import user2 from "./images/user2.png";
import user3 from "./images/user3.png";
import user4 from "./images/user4.png";

function App() {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Maria",
      image: user1,
      text: "I was very glad to have you after such a long time. Can you plan a meetup? Maybe this weekend?",
      likes: 1,
      isLiked: false,
    },
    {
      id: 2,
      name: "Alex Benjamin",
      image: user2,
      text: "Home sweet home! I'm glad you are back. It's been two year and miss the football matches we have together. A lot has been changed since you left. Let's meet at the ground tomorrow evening? ",
      likes: 1,
      isLiked: false,
    },
    {
      id: 3,
      name: "Tania",
      image: user3,
      text: "Hey bud, welcome back to home. It's so long to see you back again. Would love to hear the travelling stories of yours. Your or my place?",
      likes: 0,
      isLiked: true,
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (newComment.trim() !== "") {
      const comment = {
        id: Date.now(),
        image: user4,
        name: "John Doe",
        text: newComment,
        likes: 0,
        isLiked: true,
      };

      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  // const [dataFromChild, setDataFromChild] = useState("");
  // const receiveDataFromChild = (data) => {
  //   // setComments([...comments, data]);
  // };

  const removeComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  };

  const likeComment = (id, isLiked) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          likes: isLiked ? comment.likes - 1 : comment.likes + 1,
        };
      }

      return comment;
    });

    setComments(updatedComments);
  };

  const myselfUser = () => {
    const meUser = [
      ...comments,
      {
        id: comments.length + 1,
        name: "John Doe",
        image: user4,
        text: "Thank You all",
        likes: 0,
        isLiked: true,
      },
    ];
    setComments(meUser);
  };

  const replyToReply = (commentId, parentId) => {
    const commentIndex = comments.findIndex(
      (comment) => comment.id === parentId
    );

    if (commentIndex !== -1) {
      const updatedComments = [...comments];
      const parentComment = { ...updatedComments[commentIndex] };
      parentComment.replies = parentComment.replies || [];
      parentComment.replies.push({
        id: Date.now(),
        name: "John Doe",
        image: user4,
        text: "Old rivalry! Consider me in ;-)",
      });
      updatedComments[commentIndex] = parentComment;

      setComments(updatedComments);
    }
  };

  // const addReply = (parentId, replyText) => {
  //   const updatedComments = comments.map((comment) => {
  //     if (comment.id === parentId) {
  //       return {
  //         ...comment,
  //         replies: [...(comment.replies || []), { text: replyText }],
  //       };
  //     }
  //     return comment;
  //   });

  //   setComments(updatedComments);
  // };

  return (
    <div className="App">
      <h1>Comment</h1>
      <CommentList
        comments={comments}
        onLike={likeComment}
        onRemove={removeComment}
        onReply={replyToReply}
        // sendDataToParent={receiveDataFromChild}
      />
      <div className="inputDiv">
        <input
          className="input-Div-Field"
          type="text"
          placeholder="    Write Your comment."
          value={newComment}
          onClick={myselfUser}
          onChange={(e) => setNewComment(e.target.value)}
        ></input>

        <img src={sendIcon} onClick={addComment}></img>
      </div>
    </div>
  );
}

export default App;

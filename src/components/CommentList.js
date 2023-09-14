// src/components/CommentList.js
import React, { useState } from "react";
import Comment from "./commentBox";

function CommentList(props, comments, user4, setComments) {
  // const [dataFromChild, setDataFromChild] = useState("");
  // const receiveDataFromChild = (data) => {
  //   console.log(data);
  //   props.sendDataToParent(data);
  // };

  const replyToComment = (commentId, replyText) => {
    const commentIndex = comments.findIndex(
      (comment) => comment.id === commentId
    );
  };

  //   if (commentIndex !== -1) {
  //     const updatedComments = [...comments];
  //     updatedComments[commentIndex].replies =
  //       updatedComments[commentIndex].replies || [];
  //     updatedComments[commentIndex].replies.push({
  //       id: Date.now(),
  //       name: "John Doe",
  //       image: user4,
  //       text: replyText,
  //     });

  //     setComments(updatedComments);
  //   }
  // };

  return (
    <div className="comment-list">
      {props.comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onLike={props.onLike}
          onRemove={props.onRemove}
          onReply={props.onReply}
          // sendDataToParent={receiveDataFromChild}
        />
      ))}
    </div>
  );
}

export default CommentList;

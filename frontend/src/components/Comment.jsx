import React from "react";
import "../styles/comment.css"

const Comment = ({ name, comment, timestamp, read }) => {
  const circleColor = read ? "green" : "red";

  return (
    <div className="commentContainer">
      <div className="userInfo">
        <strong>{name}</strong>
      </div>
      <div className="comment">
        <p>{comment}</p>
      </div>
      <div className="meta">
        <div className="circle" style={{backgroundColor: circleColor }}></div>
        <span>{timestamp}</span>
      </div>
    </div>
  );
};


export default Comment;

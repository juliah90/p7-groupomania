import React from "react";
import "../styles/message.css";

const Message = ({ sender, content, timestamp, read }) => {
  const circleColor = read ? "green" : "red";

  return (
    <div className="messageContainer">
      <div className="userInfo">
        <strong>{sender}</strong>
      </div>
      <div className="messageContent">
        <p>{content}</p>
      </div>
      <div className="meta">
        <div className="circle" style={{ backgroundColor: circleColor }}></div>
        <span>{timestamp}</span>
      </div>
    </div>
  );
};

export default Message;

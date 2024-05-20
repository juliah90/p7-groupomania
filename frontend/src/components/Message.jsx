import React from "react";
import "../styles/message.css";

const Message = ({ message, isExpanded, onToggle }) => {
  const previewContent = message.content.length > 10 ? message.content.substring(0, 10) + '...' : message.content;
  const contentToDisplay = isExpanded ? message.content : previewContent;
  const circleColor = message.read ? "green" : "red";

  return (
    <div className="messageContainer" onClick={onToggle}>
      <div className="userInfo">
        <strong>{message.name}</strong>
      </div>
      <div className="message">
        <p>{contentToDisplay}</p>
      </div>
      <div className="meta">
        <div className="circle" style={{ backgroundColor: circleColor }}></div>
        <span>{message.timestamp}</span>
      </div>
    </div>
  );
};

export default Message;

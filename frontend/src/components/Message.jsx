import React, { useState } from "react";
import "../styles/message.css";
import axios from 'axios';

const Message = ({ message, user, onReadStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const previewContent = message?.message.length > 10 ? message.message.substring(0, 10) + '...' : message?.message;
  const contentToDisplay = isExpanded ? message.message : previewContent;
  const circleColor = message?.read ? "green" : "red";

  const handleToggle = () => {
    if (!message.read) {
      markAsRead();
    }
    setIsExpanded(!isExpanded);
  };

  const markAsRead = async () => {
    try {
      await axios.post(`http://localhost:3000/api/posts/${message.id}/read`, {}, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      onReadStatusChange(message.id);
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  return (
    <div className="messageContainer" onClick={handleToggle} role="button"
      aria-expanded={isExpanded}
      aria-label={message.read ? "Message read" : "Message unread"}>
      <div className="userInfo">
        <strong>{message?.name}</strong>
      </div>
      <div className="message">
        <p>{contentToDisplay}</p>
        {isExpanded && message.multimediaUrl && (
          <div className="multimedia">
            {message.multimediaUrl.match(/\.(jpeg|jpg|gif|png)$/) ? (
              <img src={message.multimediaUrl} alt="Multimedia content" />
            ) : (
              <video controls>
                <source src={message.multimediaUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
      </div>
      <div className="meta">
        <div className="circle" style={{ backgroundColor: circleColor }} role="status"
          aria-live="polite"
          aria-label={message.read ? "Read" : "Unread"}></div>
        <span>{message?.timestamp}</span>
      </div>
    </div>
  );
};

export default Message;

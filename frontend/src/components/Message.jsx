import React, { useState } from "react";
import "../styles/message.css";

const Message = ({ message }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const previewContent = message?.message.length > 10 ? message.message.substring(0, 10) + '...' : message?.message;
  const contentToDisplay = isExpanded ? message.message : previewContent;
  const circleColor = message?.read ? "green" : "red";

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="messageContainer" onClick={handleToggle}>
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
        <div className="circle" style={{ backgroundColor: circleColor }}></div>
        <span>{message?.timestamp}</span>
      </div>
    </div>
  );
};

export default Message;

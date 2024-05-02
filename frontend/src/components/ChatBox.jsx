import React from "react";
import Comment from "./Comment";
import '../styles/chatbox.css';

const ChatBox = () => {
  return (
    <div className="container">
      <div className="messages">
        {<Comment />}
      </div>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Type your message here..."
          className="input"
        />
        <button className="button">Send</button>
      </div>
    </div>
  );
};


export default ChatBox;

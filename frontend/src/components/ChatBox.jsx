import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/chatbox.css';
import Message from './Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

const ChatBox = () => {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const headers = { 'Authorization': `Bearer ${user.token}` };
    axios.get('http://localhost:3000/api/posts', { headers })
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => console.error('Error fetching messages:', error));
  }, [user.token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('post', JSON.stringify({ title: 'New Post', message: messageInput, username: user.username }));
    console.log(file)
    if (file) {
      formData.append('file', file);
    }

    axios.post('http://localhost:3000/api/posts', formData, {
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
      .then(response => {
        setMessages(prevMessages => [...prevMessages, response.data.post]);
        setMessageInput('');
        setFile(null);
      })
      .catch(error => console.error('Error sending message:', error));
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0]);
  };

  const handleIconClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleToggle = (index) => {
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages];

      if (!updatedMessages[index].read) {
        axios.post(`http://localhost:3000/api/posts/${updatedMessages[index].id}/read`, {}, {
          headers: { 'Authorization': `Bearer ${user.token}` }
        })
        .then(() => {
          updatedMessages[index].read = true;
        })
          .catch(error => console.error('Error marking message as read:', error));
      }
      updatedMessages[index].isExpanded = !updatedMessages[index].isExpanded;
      return updatedMessages;
    });
  };

  const updateReadStatus = (messageId) => {
    setMessages(prevMessages => {
      const updatedMessages = prevMessages.map(message =>
        message.id === messageId ? { ...message, read: true } : message
      );
      return updatedMessages;
    });
  };

  return (
    <div className="container">
      <div className="messages">
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message}
            user={user}
            isExpanded={message.isExpanded}
            onToggle={() => handleToggle(index)}
            onReadStatusChange={updateReadStatus}
          />
        ))}
      </div>
      <div className="inputContainer">
        <form className='inputForm' id='inputForm' onSubmit={handleSubmit} aria-labelledby="inputForm">
          <div className="inputWrapper">
          <label htmlFor="messageInput" className="visually-hidden">Type your message here</label>
            <input
              type="text"
              placeholder="Type your message here..."
              id="messageInput"
              className="input"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <FontAwesomeIcon icon={faPaperclip} className="paperclipIcon" aria-labelledby="fileInput" onClick={handleIconClick} />
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              aria-label="Attach a file"
            />
          </div>
          <button type="submit" className="button">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;

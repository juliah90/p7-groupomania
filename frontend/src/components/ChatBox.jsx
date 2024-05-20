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

  useEffect(() => {
    axios.get('/api/posts')
      .then(response => setMessages(response.data))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('post', JSON.stringify({ title: 'New Post', message: messageInput }));
    if (file) {
      formData.append('file', file);
    }

    axios.post('/api/posts', formData)
      .then(response => {
        setMessages(prevMessages => [...prevMessages, response.data]);
        setMessageInput('');
        setFile(null);
      })
      .catch(error => console.error('Error sending message:', error));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleIconClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="container">
      <div className="messages">
        {messages.map((message, index) => (
          <Message
            key={index}
            name={message.name}
            content={message.content}
            multimediaUrl={message.multimediaUrl}
            timestamp={message.timestamp}
            read={message.read}
          />
        ))}
      </div>
      <div className="inputContainer">
        <form onSubmit={handleSubmit}>
          <div className="inputWrapper">
            <input
              type="text"
              placeholder="Type your message here..."
              className="input"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <FontAwesomeIcon icon={faPaperclip} className="paperclipIcon" onClick={handleIconClick} />
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="button">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;

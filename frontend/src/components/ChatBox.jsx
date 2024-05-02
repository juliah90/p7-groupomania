import React, { useState } from "react";
import Comment from "./Comment";
import '../styles/chatbox.css';


const ChatBox = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [messages, setMessages] = useState([]);

    // Filter messages based on search query
    const filteredMessages = messages.filter(message => {
        return message.content.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="container">
            <div>
                {/* Search input field */}
                <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />

                {/* Display filtered messages */}
                <div>
                    {filteredMessages.map(message => (
                        <div key={message.id}>
                            <p>{message.content}</p>
                            <p>Sender: {message.sender}</p>
                            <p>Timestamp: {message.timestamp}</p>
                        </div>
                    ))}
                </div>
            </div>
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

import React, { useState, useEffect } from "react";
import '../styles/chatbox.css';
import Message from "./Message";

const ChatBox = () => {
    const [messageInput, setMessageInput] = useState(''); // Message input
    const [messages, setMessages] = useState(() => {
        const storedMessages = localStorage.getItem('messages');
        return storedMessages ? JSON.parse(storedMessages) : [];
    }); // store messages

    // Save messages to local storage whenever messages change
    useEffect(() => {//FIXME get latest messages from backend using axios
        //TODO update useEffect react hook so that it can be refreshed programatically
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add the typed message to the messages array
        const newMessage = {
            content: messageInput,
            timestamp: new Date().toLocaleString(),
            read: false // Assuming all new messages are unread
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        // Clear the message input
        setMessageInput('');
    };

    return (
        <div className="container">
            <div className="messages">
                {messages.map((message, index) => (
                    <Message
                        key={index}
                        content={message.content}
                        timestamp={message.timestamp}
                        read={message.read} // Pass the read status to the Message component
                    />
                ))}
            </div>
            <div className="inputContainer">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Type your message here..."
                        className="input"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <button type="submit" className="button">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ChatBox;

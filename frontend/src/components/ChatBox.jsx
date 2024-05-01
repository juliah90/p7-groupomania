import React from "react";

const ChatBox = () => {
  return (
    <div style={styles.container}>
      <div style={styles.messages}>
        {/* Messages go here */}
        {/* Example message: <MessageItem author="John" text="Hello there!" /> */}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type your message here..."
          style={styles.input}
        />
        <button style={styles.button}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    border: "2px solid #121559",
    borderRadius: "8px",
    padding: "10px",
    width: "300px",
    margin: "20px auto",
  },
  messages: {
    minHeight: "200px",
    marginBottom: "10px",
    overflowY: "auto",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    flex: "1",
    padding: "8px",
    marginRight: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#121559",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ChatBox;

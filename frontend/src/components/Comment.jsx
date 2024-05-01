import React from "react";

const Comment = ({ name, comment, timestamp, read }) => {
  const circleColor = read ? "green" : "red";

  return (
    <div style={styles.commentContainer}>
      <div style={styles.userInfo}>
        <strong>{name}</strong>
      </div>
      <div style={styles.comment}>
        <p>{comment}</p>
      </div>
      <div style={styles.meta}>
        <div style={{ ...styles.circle, backgroundColor: circleColor }}></div>
        <span>{timestamp}</span>
      </div>
    </div>
  );
};

const styles = {
  commentContainer: {
    marginBottom: "20px",
  },
  userInfo: {
    marginBottom: "5px",
  },
  comment: {
    marginLeft: "20px",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    marginTop: "5px",
  },
  circle: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    marginRight: "10px",
  },
};

export default Comment;

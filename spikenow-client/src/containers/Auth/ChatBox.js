import React from "react";
import { Card } from "react-bootstrap";

const ChatBox = ({ email, sender, subject, snippet, onClick }) => {
  return (
    <Card
      className="rounded-0 border-0 p-3"
      id="chat-box"
      onClick={() => onClick(email, sender)}
    >
      <div className="d-flex">
        <div className="mr-3 my-auto">
          <div
            className="rounded-circle bg-primary d-flex justify-content-center align-items-center pt-2"
            style={{ width: "40px", height: "40px" }}
          >
            <h5>{sender ? sender.toUpperCase().charAt(0) : ""}</h5>
          </div>
        </div>
        <div style={{ lineHeight: "1rem" }}>
          <h6 className="m-0">{sender}</h6>
          <small className="d-block">{subject}</small>
          <small className="text-muted">
            {snippet.length > 50
              ? snippet.substring(0, 50 - 3) + "..."
              : snippet}
          </small>
        </div>
      </div>
    </Card>
  );
};

export default ChatBox;

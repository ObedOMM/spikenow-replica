import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const ChatSideBar = ({ chatBoxes }) => {
  return (
    <Container fluid>
      <Row>
        <Card className="w-100 border-top-0 border-left-0 border-right-0 rounded-0 px-3 py-2">
          <div className="d-flex">
            <img
              src="https://randomuser.me/api/portraits/men/9.jpg"
              className="rounded-circle"
              width="40"
              height="40"
              alt=""
            />
            <h6 className="my-auto ml-2">
              {sessionStorage.getItem("full_name")}
            </h6>
          </div>
        </Card>
      </Row>
      <Row>
        <Col style={{ height: "86vh", overflowY: "scroll" }} className="px-0">
          <h6 className="mx-3">Today</h6>
          {chatBoxes}
        </Col>
      </Row>
    </Container>
  );
};

export default ChatSideBar;

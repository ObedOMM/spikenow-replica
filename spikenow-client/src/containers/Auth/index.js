import { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

const Chat = () => {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={6}>
          <h1>Send Email Test</h1>
          <h2>Logged in as </h2>
          <Form>
            <Form.Group>
              <Form.Label>Send to:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter recipients email"
                value={formData.to}
                onChange={(e) => setFormData({ to: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Subject:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject"
                value={formData.subject}
                onChange={(e) => setFormData({ subject: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Messsage:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter message"
                value={formData.message}
                onChange={(e) => setFormData({ message: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;

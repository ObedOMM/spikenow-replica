import { Card, Form, Button } from "react-bootstrap";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { BiCode } from "react-icons/bi";
import { FaPaperPlane } from "react-icons/fa";
import { Logout } from "../../components/GoogleAuth";

const ChatBody = ({ onSubmit, senderName, message, setMessage }) => {
  // function onMessage(content) {
  //   if (this.selectedUser) {
  //     socket.emit("private message", {
  //       content,
  //       to: this.selectedUser.userID,
  //     });
  //     this.selectedUser.messages.push({
  //       content,
  //       fromSelf: true,
  //     });
  //   }
  // }
  // function onSelectUser(user) {
  //   this.selectedUser = user;
  //   user.hasNewMessages = false;
  // }

  return (
    <>
      <div>
        <Card className="w-100 border-top-0 border-left-0 border-right-0 rounded-0 px-3 py-2">
          <div className="d-flex justify-content-between align-items-center">
            <h6>{senderName}</h6>
            <Logout />
          </div>
        </Card>
      </div>
      <div className="d-flex">
        <HiOutlineAtSymbol
          className="display-1 mx-auto mt-5"
          style={{ color: "lightgrey" }}
        />
      </div>
      <div className="position-absolute fixed-bottom">
        <div className="d-flex">
          <Form.Control
            type="text"
            className="rounded-0 border-right-0 border-left-0 py-4 shadow-none"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></Form.Control>
          <Button
            variant="link"
            className="bg-white border-top border-bottom rounded-0 m-0"
          >
            {" "}
            <BiCode />{" "}
          </Button>
          <Button
            variant="link"
            className="bg-white border-top border-bottom rounded-0 m-0"
            onClick={() => onSubmit(message)}
          >
            {" "}
            <FaPaperPlane />{" "}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChatBody;

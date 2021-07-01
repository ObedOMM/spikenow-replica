import { Card, Form, Button } from "react-bootstrap";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { BiCode } from "react-icons/bi";
import { FaLessThan } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { Logout } from "../../components/GoogleAuth";

const ChatBody = ({
  onSubmit,
  senderName,
  message,
  setMessage,
  isShowBody,
  setShowBody,
}) => {
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
        <Card
          className="w-100 border-top-0 border-left-0 border-right-0 rounded-0"
          style={{ height: "50px" }}
        >
          <div className="d-flex justify-content-between align-items-center my-auto mx-3">
            <h6>
              {" "}
              {isShowBody ? (
                <FaLessThan
                  className="cursor-pointer mr-2"
                  onClick={() => setShowBody(false)}
                />
              ) : (
                ""
              )}{" "}
              {senderName}
            </h6>
            <Logout />
          </div>
        </Card>
      </div>
      {!isShowBody ? (
        <div
          className="d-flex flex-grow-1 justify-content-center align-items-center"
          style={{
            height: "0px",
            overflowY: "scroll",
          }}
        >
          <HiOutlineAtSymbol
            className="display-1"
            style={{ color: "lightgrey" }}
          />
        </div>
      ) : (
        <>
          <div
            className="flex-grow-1"
            style={{
              height: "0px",
              overflowY: "auto",
              backgroundColor: "white",
            }}
          ></div>
          <div>
            <div className="d-flex" style={{ height: "50px" }}>
              <Form.Control
                type="text"
                className="rounded-0 border-right-0 border-left-0 shadow-none h-100"
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
      )}
    </>
  );
};

export default ChatBody;

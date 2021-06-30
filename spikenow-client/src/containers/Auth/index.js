import { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AuthorizedUserContext } from "../../components/AuthorizedRoutes";
import ChatBody from "./ChatBody";
import ChatSideBar from "./ChatSideBar";
import ChatBox from "./ChatBox";

const Chat = () => {
  const { userInfo } = useContext(AuthorizedUserContext);
  const { token } = userInfo;
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedName, setSelectedName] = useState("Sender");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getEmails(token) {
      console.log("isLoading");
      const res = await fetch("http://localhost:3001/getEmails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      setEmails(data);
      console.log("isLoaded");
    }
    getEmails(token);
  }, []);

  console.log(selectedEmail);

  const setSelectedContact = (email, name) => {
    setSelectedEmail(email);
    setSelectedName(name);
  };

  const stripSender = (string) => {
    let email = string.substring(
      string.lastIndexOf("<") + 1,
      string.lastIndexOf(">")
    );

    if (email) {
      let name = string.substr(0, string.indexOf("<"));
      name = name.replace(/['"]+/g, "");
      return { email, name };
    }
    return string;
  };

  const chatBox = (emails) => {
    let prevSender = [];
    const reduce = emails.reduce(function (filtered, option) {
      // return filtered.includes(option) ? filtered : [...filtered, option];
      const { id, snippet } = option;
      let sender = option.payload.headers.find((data) => {
        return data.name === "From" || data.name === "from";
      });

      let stripped = stripSender(sender.value);

      let senderEmail = stripped.email ? stripped.email : stripped;

      if (senderEmail === userInfo.email) {
        sender = option.payload.headers.find((data) => {
          return data.name === "To" || data.name === "to";
        });
        stripped = stripSender(sender.value);
        senderEmail = stripped.email ? stripped.email : stripped;
      }
      const subject = option.payload.headers.find((data) => {
        return data.name === "Subject";
      });
      // const stripped = stripSender(sender.value);
      // const senderName = stripped.name ? stripped.name : stripped;
      // const senderEmail = stripped.email ? stripped.email : stripped;
      let senderName = stripped.name ? stripped.name : stripped;

      if (prevSender.length > 0 && prevSender.includes(senderEmail)) {
        return filtered;
      }
      prevSender.push(senderEmail);

      filtered.push(
        <ChatBox
          sender={senderName}
          subject={subject ? subject.value : ""}
          snippet={snippet}
          onClick={setSelectedContact}
          email={senderEmail}
          key={id}
        />
      );

      return filtered;
    }, []);

    // console.log(reduce);
    // console.log(reduce);
    // const test = emails.map((email) => {
    //   const sender = email.payload.headers.find((data) => {
    //     return data.name === "From" || data.name === "from";
    //   });
    //   const subject = email.payload.headers.find((data) => {
    //     return data.name === "Subject";
    //   });

    //   // const { id, snippet, sender, subject } = email;

    //   const stripped = stripSender(sender.value);

    //   return (
    //     <ChatBox
    //       sender={stripped.name ? stripped.name : stripped}
    //       subject={subject ? subject.value : ""}
    //       snippet={email.snippet}
    //       onClick={setSelectedContact}
    //       email={stripped.email ? stripped.email : stripped}
    //       key={email.id}
    //     />
    //   );
    // });

    return reduce;
  };

  const sendEmail = async () => {
    if (!selectedEmail) {
      alert("no email selected");
      return;
    }
    const res = await fetch("http://localhost:3001/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        to: selectedEmail,
        subject: "This message is from SpikeNow Replica",
        message: message,
      }),
    });

    const data = await res.json();
    setMessage("");
    alert(data.message);
  };

  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row className="h-100">
        <Col md={4} className="border border-bottom-0 border-top-0 m-0 p-0">
          <ChatSideBar chatBoxes={chatBox(emails)} />
        </Col>
        <Col md={8} className="border-0 m-0 p-0 bg-light">
          <ChatBody
            onSubmit={sendEmail}
            senderName={selectedName}
            message={message}
            setMessage={setMessage}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;

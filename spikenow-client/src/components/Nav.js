import { useEffect, useState } from "react";
import logo from "../assets/spikenow.svg";
import Button from "./Button";
import GoogleLogin from "react-google-login";
import {
  Navbar,
  NavDropdown,
  Form,
  Nav as BSNav,
  Container,
} from "react-bootstrap";

const Nav = () => {
  // const [authUrl, setAuthUrl] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:3001/login-url")
  //     .then((res) => res.json())
  //     .then((data) => setAuthUrl(data))
  //     .catch((err) => console.log(err));
  // }, []);

  const handleLogin = async (googleData) => {
    const res = await fetch("http://localhost:3001/api/v1/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // store returned user somehow
  };

  return (
    <Navbar fixed="top" bg="white" expand="xl">
      <Container fluid className="px-5">
        <Navbar.Brand href="/">
          <img src={logo} width="114" height="58" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <BSNav className="mr-auto">
            <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavDropdown.Item href="/features">All features</NavDropdown.Item>
              <NavDropdown.Item href="/features/conversational">
                Conversation Email
              </NavDropdown.Item>
              <NavDropdown.Item href="/features/notes">
                Online Notes
              </NavDropdown.Item>
              <NavDropdown.Item href="/features/tasks">
                Tasks & To-Do Lists
              </NavDropdown.Item>
              <NavDropdown.Item href="/features/search">
                Advanced Search
              </NavDropdown.Item>
              <NavDropdown.Item href="/features/groups">
                Groups
              </NavDropdown.Item>
              <NavDropdown.Item href="/features/calendar">
                Calendar
              </NavDropdown.Item>
              <NavDropdown.Item href="/features/file">
                File Management
              </NavDropdown.Item>
              <NavDropdown.Item href="/features/priority">
                Priority Email Inbox
              </NavDropdown.Item>
              <NavDropdown.Item href="/features/voice">
                Voice Messages
              </NavDropdown.Item>
            </NavDropdown>
            <BSNav.Link href="/use-cases">Use Cases</BSNav.Link>
            <BSNav.Link href="/prices">Prices</BSNav.Link>
            <NavDropdown title="Resources" id="basic-nav-dropdown">
              <NavDropdown.Item href="/help">Help Center</NavDropdown.Item>
              <NavDropdown.Item href="/blog">Blog</NavDropdown.Item>
              <NavDropdown.Item href="/about">About Us</NavDropdown.Item>
            </NavDropdown>
          </BSNav>
          <Form inline>
            {/* <FormControl
              type="text"
              placeholder="Enter your email"
              className="mr-sm-2"
              required
            /> */}

            <GoogleLogin
              clientId="886519749145-kjltr7kubuadpgpnli3lfh10bb9g0rn8.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  id="btn-spike"
                >
                  Get Started
                </button>
              )}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleLogin}
              cookiePolicy={"single_host_origin"}
              accessType="offline"
              responseType="code"
            />

            {/* <a href={authUrl} id="btn-spike">
              Get Started
            </a> */}
            {/* <Button href={authUrl} text="" /> */}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Nav;

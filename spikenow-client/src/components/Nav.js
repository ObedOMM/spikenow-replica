import React from "react";
import logo from "../assets/spikenow.svg";
import Button from "./Button";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src={logo} width="114" height="58" alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Products
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="/features">
                    All features
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/features/conversational">
                    Conversation Email
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/features/notes">
                    Online Notes
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/features/tasks">
                    Tasks & To-Do Lists
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/features/search">
                    Advanced Search
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/features/groups">
                    Groups
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/features/calendar">
                    Calendar
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/features/file">
                    File Management
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/features/priority">
                    Priority Email Inbox
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/features/voice">
                    Voice Messages
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/use-case"
              >
                Use Cases
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/price">
                Prices
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Resources
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="/help">
                    Help Center
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/blog">
                    Blog
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/about">
                    About Us
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Enter your email"
              aria-label="Enter email"
            />
            <Button text="Get Started" />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

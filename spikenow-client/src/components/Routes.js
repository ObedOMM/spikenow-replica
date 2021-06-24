import { Route, Switch } from "react-router-dom";
import Home from "../containers/Home";
import Placeholder from "./Placeholder";

const Routes = () => {
  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/features" exact>
        <Placeholder theme="light" title="All Features" />
      </Route>
      <Route path="/features/conversational">
        <Placeholder theme="light" title="Conversation Email" />
      </Route>
      <Route path="/features/notes">
        <Placeholder theme="light" title="Online Notes" />
      </Route>
      <Route path="/features/tasks">
        <Placeholder theme="light" title="Tasks & To-Do Lists" />
      </Route>
      <Route path="/features/search">
        <Placeholder theme="light" title="Advanced Search" />
      </Route>
      <Route path="/features/groups">
        <Placeholder theme="light" title="Groups" />
      </Route>
      <Route path="/features/calendar">
        <Placeholder theme="light" title="Calendar" />
      </Route>
      <Route path="/features/file">
        <Placeholder theme="light" title="File Manager" />
      </Route>
      <Route path="/features/priority">
        <Placeholder theme="light" title="Priority Email Inbox" />
      </Route>
      <Route path="/features/voice">
        <Placeholder theme="light" title="Voice Messages" />
      </Route>
      <Route path="/use-case">
        <Placeholder theme="light" title="Use Cases" />
      </Route>
      <Route path="/price">
        <Placeholder theme="light" title="Prices" />
      </Route>
      <Route path="/help">
        <Placeholder theme="light" title="Help Center" />
      </Route>
      <Route path="/blog">
        <Placeholder theme="light" title="Blog" />
      </Route>
      <Route path="/about">
        <Placeholder theme="light" title="About Us" />
      </Route>
    </>
  );
};

export default Routes;

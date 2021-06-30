import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./components/Routes";
import AuthorizedRoutes from "./components/AuthorizedRoutes";
import { io } from "socket.io-client";

const URL = "http://localhost:3001";
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/web">
          <AuthorizedRoutes socket={socket} />
        </Route>
        <Route path="/">
          <Routes socket={socket} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

import reactDom from "react-dom";
import { createContext, useContext } from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Chat from "../containers/Auth";

// import { AppContext } from "../App";

export const AuthorizedUserContext = createContext();

const AuthorizedRoutes = ({ socket }) => {
  // document.html.style.height = "100%";
  // document.body.style.height = "100%";
  const userInfo = sessionStorage;
  return (
    <AuthorizedUserContext.Provider value={{ userInfo, socket }}>
      <Switch>
        <ProtectedRoute exact path="/web/chat" component={Chat} />
      </Switch>
    </AuthorizedUserContext.Provider>
  );
};

export default AuthorizedRoutes;

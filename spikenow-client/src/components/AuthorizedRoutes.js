import { createContext } from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Chat from "../containers/Auth";

// import { AppContext } from "../App";

export const AuthorizedUserContext = createContext();

const AuthorizedRoutes = ({ socket }) => {
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

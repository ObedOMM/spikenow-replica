import { createContext, useEffect } from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Chat from "../containers/Auth";

export const AuthorizedUserContext = createContext();

const AuthorizedRoutes = () => {
  const userInfo = sessionStorage;

  return (
    <AuthorizedUserContext.Provider value={{ userInfo }}>
      <Switch>
        <ProtectedRoute exact path="/web/chat" component={Chat} />
      </Switch>
    </AuthorizedUserContext.Provider>
  );
};

export default AuthorizedRoutes;

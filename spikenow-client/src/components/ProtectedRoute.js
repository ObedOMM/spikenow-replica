import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthorizedUserContext } from "./AuthorizedRoutes";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const userInfo = useContext(AuthorizedUserContext);

  const auth = async () => {
    const res = await fetch("http://localhost:3001/isAuth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.token,
      },
    });
    const data = await res.json();
    return data;
  };

  const isAuthenticated = userInfo.length !== 0 ? auth() : false;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;

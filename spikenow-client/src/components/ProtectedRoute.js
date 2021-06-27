import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3001/isAuth")
      .then((res) => res.json())
      .then((data) => console.log(data.isAuth));
  }, []);
  console.log("this", isAuthenticated);

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

import auth from "./auth";
import chat from "./chat";

const routes = (config) => {
  auth(config);
  chat(config);
};

export default routes;

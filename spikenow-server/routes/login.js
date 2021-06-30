import googleUtil from "../src/google-util";
import jwt from "jsonwebtoken";
import UserController from "../controllers/UserController";

const login = ({ app, config }) => {
  const user = new UserController(config.mysql.client);

  app.post("/google-auth", async (req, res, next) => {
    try {
      const { id, email, full_name, refresh_token } =
        await googleUtil.getGoogleAccountFromCode(req.body.code);
      const token = jwt.sign(
        {
          email,
          id,
          full_name,
          refresh_token,
        },
        "SpikeNowReplicaApi"
      );
      user.saveUser({ email, id });
      res.status(201).json({
        token,
        email,
        full_name,
      });
    } catch (error) {
      return next(error);
    }
  });

  app.post("/email", async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized user!" });
    }
    console.log(req.body);
    const token = req.user.refresh_token;
    const subject = req.body.subject;
    const message = req.body.message;
    const to = req.body.to;
    try {
      await googleUtil.sendGmail(token, subject, message, to);
      res.json({
        success: true,
        message: "Email Sent!",
      });
    } catch (error) {
      return next(error);
    }
  });

  app.get("/getEmails", async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized user!" });
    }
    try {
      const emails = await googleUtil.getEmails(req.user.refresh_token);
      res.json(emails);
    } catch (error) {
      return next(error);
    }
  });

  app.get("/getEmail/:id", async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized user!" });
    }
    try {
      const email = await googleUtil.getEmail(
        req.user.refresh_token,
        req.params.id
      );
      return res.json(email);
    } catch (error) {
      return next(error);
    }
  });

  app.get("/isAuth", async (req, res, next) => {
    if (!req.user || typeof req.user !== "undefined") {
      return res.json(false);
    } else {
      return res.json(true);
    }
  });

  return app;
};

export default login;

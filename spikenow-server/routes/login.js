import googleUtil from "../src/google-util";
import jwt from "jsonwebtoken";
import UserController from "../controllers/UserController";
import { OAuth2Client } from "google-auth-library";

const login = (app, config) => {
  const user = new UserController(config.mysql.client);

  const client = new OAuth2Client(config.googleCredentials.clientId);
  app.post("/api/v1/auth/google", async (req, res) => {
    console.log(req.body);
    // const { token } = req.body;
    // const ticket = await client.verifyIdToken({
    //   idToken: token,
    //   audience: process.env.CLIENT_ID,
    // });
    // const { name, email, picture } = ticket.getPayload();
    // console.log(req.body);
    // const user = {
    //   name,
    //   email,
    //   picture,
    // };
    // const user = await db.user.upsert({
    //   where: { email: email },
    //   update: { name, picture },
    //   create: { name, email, picture },
    // });
    res.status(201);
    // res.json(user);
  });

  app.get("/login-url", async (req, res, next) => {
    try {
      const url = await googleUtil.urlGoogle();
      console.log("Url Successully sent");
      res.json(url);
    } catch (error) {
      return next(error);
    }
  });

  app.get("/google-auth", async (req, res, next) => {
    try {
      const { id, email, refresh_token } =
        await googleUtil.getGoogleAccountFromCode(req.body.code);
      const token = jwt.sign(
        {
          email,
          id,
          refresh_token,
        },
        "SpikeNowReplicaApi"
      );
      req.session.token = token;
      user.saveUser({ email, id });
      // res.send(`Logged in as ${email} with ID: ${id}`);
      res.redirect(`http://localhost:3000/chat`);
      next();
    } catch (error) {
      return next(error);
    }
  });

  app.post("/email", async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized user!" });
    }
    const token = req.user.refresh_token;
    const subject = req.body.subject;
    const message = req.body.message;
    const to = req.body.to;
    try {
      await googleUtil.sendGmail(token, subject, message, to);
      res.json(`Email Sent`);
    } catch (error) {
      return next(error);
    }
  });

  app.get("/isAuth", async (req, res, next) => {
    try {
      console.log(req.user);
      return res.json({ isAuth: req.user ? true : false });
    } catch (error) {
      return next(error);
    }
  });

  app.get("/getCurrentUser", async (req, res, next) => {
    try {
      return res.json({
        email: req.user.email,
        id: req.user.gId,
      });
    } catch (error) {
      return next(error);
    }
  });

  return app;
};

export default login;

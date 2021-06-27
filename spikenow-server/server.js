import express from "express";
import session from "express-session";
import cors from "cors";
import routes from "./routes";
import jsonwebtoken from "jsonwebtoken";
import config from "./config";
import Sequelize from "sequelize";

function connectMySQL() {
  const sequelize = new Sequelize(config.mysql.options);
  sequelize
    .authenticate()
    .then(() => {
      console.info("Successfully connected to MySQL");
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  return sequelize;
}

const mysql = connectMySQL();
config.mysql.client = mysql;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  session({ secret: "spikenowsecret", saveUninitialized: false, resave: false })
);

// JWT USER TOKEN
app.use((req, res, next) => {
  if (req.session.token) {
    jsonwebtoken.verify(
      req.session.token,
      "SpikeNowReplicaApi",
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        console.log(req.user);
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

app.get("/", (req, res) => {
  res.send("Hello from SpikeNow Server");
});

routes(app, config);

const port = process.env.PORT;

app.listen(port, () =>
  console.log(`SpikeNow server is now running in port ${port}`)
);

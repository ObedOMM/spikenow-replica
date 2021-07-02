import express from "express";
import http from "http";
import session from "express-session";
import cors from "cors";
import jsonwebtoken from "jsonwebtoken";
import config from "./config";
import Sequelize from "sequelize";
import socketIO from "socket.io";
import routes from "./routes";
import websocket from "./routes/websocket";

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
  if (req.headers && req.headers.authorization) {
    jsonwebtoken.verify(
      req.headers.authorization,
      "SpikeNowReplicaApi",
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

websocket({ io });

routes({ app, config });

const port = process.env.PORT;

server.listen(port, () =>
  console.log(`SpikeNow server is now running in port ${port}`)
);

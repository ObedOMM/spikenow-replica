import express from "express";
import http from "http";
import session from "express-session";
import cors from "cors";
import jsonwebtoken from "jsonwebtoken";
import config from "./config";
import Sequelize from "sequelize";
import socketIO from "socket.io";
import routes from "./routes";

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

io.use((socket, next) => {
  const username = socket.handshake.auth.email;
  console.log(username);
  if (!username) {
    console.log("invalid username");
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  console.log("New client connected");

  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);

  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });

  // forward the private message to the right recipient
  socket.on("private message", ({ content, to }) => {
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    });
  });

  // notify users upon disconnection
  socket.on("disconnect", () => {
    console.log("Client Disconnected");
    socket.broadcast.emit("user disconnected", socket.id);
  });
});

routes({ app, config });

const port = process.env.PORT;

server.listen(port, () =>
  console.log(`SpikeNow server is now running in port ${port}`)
);

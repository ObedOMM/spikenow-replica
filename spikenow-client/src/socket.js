import { io } from "socket.io-client";

const URL = "http://localhost:3001";
const socket = io(URL);

const userInfo = sessionStorage;

if (userInfo) {
  const { id, email } = userInfo;
  socket.auth = { id, email };
}

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;

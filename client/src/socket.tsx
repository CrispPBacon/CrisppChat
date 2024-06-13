import { io } from "socket.io-client";
import { red } from "./messageLogger";
// import { useChat } from "./context/ChatContext";

const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3500";

export const socket = io(URL!, { autoConnect: false });

export const onConnect = async () => {
  socket.connect();
  socket.on("connect_error", (error: Error) => {
    throw new Error(`Socket connection error: ${error}`);
  });

  socket.on("error", (error: Error) => {
    throw new Error(`Socket connection error: ${error}`);
  });
  return "CONNETECTED TO SOCKET";
};

export const onDisconnect = () => {
  console.log("%cDISCONNECTED FROM SOCKET", red);
  socket.disconnect();
};

import io from "socket.io-client";
import Router from "./components/router/Router";

const socket = io("http://localhost:3001");

export default function App() {
  return <Router socket={socket} />;
}

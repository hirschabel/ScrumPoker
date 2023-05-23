import { Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home.js";
import RoomCreation from "../../pages/roomCreation/RoomCreation.js";
import Room from "../../pages/room/Room.js";

function Router(props) {
  const socket = props.socket;

  return (
    <Routes>
      <Route path="/" element={<Home socket={socket} />} />
      <Route path="/room-creation" element={<RoomCreation socket={socket} />} />
      <Route path="/room" element={<Room socket={socket} />} />
    </Routes>
  );
}

export default Router;

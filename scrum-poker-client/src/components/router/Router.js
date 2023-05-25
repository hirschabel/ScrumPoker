import { Route, Routes } from "react-router-dom";
import Join from "../../pages/join/Join.js";
import RoomCreation from "../../pages/roomCreation/RoomCreation.js";
import Room from "../../pages/room/Room.js";

export default function Router({ socket }) {
  return (
    <Routes>
      <Route path="/" element={<Join socket={socket} />} />
      <Route path="/room-creation" element={<RoomCreation socket={socket} />} />
      <Route path="/room" element={<Room socket={socket} />} />
    </Routes>
  );
}

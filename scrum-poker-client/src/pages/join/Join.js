import React, { useState } from "react";
import "./Join.css";
import { useNavigate } from "react-router-dom";
import { joinRoom } from "../../utils/RoomUtil";

export default function Join({ socket }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const handleJoinClick = () => {
    if (!username.trim() && !roomId.trim()) {
      return;
    }
    joinRoom(socket, navigate, roomId, username);
  };

  const handleCreateClick = () => {
    navigate("/room-creation");
  };

  return (
    <div className="card-container">
      <h1 className="card-title">Join to room</h1>
      <div className="card">
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
        />
        <input
          type="text"
          value={roomId}
          onChange={(event) => setRoomId(event.target.value)}
          placeholder="Room ID"
        />
        <div className="button-container">
          <button onClick={handleJoinClick}>Join</button>
          <button onClick={handleCreateClick}>Create</button>
        </div>
      </div>
    </div>
  );
}

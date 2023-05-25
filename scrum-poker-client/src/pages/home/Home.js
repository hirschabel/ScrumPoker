import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home({ socket }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  function handleJoinClick() {
    if (!username.trim() && !roomId.trim()) {
      return;
    }

    new Promise((resolve, _) => {
      socket.emit("joinRoom", roomId, username, (response) => {
        const isSucces = response.status === "success";
        if (isSucces) {
          console.log("Joined room successfully");
        }
        resolve(isSucces);
      });
    }).then((result) => {
      console.log("JOINED: ", result);
      if (!result) {
        return;
      }

      navigate("/room", {
        state: {
          username: username,
          roomName: roomId,
        },
      });
    });
  }

  function handleCreateClick() {
    navigate("/room-creation");
  }

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

export default Home;

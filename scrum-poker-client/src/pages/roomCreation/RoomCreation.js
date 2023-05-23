import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RoomCreation(props) {
  const socket = props.socket;
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");

  function createRoomSocket(inputName) {
    console.log("CREATE ROOM", inputName);

    return new Promise((resolve, reject) => {
      socket.emit("createRoom", inputName, (response) => {
        if (response.status === "success") {
          console.log("Created room successfully");
          resolve(true);
        } else {
          console.error(response.message);
          resolve(false);
        }
      });
    });
  }

  function handleCreateClick() {
    let letrehozva = "?";
    createRoomSocket(roomName).then((result) => {
      letrehozva = result;
      console.log("letrehozva", letrehozva);
      if (!roomName.trim() || !letrehozva) {
        return;
      }

      new Promise((resolve, _) => {
        socket.emit("joinRoom", roomName, username, (response) => {
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
      });

      navigate("/room", {
        state: {
          username: username,
          roomName: roomName,
        },
      });

      socket.emit("updateUserList", roomName, (response) => {
        if (response.status !== "success") {
          console.error(response.message);
        }
      });

      socket.emit("updateVotes", roomName, (response) => {
        if (response.status !== "success") {
          console.error(response.message);
        }
      });
    });
  }

  function handleBackClick() {
    navigate(-1);
  }

  return (
    <div className="card-container">
      <h1 className="card-title">Create room</h1>
      <div className="card">
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
        />
        <input
          type="text"
          value={roomName}
          onChange={(event) => setRoomName(event.target.value)}
          placeholder="Room Name"
        />
        <div className="button-container">
          <button onClick={handleCreateClick}>Create</button>
          <button onClick={handleBackClick}>Back</button>
        </div>
      </div>
    </div>
  );
}

export default RoomCreation;

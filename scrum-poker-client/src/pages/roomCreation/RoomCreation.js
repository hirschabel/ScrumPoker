import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RoomCreation.css";
import { joinRoom } from "../../utils/RoomUtil";
import { createRoom } from "../../utils/RoomUtil";

export default function RoomCreation({ socket }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");

  const [voteOptions, setVoteOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addNumber = () => {
    if (inputValue === "") return;
    setVoteOptions([...voteOptions, Number(inputValue)]);
    setInputValue("");
  };

  const deleteVoteOption = (index) => {
    let arr = voteOptions.copyWithin();
    arr.splice(index, 1);
    setVoteOptions([...arr]);
  };

  const handleCreateClick = () => {
    createRoom(socket, roomName, voteOptions).then((result) => {
      if (!roomName.trim() || !result) return;
      joinRoom(socket, navigate, roomName, username);
    });
  };

  return (
    <div className="card-container">
      <h1 className="card-title">Create room</h1>
      <div className="card">
        <h2 className="card-title">Room informations</h2>
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
        <h2 className="card-title">Create vote options</h2>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Vote option"
        />
        <button onClick={addNumber} className="add-button">
          Add
        </button>

        <div className="number-card-container">
          {voteOptions.map((number, index) => (
            <div className="number-card" key={index}>
              <button
                onClick={() => deleteVoteOption(index)}
                title="Click to delete"
                className="add-button"
              >
                {number}
              </button>
            </div>
          ))}
        </div>

        <div className="button-container">
          <button onClick={handleCreateClick}>Create</button>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
}

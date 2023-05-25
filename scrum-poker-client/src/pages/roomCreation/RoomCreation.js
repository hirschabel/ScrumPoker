import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RoomCreation.css";

function RoomCreation({ socket }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");

  const [voteOptions, setVoteOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addNumber = () => {
    if (inputValue !== "") {
      setVoteOptions([...voteOptions, Number(inputValue)]);
      setInputValue("");
    }
  };

  const deleteVoteOption = (index) => {
    let arr = voteOptions.copyWithin();
    arr.splice(index, 1);
    setVoteOptions([...arr]);
  };

  function createRoomSocket(inputName, voteOptions) {
    console.log("CREATE ROOM", inputName);

    return new Promise((resolve, reject) => {
      socket.emit("createRoom", inputName, voteOptions, (response) => {
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
    createRoomSocket(roomName, voteOptions).then((result) => {
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
    });
  }

  function handleBackClick() {
    navigate(-1);
  }

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
          <button onClick={handleBackClick}>Back</button>
        </div>
      </div>
    </div>
  );
}

export default RoomCreation;

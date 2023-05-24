import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Room(props) {
  const socket = props.socket;

  const [votes, setVotes] = useState({});
  const [users, setUsers] = useState([]);
  const [voteOptions, setVoteOptions] = useState([]);

  const location = useLocation();
  const roomName = location.state.roomName;

  useEffect(() => {
    socket.on("updateUserList", (userList) => {
      setUsers(userList);
    });

    socket.on("voteUpdate", (updatedVotes) => {
      setVotes(updatedVotes);
    });

    socket.on("clearVotes", () => {
      setVotes({});
    });

    socket.on("updateVoteOptions", (voteOptions) => {
      setVoteOptions(voteOptions);
    });

    return () => {
      socket.off("voteUpdate");
      socket.off("clearVotes");
      socket.off("updateUserList");
      socket.off("updateVoteOptions");
    };
  }, []);

  const vote = (index) => {
    let value = voteOptions[index];
    socket.emit("vote", roomName, value, (response) => {
      if (response.status !== "success") {
        console.error(response.message);
      }
    });
  };

  const clearVotes = () => {
    socket.emit("clearVotes", roomName, (response) => {
      if (response.status !== "success") {
        console.error(response.message);
      }
    });
  };

  return (
    <div>
      <div>
        <h2>Users in Room</h2>
        {users.map((user, index) => (
          <div key={index}>{user}</div>
        ))}
      </div>
      <div>
        <h2>Votes</h2>
        {Object.entries(votes).map(([socketId, voteValue]) => (
          <div key={socketId}>{`${socketId}: ${voteValue}`}</div>
        ))}
      </div>
      <div className="number-card-container">
        {voteOptions.map((number, index) => (
          <div className="number-card" key={"asd" + index}>
            <button
              onClick={() => vote(index)}
              title="Click to delete"
              className="add-button"
            >
              {number}
            </button>
          </div>
        ))}
      </div>
      <button onClick={clearVotes}>Clear votes</button>
    </div>
  );
}

export default Room;

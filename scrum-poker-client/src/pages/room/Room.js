import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Room(props) {
  const socket = props.socket;

  const [votes, setVotes] = useState({});
  const [users, setUsers] = useState([]);

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

    return () => {
      socket.off("voteUpdate");
      socket.off("clearVotes");
      socket.off("updateUserList");
    };
  }, []);

  const vote = (value) => {
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
      <button onClick={() => vote(1)}>1</button>
      <button onClick={() => vote(2)}>2</button>
      <button onClick={() => vote(3)}>3</button>
      <button onClick={clearVotes}>Clear votes</button>
    </div>
  );
}

export default Room;

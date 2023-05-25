import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import VoteOptionsCard from "../../components/cards/VoteOptionsCard";
import ActionButtonsCard from "../../components/cards/ActionButtonsCard";
import UsersCard from "../../components/cards/UsersCard";

function Room({ socket }) {
  const [votesVisibility, setVotesVisibility] = useState(false);
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

  useEffect(() => {
    socket.emit("updateVotes", roomName, (response) => {
      if (response.status !== "success") {
        console.error(response.message);
      }
    });

    socket.emit("updateVoteOptions", roomName, (response) => {
      if (response.status !== "success") {
        console.error(response.message);
      }
    });

    socket.emit("updateUserList", roomName, (response) => {
      if (response.status !== "success") {
        console.error(response.message);
      }
    });
  }, [location]);

  function changeVotesVisibility() {
    setVotesVisibility(!votesVisibility);
  }

  return (
    <div>
      <UsersCard
        users={users}
        votes={votes}
        votesVisibility={votesVisibility}
      />
      <VoteOptionsCard
        voteOptions={voteOptions ? voteOptions : []}
        room={roomName}
        socket={socket}
        userVotedOn={
          votes[location.state.username] ? votes[location.state.username] : ""
        }
      />
      <ActionButtonsCard
        room={roomName}
        socket={socket}
        changeVotesVisibility={changeVotesVisibility}
        votesVisibility={votesVisibility}
        votes={votes}
      />
    </div>
  );
}

export default Room;

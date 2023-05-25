import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VoteOptionsCard from "../../components/cards/VoteOptionsCard";
import ActionButtonsCard from "../../components/cards/ActionButtonsCard";
import UsersCard from "../../components/cards/UsersCard";
import {
  setVotesVisibilitySocket,
  updateUserListSocket,
  updateVoteOptionsSocket,
  updateVotesVisibilitySocket,
  updatedVotesSocket,
} from "../../utils/SocketUtils";

export default function Room({ socket }) {
  const [votesVisibility, setVotesVisibility] = useState(false);
  const [votes, setVotes] = useState({});
  const [users, setUsers] = useState([]);
  const [voteOptions, setVoteOptions] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const roomName = location?.state?.roomName;

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

    socket.on("updateVotesVisibility", (visibility) => {
      setVotesVisibility(visibility);
    });

    return () => {
      socket.off("voteUpdate");
      socket.off("clearVotes");
      socket.off("updateUserList");
      socket.off("updateVoteOptions");
      socket.off("updateVotesVisibility");
    };
  }, []);

  useEffect(() => {
    updatedVotesSocket(socket, navigate, roomName);
    updateVoteOptionsSocket(socket, navigate, roomName);
    updateUserListSocket(socket, navigate, roomName);
    updateVotesVisibilitySocket(socket, navigate, roomName);
  }, [location]);

  const changeVotesVisibility = () => {
    setVotesVisibilitySocket(socket, navigate, roomName, !votesVisibility);
  };

  return (
    <div>
      <UsersCard
        users={users}
        votes={votes}
        votesVisibility={votesVisibility}
      />
      <VoteOptionsCard
        voteOptions={voteOptions}
        room={roomName}
        socket={socket}
        userVotedOn={votes[location?.state?.username]}
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

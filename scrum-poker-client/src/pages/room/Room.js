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
  setProjectsSocket,
} from "../../utils/SocketUtils";
import "./Room.css";
import { FaRegClipboard, FaDoorOpen } from "react-icons/fa";

export default function Room({ socket }) {
  const [votesVisibility, setVotesVisibility] = useState(false);
  const [votes, setVotes] = useState({});
  const [issue, setIssue] = useState({});
  const [users, setUsers] = useState([]);
  const [voteOptions, setVoteOptions] = useState([]);
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const roomId = location?.state?.roomId;
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

    socket.on("setProjects", (projects) => {
      setProjects(projects);
    });

    socket.on("setIssue", (issue) => {
      setIssue(issue);
    });

    return () => {
      socket.off("voteUpdate");
      socket.off("clearVotes");
      socket.off("updateUserList");
      socket.off("updateVoteOptions");
      socket.off("updateVotesVisibility");
      socket.off("setProjects");
      socket.off("setIssue");
    };
  }, []);

  useEffect(() => {
    updatedVotesSocket(socket, navigate, roomId);
    updateVoteOptionsSocket(socket, navigate, roomId);
    updateUserListSocket(socket, navigate, roomId);
    updateVotesVisibilitySocket(socket, navigate, roomId);
    setProjectsSocket(socket, navigate, roomId);
  }, [location]);

  const changeVotesVisibility = () => {
    setVotesVisibilitySocket(socket, navigate, roomId, !votesVisibility);
  };

  return (
    <div className="room-container">
      <h1>
        {roomName}{" "}
        <FaRegClipboard
          onClick={() => navigator.clipboard.writeText(roomId)}
          style={{ cursor: "pointer", opacity: 0.5 }}
          title="Copy room ID to clipboard"
        />
      </h1>
      <UsersCard
        users={users}
        votes={votes}
        votesVisibility={votesVisibility}
      />
      <h2>Estimate issue:</h2>
      <h3>{issue.subject}</h3>
      <VoteOptionsCard
        voteOptions={voteOptions}
        roomId={roomId}
        socket={socket}
      />
      <ActionButtonsCard
        roomId={roomId}
        socket={socket}
        changeVotesVisibility={changeVotesVisibility}
        votesVisibility={votesVisibility}
        votes={votes}
        projects={projects}
      />
      <h1>
        <FaDoorOpen
          onClick={() => navigate("/")}
          style={{ cursor: "pointer", alignSelf: "flex-end" }}
          title="Leave the room"
        />
      </h1>
    </div>
  );
}

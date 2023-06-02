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
  updateIssueSocket,
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
  const [avarageEstimation, setAvarageEstimation] = useState(0);

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
      calculateAvg(updatedVotes);
    });

    socket.on("clearVotes", () => {
      setVotes({});
      calculateAvg({});
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
    updateIssueSocket(socket, navigate, roomId);
  }, [location]);

  const changeVotesVisibility = () => {
    setVotesVisibilitySocket(socket, navigate, roomId, !votesVisibility);
  };

  const calculateAvg = (votes) => {
    let usersVoted = 0;
    let sum = 0;
    for (const value of Object.values(votes)) {
      if (value) {
        sum += value;
        usersVoted++;
      }
    }
    setAvarageEstimation(sum / usersVoted);
  };

  return (
    <div className="room-container">
      <h1>
        Welcome in {roomName}!
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
      {issue ? (
        <h3>
          <a href={"https://redmine.tigra.hu/issues/" + issue?.id}>
            #{issue?.id}
          </a>
          : {issue?.subject}
        </h3>
      ) : (
        ""
      )}

      <VoteOptionsCard
        voteOptions={voteOptions}
        roomId={roomId}
        socket={socket}
      />
      <h2>
        Avarage estimation:{" "}
        {!votesVisibility ? "?" : avarageEstimation ? avarageEstimation : 0}
      </h2>
      <ActionButtonsCard
        roomId={roomId}
        socket={socket}
        changeVotesVisibility={changeVotesVisibility}
        votesVisibility={votesVisibility}
        projects={projects}
        issue={issue}
        estimation={avarageEstimation}
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

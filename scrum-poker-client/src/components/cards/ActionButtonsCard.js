import { clearVotesSocket } from "../../utils/SocketUtils";
import React, { useState } from "react";
import IssueSelectionModal from "../modals/IssueSelectionModal";
import "./Cards.css";

export default function ActionButtonsCard({
  socket,
  roomId,
  changeVotesVisibility,
  votesVisibility,
  votes,
  projects,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateAvg = () => {
    let usersVoted = 0;
    let sum = 0;
    for (const value of Object.values(votes)) {
      if (value) {
        sum += value;
        usersVoted++;
      }
    }
    clearVotesSocket(socket, roomId);
    return sum / usersVoted;
  };

  return (
    <div>
      <button className="action-button" onClick={() => setIsModalOpen(true)}>
        Select issue
      </button>
      {isModalOpen && (
        <IssueSelectionModal
          onClose={() => setIsModalOpen(false)}
          projects={projects}
          socket={socket}
          roomId={roomId}
        />
      )}
      <button
        className="action-button"
        onClick={() => clearVotesSocket(socket, roomId)}
      >
        Clear votes
      </button>
      <button className="action-button" onClick={changeVotesVisibility}>
        {votesVisibility ? "Hide" : "Show"} votes
      </button>
      <button className="action-button" onClick={calculateAvg}>
        Calculate
      </button>
    </div>
  );
}

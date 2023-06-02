import { clearVotesSocket } from "../../utils/SocketUtils";
import React, { useState } from "react";
import IssueSelectionModal from "../modals/IssueSelectionModal";
import IssueEstimationModal from "../modals/IssueEstimationModal";
import "./Cards.css";

export default function ActionButtonsCard({
  socket,
  roomId,
  changeVotesVisibility,
  votesVisibility,
  projects,
  issue,
  estimation,
}) {
  const [isIssueSelectionModalOpen, setIsIssueSelectionModalOpen] =
    useState(false);
  const [isIssueEstimationModalOpen, setIsIssueEstimationModalOpen] =
    useState(false);

  return (
    <div>
      <button
        className="action-button"
        onClick={() => setIsIssueSelectionModalOpen(true)}
      >
        Select issue
      </button>
      {isIssueSelectionModalOpen && (
        <IssueSelectionModal
          onClose={() => setIsIssueSelectionModalOpen(false)}
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
      <button
        className="action-button"
        onClick={() => setIsIssueEstimationModalOpen(true)}
      >
        Estimate issue
      </button>
      {isIssueEstimationModalOpen && (
        <IssueEstimationModal
          onClose={() => setIsIssueEstimationModalOpen(false)}
          issue={issue}
          estimation={estimation}
        />
      )}
    </div>
  );
}

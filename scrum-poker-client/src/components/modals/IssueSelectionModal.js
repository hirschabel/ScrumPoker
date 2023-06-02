import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  setIssuesSocket,
  setIssueSocket,
  clearVotesSocket,
} from "../../utils/SocketUtils";
import "./Modals.css";

const IssueSelectionModal = ({ projects, socket, roomId, onClose }) => {
  const navigate = useNavigate();
  const [issueId, setIssueId] = useState("");
  const [issues, setIssues] = useState([]);
  const [inputIssueId, setInputIssueId] = useState("");

  useEffect(() => {
    socket.on("setIssues", (issues) => {
      setIssues(issues);
    });

    return () => {
      socket.off("setIssues");
    };
  }, []);

  const handleProjectIdChange = (e) => {
    setIssuesSocket(socket, navigate, roomId, e.target.value);
    clearVotesSocket(socket, roomId);
  };

  const handleIssueIdChange = (e) => {
    setIssueId(e.target.value);
  };

  const handleSubmit = () => {
    let id = inputIssueId ? inputIssueId : issueId;
    setIssueSocket(socket, navigate, roomId, id);
    onClose();
  };

  const handleInputChange = (event) => {
    setInputIssueId(event.target.value);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Select issue to estimate</h2>
        <div className="dropdown">
          <label htmlFor="projectId">Project</label>
          <select id="projectId" onChange={handleProjectIdChange}>
            <option key={0} value="" />
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div className="dropdown">
          <label htmlFor="issueId">Issue</label>
          <select id="issueId" value={issueId} onChange={handleIssueIdChange}>
            {issues.map((issue) => (
              <option key={issue.id} value={issue.id}>
                #{issue.id}: {issue.subject}
              </option>
            ))}
          </select>
        </div>
        <h4>OR</h4>
        <input
          type="number"
          value={inputIssueId}
          placeholder="Issue ID"
          onChange={handleInputChange}
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Select</button>
          <button onClick={() => onClose()}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default IssueSelectionModal;

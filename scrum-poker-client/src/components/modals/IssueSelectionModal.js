import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  setIssuesSocket,
  setIssueSocket,
  clearVotesSocket,
  setQueriesSocket,
} from "../../utils/SocketUtils";
import "./Modals.css";

const IssueSelectionModal = ({ projects, socket, roomId, onClose }) => {
  const navigate = useNavigate();
  const [projectId, setProjectId] = useState("");
  const [issueId, setIssueId] = useState("");
  const [issues, setIssues] = useState([]);
  const [queries, setQueries] = useState([]);
  const [inputIssueId, setInputIssueId] = useState("");
  const [selectedSelection, setSelectedSelection] = useState("by-selection");

  useEffect(() => {
    socket.on("setIssues", (issues) => {
      setIssues(issues);
    });

    socket.on("setQueries", (queries) => {
      setQueries(queries);
    });

    return () => {
      socket.off("setIssues");
      socket.off("setQueries");
    };
  }, []);

  const handleProjectIdChange = (e) => {
    setProjectId(e.target.value);
    setQueries([]);
    setQueriesSocket(socket, navigate, roomId, e.target.value);
    setIssues([]);
  };

  const handleQueryIdChange = (e) => {
    setIssues([]);
    setIssuesSocket(socket, navigate, roomId, projectId, e.target.value);
  };

  const handleIssueIdChange = (e) => {
    setIssueId(e.target.value);
  };

  const handleSubmit = () => {
    let id = selectedSelection === "by-selection" ? issueId : inputIssueId;
    setIssueSocket(socket, navigate, roomId, id);
    clearVotesSocket(socket, roomId);
    onClose();
  };

  const handleInputChange = (event) => {
    setInputIssueId(event.target.value);
  };

  const handleRadioChange = (event) => {
    setSelectedSelection(event.target.value);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Select issue to estimate</h2>
        <div className="issue-selection-container">
          <input
            type="radio"
            value="by-selection"
            onChange={handleRadioChange}
            checked={selectedSelection === "by-selection"}
          />
          <div>
            <div className="dropdown">
              <label htmlFor="projectId">Project</label>
              <select
                id="projectId"
                onChange={handleProjectIdChange}
                disabled={selectedSelection !== "by-selection"}
              >
                <option key={0} value="" />
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown">
              <label htmlFor="queryId">Query</label>
              <select
                id="queryId"
                onChange={handleQueryIdChange}
                disabled={selectedSelection !== "by-selection"}
              >
                <option key={0} value="" />
                {queries.map((query) => (
                  <option key={query.id} value={query.id}>
                    {query.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown">
              <label htmlFor="issueId">Issue</label>
              <select
                id="issueId"
                value={issueId}
                onChange={handleIssueIdChange}
                disabled={selectedSelection !== "by-selection"}
              >
                <option key={0} value="" />
                {issues.map((issue) => (
                  <option key={issue.id} value={issue.id}>
                    #{issue.id}: {issue.subject}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="issue-selection-container">
          <input
            type="radio"
            value="by-id"
            onChange={handleRadioChange}
            checked={selectedSelection === "by-id"}
          />
          <input
            type="number"
            value={inputIssueId}
            placeholder="Issue ID"
            onChange={handleInputChange}
            disabled={selectedSelection !== "by-id"}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Select</button>
          <button onClick={() => onClose()}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default IssueSelectionModal;

import React, { useState } from "react";
import "./Modals.css";

const IssueSelectionModal = ({ issue, estimation, onClose }) => {
  const [inputEstimation, setInputEstimation] = useState(estimation);

  const handleInputChange = (event) => {
    setInputEstimation(event.target.value);
  };

  const handleSubmit = () => {
    alert("Estimation not yet implemented. Coming soon!");
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Set issue estimation</h2>
        <h4>Actual estimation:</h4>
        <p>{issue.total_estimated_hours ? issue.total_estimated_hours : 0}</p>
        <h4>Spent hours:</h4>
        <p>{issue.total_spent_hours ? issue.total_spent_hours : 0}</p>
        <input
          type="number"
          value={inputEstimation}
          placeholder="Estimation"
          onChange={handleInputChange}
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={() => onClose()}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default IssueSelectionModal;

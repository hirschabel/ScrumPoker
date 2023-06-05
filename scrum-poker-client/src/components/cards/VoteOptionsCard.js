import { useEffect, useState } from "react";
import { voteSocket } from "../../utils/SocketUtils";
import "./Cards.css";

export default function VoteOptionsCard({ socket, roomId, voteOptions }) {
  const [actualVote, setActualVote] = useState(-1);

  useEffect(() => {
    socket.on("clearVotes", () => {
      clearActualVote();
    });

    return () => {
      socket.off("clearVotes");
    };
  }, [actualVote]);

  const clearActualVote = () => {
    if (actualVote >= 0) {
      document.getElementById(actualVote + "-vote-option").style.background =
        "#e4faee";

      setActualVote(-1);
    }
  };

  const handleVoteEvent = (number, index) => {
    voteSocket(socket, roomId, number);

    if (actualVote >= 0) {
      document.getElementById(actualVote + "-vote-option").style.background =
        "#e4faee";
    }

    setActualVote(index);
    document.getElementById(index + "-vote-option").style.background =
      "#bff3d6";
  };

  return (
    <div className="vote-options-container">
      {voteOptions.map((number, index) => (
        <div
          id={index + "-vote-option"}
          key={index}
          onClick={() => handleVoteEvent(number, index)}
          title="Click to vote"
          className="vote-option"
        >
          <h2 className="vote-otpion-value">{number}</h2>
        </div>
      ))}
    </div>
  );
}

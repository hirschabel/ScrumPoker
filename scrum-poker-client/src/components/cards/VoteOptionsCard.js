import { voteSocket } from "../../utils/SocketUtils";
import "./Cards.css";

export default function VoteOptionsCard({ socket, roomId, voteOptions }) {
  return (
    <div className="vote-options-container">
      {voteOptions.map((number, index) => (
        <button
          key={index}
          onClick={() => voteSocket(socket, roomId, number)}
          title="Click to vote"
          className="vote-option"
        >
          {number}
        </button>
      ))}
    </div>
  );
}

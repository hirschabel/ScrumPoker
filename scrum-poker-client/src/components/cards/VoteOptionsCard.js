import { voteSocket } from "../../utils/SocketUtils";
import "./Cards.css";

export default function VoteOptionsCard({ socket, roomId, voteOptions }) {
  return (
    <div className="vote-options-container">
      {voteOptions.map((number, index) => (
        <div
          key={index}
          onClick={() => voteSocket(socket, roomId, number)}
          title="Click to vote"
          className="vote-option"
        >
          <h2 className="vote-otpion-value">{number}</h2>
        </div>
      ))}
    </div>
  );
}

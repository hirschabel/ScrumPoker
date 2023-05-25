import Card from "react-bootstrap/Card";
import { voteSocket } from "../../utils/SocketUtils";

export default function VoteOptionsCard({
  socket,
  room,
  voteOptions,
  userVotedOn,
}) {
  return (
    <Card
      style={{
        border: "2px solid grey",
        background: "#e8fce3",
        width: "300px",
      }}
    >
      <Card.Title>You voted on: {userVotedOn}</Card.Title>
      <Card.Body>
        {voteOptions?.map((number, index) => (
          <button
            key={index}
            onClick={() => voteSocket(socket, room, number)}
            title="Click to vote"
            className="add-button"
            style={{ margin: "5px" }}
          >
            {number}
          </button>
        ))}
      </Card.Body>
    </Card>
  );
}

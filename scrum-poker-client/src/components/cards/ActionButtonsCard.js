import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { clearVotesSocket } from "../../utils/SocketUtils";
import "./Cards.css";

export default function ActionButtonsCard({
  socket,
  room,
  changeVotesVisibility,
  votesVisibility,
  votes,
}) {
  const calculateAvg = () => {
    let usersVoted = 0;
    let sum = 0;
    for (const value of Object.values(votes)) {
      if (value) {
        sum += value;
        usersVoted++;
      }
    }
    clearVotesSocket(socket, room);
    return sum / usersVoted;
  };

  return (
    <Card
      style={{
        border: "2px solid grey",
        background: "#fcdcd7",
        width: "300px",
      }}
    >
      <Card.Body>
        <ListGroup>
          <ListGroupItem>
            <button
              className="action-button"
              onClick={() => clearVotesSocket(socket, room)}
            >
              Clear votes
            </button>
            <button className="action-button" onClick={changeVotesVisibility}>
              {votesVisibility ? "Hide" : "Show"} votes
            </button>
            <button className="action-button" onClick={calculateAvg}>
              Calculate
            </button>
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

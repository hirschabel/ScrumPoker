import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import "./Cards.css";

function ActionButtonsCard({
  socket,
  room,
  changeVotesVisibility,
  votesVisibility,
  votes,
}) {
  const clearVotes = () => {
    socket.emit("clearVotes", room, (response) => {
      if (response.status !== "success") {
        console.error(response.message);
      }
    });
  };

  const calculateAvg = () => {
    let usersVoted = 0;
    let sum = 0;
    votes.forEach((_, value) => {
      if (value) {
        sum += value;
        usersVoted++;
      }
    });
    console.log(sum / usersVoted);
    clearVotes();
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
            <button className="action-button" onClick={clearVotes}>
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

export default ActionButtonsCard;

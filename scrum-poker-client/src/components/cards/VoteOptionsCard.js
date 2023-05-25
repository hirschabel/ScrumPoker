import Card from "react-bootstrap/Card";

function VoteOptionsCard({ socket, room, voteOptions, userVotedOn }) {
  const vote = (value) => {
    socket.emit("vote", room, value, (response) => {
      if (response.status !== "success") {
        console.error(response.message);
      }
    });
  };

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
            onClick={() => vote(number)}
            title="Click to delete"
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

export default VoteOptionsCard;

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export default function UsersCard({ users, votes, votesVisibility }) {
  return (
    <Card
      style={{
        border: "2px solid grey",
        background: "#fcfbe6",
        width: "300px",
      }}
    >
      <Card.Title>Users</Card.Title>
      <Card.Body>
        <ListGroup>
          {users.map((user, index) => (
            <div key={index}>
              <ListGroup.Item>
                <Card
                  style={{
                    background: "#fcfac7",
                    width: "240px",
                    margin: "10px",
                  }}
                >
                  <Card.Body>
                    <Card.Title>{user} </Card.Title>
                    <Card.Text>
                      Vote:{" "}
                      {!votesVisibility ? "?" : votes[user] ? votes[user] : ""}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            </div>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

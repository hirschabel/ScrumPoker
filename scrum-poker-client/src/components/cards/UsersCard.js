import "./Cards.css";

export default function UsersCard({ users, votes, votesVisibility }) {
  return (
    <div className="users-container">
      {users.map((user, index) => (
        <div key={index} className="user-card">
          <h2>{user}</h2>
          <h5>
            Voted on: {!votesVisibility ? "?" : votes[user] ? votes[user] : ""}
          </h5>
        </div>
      ))}
    </div>
  );
}

import "./Cards.css";

export default function UsersCard({ users, votes, votesVisibility }) {
  const handleButtonClick = (username) => {
    console.log(`Button clicked for ${username}`);
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Voted on</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="username">{user}</td>
              <td className="vote">
                {!votesVisibility ? "?" : votes[user] ? votes[user] : ""}
              </td>
              <td className="action">
                <button
                  className="vote-button"
                  onClick={() => handleButtonClick(user)}
                >
                  Kick
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

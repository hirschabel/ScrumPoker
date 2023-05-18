import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

console.log(socket);

function App() {
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [votes, setVotes] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('voteUpdate', (updatedVotes) => {
      setVotes(updatedVotes);
    });

    socket.on('clearVotes', () => {
      setVotes({});
    });

    socket.on('updateUserList', (userList) => {
      setUsers(userList);
    });

    return () => {
      socket.off('voteUpdate');
      socket.off('clearVotes');
      socket.off('updateUserList');
    };
  }, []);

  const createRoom = () => {
    socket.emit('createRoom', roomName, (response) => {
      if (response.status === 'success') {
        console.log('Created room successfully');
      } else {
        console.error(response.message);
      }
    });
  };

  const joinRoom = () => {
    socket.emit('joinRoom', roomName, userName, (response) => {
      if (response.status === 'success') {
        console.log('Joined room successfully');
      } else {
        console.error(response.message);
      }
    });
  };

  const vote = (value) => {
    socket.emit('vote', roomName, value, (response) => {
      if (response.status !== 'success') {
        console.error(response.message);
      }
    });
  };

  const clearVotes = () => {
    socket.emit('clearVotes', roomName, (response) => {
      if (response.status !== 'success') {
        console.error(response.message);
      }
    });
  };

  return (
    <div>
      <h1>Scrum Poker</h1>
      <input
        type="text"
        placeholder="User name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={createRoom}>Create Room</button>
      <button onClick={joinRoom}>Join Room</button>
      <div>
        <h2>Users in Room</h2>
        {users.map((user, index) => (
          <div key={index}>{user}</div>
        ))}
      </div>
      <div>
        <h2>Votes</h2>
        {Object.entries(votes).map(([socketId, voteValue]) => (
          <div key={socketId}>{`${socketId}: ${voteValue}`}</div>
        ))}
      </div>
      <button onClick={() => vote(1)}>1</button>
      <button onClick={() => vote(2)}>2</button>
      <button onClick={() => vote(3)}>3</button>
      <button onClick={clearVotes}>Clear votes</button>
    </div>
  );
}

export default App;

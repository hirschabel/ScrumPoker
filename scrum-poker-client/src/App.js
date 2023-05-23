import io from "socket.io-client";
import Router from "./components/router/Router";

const socket = io("http://localhost:3001");

function App() {
  return <Router socket={socket} />;
} /*
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [createRoom, setCreateRoom] = useState("");

  const [newRoomName, setNewRoomName] = useState("");

  const [votes, setVotes] = useState({});
  const [users, setUsers] = useState([]);
  let connected = false;

  useEffect(() => {
    socket.on("voteUpdate", (updatedVotes) => {
      setVotes(updatedVotes);
    });

    socket.on("clearVotes", () => {
      setVotes({});
    });

    socket.on("updateUserList", (userList) => {
      setUsers(userList);
    });

    return () => {
      socket.off("voteUpdate");
      socket.off("clearVotes");
      socket.off("updateUserList");
    };
  }, []);*/

/*function createRoomSocket (inputName) {
    console.log("CREATE ROOM", inputName)
    socket.emit('createRoom', inputName, (response) => {
      if (response.status === 'success') {
        console.log('Created room successfully');
      } else {
        console.error(response.message);
      }
    });
  };*/
/*
  function createRoomSocket(inputName) {
    console.log("CREATE ROOM", inputName);

    return new Promise((resolve, reject) => {
      socket.emit("createRoom", inputName, (response) => {
        if (response.status === "success") {
          console.log("Created room successfully");
          resolve(true);
        } else {
          console.error(response.message);
          resolve(false);
        }
      });
    });
  }

  function joinRoom(roomId, username) {
    return new Promise((resolve, reject) => {
      socket.emit("joinRoom", roomId, username, (response) => {
        if (response.status === "success") {
          console.log("Joined room successfully");
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  const vote = (value) => {
    socket.emit("vote", roomName, value, (response) => {
      if (response.status !== "success") {
        console.error(response.message);
      }
    });
  };

  const clearVotes = () => {
    socket.emit("clearVotes", roomName, (response) => {
      if (response.status !== "success") {
        console.error(response.message);
      }
    });
  };

  function Content() {
    console.log("------", userName, " ", roomName, " ", createRoom);
    if (createRoom) {
      return <RoomCreateSection onRoomName={setNewRoomName} />;
    } else if (!userName || !roomName) {
      console.log("???");
      return <LoginSection onLogin={setUserName} onRoomName={setRoomName} />;
    } else {
      return (
        <div>
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
  }

  function LoginSection({ onLogin, onRoomName }) {
    const [username, setUsername] = useState("");
    const [roomname, setRoomname] = useState("");
    function logInUser() {
      console.log("PARAM1:", onLogin);
      console.log("PARAM2:", onRoomName);
      if (!username.trim() && !roomname.trim()) {
        return;
      }

      joinRoom(roomname, username).then((result) => {
        console.log("JOINED: ", result);
        if (!result) {
          return;
        }
        setRoomName(roomname);
        setUserName(username);
      });
    }

    return (
      <div>
        Username:{" "}
        <input
          name="username"
          placeholder="User name"
          onInput={(e) => setUsername(e.target.value)}
        />
        <br />
        Room id:{" "}
        <input
          type="number"
          placeholder="Room id"
          name="roomname"
          onChange={(e) => setRoomname(e.target.value)}
        />
        <br />
        <button onClick={() => logInUser()}>Join Room</button>
        <br />
        <button onClick={() => setCreateRoom("uj")}>Create Room</button>
        <br />
      </div>
    );
  }

  function RoomCreateSection({ onRoomName }) {
    const [roomname, setRoomname] = useState("");
    function logInUser() {
      console.log("PARAM2:", onRoomName);
      let letrehozva = "?";
      createRoomSocket(roomname).then((result) => {
        letrehozva = result;
        console.log("letrehozva", letrehozva);
        if (!roomname.trim() || !letrehozva) {
          return;
        }

        setCreateRoom("");
        setNewRoomName(roomname);
      });
    }
    function back() {
      setCreateRoom("");
    }

    return (
      <div>
        Room name:{" "}
        <input
          placeholder="Room id"
          name="roomname"
          onChange={(e) => setRoomname(e.target.value)}
        />
        <br />
        <button onClick={() => logInUser()}>Create room</button>
        <br />
        <button onClick={() => back()}>Back</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Scrum Poker</h1>

      <div>
        <Content />
      </div>
    </div>
  ); 
  
} */

export default App;

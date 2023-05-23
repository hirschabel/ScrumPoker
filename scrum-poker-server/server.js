const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let rooms = {};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("createRoom", (roomName, callback) => {
    if (rooms[roomName]) {
      callback({ status: "error", message: "Room already exists" });
    } else {
      rooms[roomName] = {
        name: roomName,
        users: {},
        votes: {},
      };
      callback({ status: "success" });
    }
  });

  socket.on("joinRoom", (roomName, userName, callback) => {
    if (!rooms[roomName]) {
      callback({ status: "error", message: "Room does not exist" });
    } else {
      socket.join(roomName);
      console.log("join username: ", userName);
      rooms[roomName].users[socket.id] = userName;
      io.to(roomName).emit(
        "updateUserList",
        Object.values(rooms[roomName].users)
      );
      callback({ status: "success" });
    }
  });

  socket.on("vote", (roomName, value, callback) => {
    if (!rooms[roomName]) {
      callback({ status: "error", message: "Room does not exist" });
    } else if (!rooms[roomName].users[socket.id]) {
      callback({
        status: "error",
        message: "User not in room",
      });
    } else {
      rooms[roomName].votes[rooms[roomName].users[socket.id]] = value;
      io.to(roomName).emit("voteUpdate", rooms[roomName].votes);
      callback({ status: "success" });
    }
  });

  socket.on("updateVotes", (roomName, callback) => {
    if (!rooms[roomName]) {
      callback({ status: "error", message: "Room does not exist" });
    } else if (!rooms[roomName].users[socket.id]) {
      callback({
        status: "error",
        message: "User not in room",
      });
    } else {
      io.to(roomName).emit("voteUpdate", rooms[roomName].votes);
      callback({ status: "success" });
    }
  });

  socket.on("clearVotes", (roomName, callback) => {
    if (!rooms[roomName]) {
      callback({ status: "error", message: "Room does not exist" });
    } else {
      rooms[roomName].votes = {};
      io.to(roomName).emit("clearVotes");
      callback({ status: "success" });
    }
  });

  socket.on("updateUserList", (roomName, callback) => {
    if (!rooms[roomName]) {
      callback({ status: "error", message: "Room does not exist" });
    } else {
      rooms[roomName].votes = {};
      io.to(roomName).emit(
        "updateUserList",
        Object.values(rooms[roomName].users)
      );
      callback({ status: "success" });
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    for (let room of Object.values(rooms)) {
      if (room.users[socket.id]) {
        delete room.votes[room.users[socket.id]];
        delete room.users[socket.id];
        console.log(room);
        io.to(room.name).emit("updateUserList", Object.values(room.users));
        io.to(room.name).emit("voteUpdate", room.votes);
      }
    }
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});

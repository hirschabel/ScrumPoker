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
  socket.on("createRoom", (roomName, voteOptions, callback) => {
    if (rooms[roomName]) {
      callback({ status: "error", message: "Room already exists" });
    } else {
      rooms[roomName] = {
        name: roomName,
        users: {},
        votes: {},
        voteOptions: voteOptions,
        votesVisibility: false,
      };
      callback({ status: "success" });
    }
  });

  socket.on("joinRoom", (roomName, userName, callback) => {
    if (!rooms[roomName]) {
      callback({ status: "error", message: "Room does not exist" });
    } else {
      socket.join(roomName);
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
    } else {
      io.to(roomName).emit("voteUpdate", rooms[roomName].votes);
      callback({ status: "success" });
    }
  });

  socket.on("updateVoteOptions", (roomName, callback) => {
    if (!rooms[roomName]) {
      callback({ status: "error", message: "Room does not exist" });
    } else {
      io.to(roomName).emit("updateVoteOptions", rooms[roomName].voteOptions);
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
      socket.join(roomName);
      io.to(roomName).emit(
        "updateUserList",
        Object.values(rooms[roomName].users)
      );
      callback({ status: "success" });
    }
  });

  socket.on("setVotesVisibility", (roomName, visibility, callback) => {
    if (!rooms[roomName]) {
      callback({ status: "error", message: "Room does not exist" });
    } else {
      rooms[roomName].votesVisibility = visibility;
      io.to(roomName).emit("updateVotesVisibility", visibility);
      callback({ status: "success" });
    }
  });

  socket.on("updateVotesVisibility", (roomName, callback) => {
    if (!rooms[roomName]) {
      callback({ status: "error", message: "Room does not exist" });
    } else {
      io.to(roomName).emit(
        "updateVotesVisibility",
        rooms[roomName].votesVisibility
      );
      callback({ status: "success" });
    }
  });

  socket.on("disconnect", () => {
    for (let room of Object.values(rooms)) {
      if (room.users[socket.id]) {
        delete room.votes[room.users[socket.id]];
        delete room.users[socket.id];
        io.to(room.name).emit("updateUserList", Object.values(room.users));
        io.to(room.name).emit("voteUpdate", room.votes);
      }
    }
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});

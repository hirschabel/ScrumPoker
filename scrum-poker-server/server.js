const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const roomUtils = require("./utils/RoomUtil.js");

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
  socket.on("createRoom", (roomName, voteOptions, apiKey, callback) => {
    if (rooms[roomName]) {
      callback({ status: "error", message: "Room already exists" });
    } else {
      let roomId = roomUtils.generateRoomId();
      rooms[roomId] = {
        id: roomId,
        name: roomName,
        users: {},
        votes: {},
        voteOptions: voteOptions,
        votesVisibility: false,
        apiKey: apiKey,
      };
      callback({ status: "success", roomId: roomId });
    }
  });

  socket.on("joinRoom", (roomId, userName, callback) => {
    if (!rooms[roomId]) {
      callback({ status: "error", message: "Room does not exist" });
    } else {
      socket.join(roomId);
      rooms[roomId].users[socket.id] = userName;
      io.to(roomId).emit("updateUserList", Object.values(rooms[roomId].users));
      callback({ status: "success", roomName: rooms[roomId].name });
    }
  });

  socket.on("vote", (roomId, value, callback) => {
    if (!rooms[roomId]) {
      callback({ status: "error", message: "Room does not exist" });
    } else if (!rooms[roomId].users[socket.id]) {
      callback({
        status: "error",
        message: "User not in room",
      });
    } else {
      rooms[roomId].votes[rooms[roomId].users[socket.id]] = value;
      io.to(roomId).emit("voteUpdate", rooms[roomId].votes);
      callback({ status: "success" });
    }
  });

  socket.on("updateVotes", (roomId, callback) => {
    if (!rooms[roomId]) {
      callback({ status: "error", message: "Room does not exist" });
    } else {
      io.to(roomId).emit("voteUpdate", rooms[roomId].votes);
      callback({ status: "success" });
    }
  });

  socket.on("updateVoteOptions", (roomId, callback) => {
    if (!rooms[roomId]) {
      callback({ status: "error", message: "Room does not exist" });
    } else {
      io.to(roomId).emit("updateVoteOptions", rooms[roomId].voteOptions);
      callback({ status: "success" });
    }
  });

  socket.on("clearVotes", (roomId, callback) => {
    if (!rooms[roomId]) {
      callback({ status: "error", message: "Room does not exist" });
    } else {
      rooms[roomId].votes = {};
      io.to(roomId).emit("clearVotes");
      callback({ status: "success" });
    }
  });

  socket.on("updateUserList", (roomId, callback) => {
    if (!rooms[roomId]) {
      callback({ status: "error", message: "Room does not exist" });
    } else {
      socket.join(roomId);
      io.to(roomId).emit("updateUserList", Object.values(rooms[roomId].users));
      callback({ status: "success" });
    }
  });

  socket.on("setVotesVisibility", (roomId, visibility, callback) => {
    if (!rooms[roomId]) {
      callback({ status: "error", message: "Room does not exist" });
    } else {
      rooms[roomId].votesVisibility = visibility;
      io.to(roomId).emit("updateVotesVisibility", visibility);
      callback({ status: "success" });
    }
  });

  socket.on("updateVotesVisibility", (roomId, callback) => {
    if (!rooms[roomId]) {
      callback({ status: "error", message: "Room does not exist" });
    } else {
      io.to(roomId).emit(
        "updateVotesVisibility",
        rooms[roomId].votesVisibility
      );
      callback({ status: "success" });
    }
  });

  socket.on("setProjects", (roomId, callback) => {
    if (!rooms[roomId]) {
      callback({ status: "error", message: "Room does not exist" });
    } else {
      roomUtils.fetchProjects(rooms[roomId].apiKey).then((projects) => {
        io.to(roomId).emit("setProjects", projects);
      });
      callback({ status: "success" });
    }
  });

  socket.on("setIssues", (roomId, projectId, callback) => {
    if (!rooms[roomId]) {
      callback({ status: "error", message: "Room does not exist" });
    } else {
      roomUtils.fetchIssues(rooms[roomId].apiKey, projectId).then((issues) => {
        io.to(roomId).emit("setIssues", issues);
      });
      callback({ status: "success" });
    }
  });

  socket.on("setIssue", (roomId, issueId, callback) => {
    if (!rooms[roomId]) {
      callback({ status: "error", message: "Room does not exist" });
    } else {
      roomUtils.fetchIssue(rooms[roomId].apiKey, issueId).then((issue) => {
        rooms[roomId].issue = issue;
        io.to(roomId).emit("setIssue", rooms[roomId].issue);
      });
      callback({ status: "success" });
    }
  });

  socket.on("updateIssue", (roomId, callback) => {
    if (!rooms[roomId]) {
      callback({ status: "error", message: "Room does not exist" });
    } else {
      io.to(roomId).emit("setIssue", rooms[roomId].issue);
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
